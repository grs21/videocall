import React from 'react'
import { Attachment } from '../../assets/imagePath'
import Message from '../../component/message';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../stores/slices/messagesSlice';

function Chat() {
    const { messages } = useSelector(state => state.messages);
    const dispatch = useDispatch();
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    const sendMessage = (event) => {
        console.log('message');
        dispatch(addMessage('message'));
    }

    return (
        <div className="content-full tab-pane" id="chats_tab">
            <div className="chat-window">
                <div className="chat-contents">
                    <div className="chat-content-wrap">
                        <div className="chat-wrap-inner">
                            <div className="chat-box">
                                <div className="chats">
                                    <Message />
                                    <Message />
                                    <Message />
                                    <Message />
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
                                    <textarea className="form-control" placeholder="Type message..." defaultValue={""} onKeyDown={handleKeyPress} />
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
