import React, { useEffect, useRef } from 'react';
import { Attachment } from '../../assets/imagePath'
import Message from '../../component/message';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, initializeMessages } from '../../stores/slices/messagesSlice';
import ChatLine from '../../component/chatLine';
import { dateFormat, chatScroll } from '../../helper/videoCallHelper';
import { SOCKET_IO } from '../../constant/constant';
import { sendMessage } from '../../helper/videoCallHelper';

function Chat() {
  const { roomProperty, callProperty } = useSelector(state => state.videoRoomProperty);
  const { messages } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const roomId = callProperty.getRoomId();
  const fromName = callProperty.getDoctorName();
  const fromId = callProperty.getDoctorId();
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
      sendMessage(roomId, fromName, fromId, toId, fileUrl, toName);
    }
  }

  const sendMessageHandler = (event) => {
    sendMessage(roomId, fromName, fromId, toId, fileUrl, toName);
  }

  useEffect(() => {
    console.log('useEffect');
    SOCKET_IO.emit('login_room', { RoomId: roomId });
    SOCKET_IO.on('new_message', async (data) => {
      await dispatch(addMessage(data));
      SOCKET_IO.emit('read', { RoomId: roomId, ToId: fromId });
      chatScroll();
      console.log('newMessage', data);
    });
    SOCKET_IO.on('typing', (data) => {
      if (data.FromId === toId) {
        if (data.isTyping) {
          chatScroll();
        }
      }
    });

    SOCKET_IO.on('all_messages', async (allMesages) => {
      await dispatch(initializeMessages(allMesages));
      SOCKET_IO.emit('read', { RoomId: roomId, ToId: fromId });
      chatScroll();
      console.log(allMesages);
    });


    SOCKET_IO.on('connect', () => {
      console.log('SOCKET_IO.IO bağlandı');
    });

    SOCKET_IO.on('disconnect', () => {
      console.log('SOCKET_IO.IO bağlantısı kesildi');
    });
    return () => {
      SOCKET_IO.off('new_message');
      SOCKET_IO.off('typing');
      SOCKET_IO.off('all_messages');
    };
  }, [callProperty]);

  return (
    <div className="content-full tab-pane" id="chats_tab">
      <div className="chat-window">
        <div className="chat-contents">
          <div className="chat-content-wrap">
            <div className="chat-wrap-inner" id='chat-list'>
              <div className="chat-box">
                <div className="chats">
                  {
                    messages && messages.map((message, index) => {
                      const messageDate = new Date(message.CreatedDate);
                      /// To add chatLine when a new day is passed
                      if (!prevDate || (messageDate && messageDate.getDate() !== prevDate.getDate())) {
                        prevDate = messageDate;
                        return (
                          <div key={index}>
                            <ChatLine key={index} date={dateFormat(messageDate, options)} />
                            <Message  message={message} />
                          </div>
                        );
                      } else {
                        prevDate = messageDate;
                        return <Message key={index} message={message} />
                      }
                    })
                  }
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
                  <span className="input-group-append" onClick={sendMessageHandler}>
                    <button className="btn btn-primary" type="button"><i className="fa fa-send" /></button>
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
