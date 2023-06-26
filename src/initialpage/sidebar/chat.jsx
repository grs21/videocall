import React, { useEffect, useRef } from 'react';
import { Attachment } from '../../assets/imagePath'
import Message from '../../component/message';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, initializeMessages } from '../../stores/slices/messagesSlice';
import io from '../../style/js/socket.io.js';


function Chat() {
  const { roomProperty, callProperty } = useSelector(state => state.videoRoomProperty);
  const { messages } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const socket = io.connect('https://mlponlinechat.mlpcare.com:3010');
  const roomId = callProperty.getRoomId();
  const fromName = callProperty.getDoctorName();
  const fromId = callProperty.getDoctorPersonId();
  const toId = callProperty.getPatientId();
  const fileName = '';
  const toName = callProperty.getFullName();
  const fileUrl = '';


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
        //var message = fileName;
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
        // dispatch(addMessage('message'));
        //ScrollEnd()
      }
    }
  }

  function ScrollEnd() {
    var chatList = document.getElementById('chat-list');
    if (chatList) {
      chatList.scrollTop = chatList.scrollHeight; 
      //chatList.scrollTop = chatList.scrollHeight;
    }
    console.log(chatList.scrollHeight);
    console.log('scroll');
  }
  // useEffect(() => {

  // }, [messages])


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
      let temp = 'data';
      let tempdate = 'data';
      let isNewMessage = '';
      let isNewDate = '';
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
                  {messages && messages.map((message, index) => (
                    <Message key={index} message={message} />
                  ))}
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
