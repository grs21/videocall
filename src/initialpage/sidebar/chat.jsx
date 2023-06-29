import React, { useEffect, useRef } from 'react';
import { Attachment } from '../../assets/imagePath'
import Message from '../../component/message';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, initializeMessages } from '../../stores/slices/messagesSlice';
import io from '../../style/js/socket.io.js';
import ChatLine from '../../component/chatLine';
import { dateFormat } from '../../helper/videoCallHelper';

function Chat() {
  const { roomProperty, callProperty } = useSelector(state => state.videoRoomProperty);
  const { messages } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const socket = io.connect('https://mlponlinechat.mlpcare.com:3010');
  const roomId = callProperty.getRoomId();
  const fromName = callProperty.getDoctorName();
  const fromId = callProperty.getDoctorPersonId();
  const toId = callProperty.getPatientId();
  const toName = callProperty.getFullName();
  const fileUrl = '';
  var prevDate = null;
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const sendMessage = (event) => {
    const messageInput = document.getElementById('messageInput');
    if (messageInput !== null && messageInput !== undefined) {
      var message = messageInput.value;
      if (message !== '') {
        socket.emit('typing', { RoomId: roomId, username: fromName, isTyping: false, FromId: fromId });
        socket.emit('new_message', {
          RoomId: roomId,
          FromId: fromId,
          FromName: fromName,
          ToId: toId,
          ToName: toName,
          Message: message,
          FileUrl: fileUrl
        });
        messageInput.value = '';
      }
    }
  }

  function ScrollEnd() {
    var chatList = document.getElementById('chat-list');
    if (chatList) {
      chatList.scrollTop = chatList.scrollHeight;
    }
  }

  useEffect(() => {
    console.log('useEffect');
    socket.emit('login_room', { RoomId: roomId });
    var allGet = 0;
    socket.on('new_message', async (data) => {
      console.log(data, 'newMessage');
      await dispatch(addMessage(data));
      socket.emit('read', { RoomId: roomId, ToId: fromId });
      ScrollEnd();
    });

    socket.on('typing', (data) => {
      console.log('typing', data);
      if (data.FromId === toId) {
        if (data.isTyping) {
          ScrollEnd();
        }
      }
    });

    socket.on('all_messages', async (data) => {
      console.log('all_messages', data);
      await dispatch(initializeMessages(data));
      socket.emit('read', { RoomId: roomId, ToId: fromId });
      ScrollEnd();
    });


    socket.on('connect', () => {
      console.log('Socket.IO bağlandı');
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO bağlantısı kesildi');
    });
    return () => {
      socket.off('new_message');
      socket.off('typing');
      socket.off('all_messages');
    };
  }, [callProperty]);



  return (
    <div className="content-full tab-pane show active" id="chats_tab">
      <div className="chat-window">
        <div className="chat-contents">
          <div className="chat-content-wrap">
            <div className="chat-wrap-inner" id='chat-list'>
              <div className="chat-box">
                <div className="chats">
                  {messages && messages.map((message, index) => {
                    const messageDate = new Date(message.CreatedDate);
                    /// To add chatLine when a new day is passed
                    if (!prevDate || (messageDate && messageDate.getDate() !== prevDate.getDate())) {
                      prevDate = messageDate;
                      return (
                        <div>
                          <ChatLine date={dateFormat(messageDate, options)} />
                          <Message key={index} message={message} />
                        </div>
                      );
                    } else {
                      prevDate = messageDate;
                      return <Message key={index} message={message} />
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chat-footer">
          <div className="message-bar">
            <div className="message-inner">
              <a className="link attach-icon" href="#" data-bs-toggle="modal" data-bs-target="#drag_files"><img src={Attachment} alt="" /></a>
              <div className="message-area">
                <div className="input-group">
                  <textarea className="form-control" placeholder="Type message..." defaultValue={""} onKeyDown={handleKeyPress} id='messageInput' />
                  <span className="input-group-append">
                    <button className="btn btn-primary" type="button"><i className="fa fa-send" onClick={sendMessage} /></button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
