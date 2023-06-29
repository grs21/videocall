import React from 'react'
import { Link } from 'react-router-dom';
import { Avatar_09 } from '../assets/imagePath';
import { dateFormat } from '../helper/videoCallHelper';

function chat({ message }) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
    return (
        <div className="chat chat-left">
            <div className="chat-avatar">
                <Link to="/app/profile/employee-profile" className="avatar">
                    <img alt="" src={Avatar_09} />
                </Link>
            </div>
            <div className="chat-body">
                <div className="chat-bubble">
                    <div className="chat-content">
                        <span className="task-chat-user">{message.FromName}</span><span className="chat-time">{dateFormat(message.CreatedDate, options)}</span>
                        <p>{message.Message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default chat
{/*                                 
                                    <div className="chat chat-left">
                                        <div className="chat-avatar">
                                            <Link to="/app/profile/employee-profile" className="avatar">
                                                <img alt="" src={Avatar_09} />
                                            </Link>
                                        </div>
                                        <div className="chat-body">
                                            <div className="chat-bubble">
                                                <div className="chat-content">
                                                    <span className="task-chat-user">John Doe</span> <span className="chat-time">8:35 am</span>
                                                    <p>I'm just looking around.</p>
                                                    <p>Will you tell me something about yourself? </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>    

                                    <div className="chat chat-left">
                                        <div className="chat-avatar">
                                            <Link to="/app/profile/employee-profile" className="avatar">
                                                <img alt="" src={Avatar_16} />
                                            </Link>
                                        </div>
                                        <div className="chat-body">
                                            <div className="chat-bubble">
                                                <div className="chat-content">
                                                    <span className="task-chat-user">Jeffery Lalor</span> <span className="file-attached">attached file <i className="fa fa-paperclip" /></span> <span className="chat-time">Yesterday at 9:16pm</span>
                                                    <ul className="attach-list">
                                                        <li className="pdf-file"><i className="fa fa-file-pdf-o" /> <a href="#">Document_2016.pdf</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="chat chat-left">
                                        <div className="chat-avatar">
                                            <Link to="/app/profile/employee-profile" className="avatar">
                                                <img alt="" src={Avatar_16} />
                                            </Link>
                                        </div>
                                        <div className="chat-body">
                                            <div className="chat-bubble">
                                                <div className="chat-content">
                                                    <span className="task-chat-user">Jeffery Lalor</span> <span className="file-attached">attached file <i className="fa fa-paperclip" /></span> <span className="chat-time">Today at 12:42pm</span>
                                                    <ul className="attach-list">
                                                        <li className="img-file">
                                                            <div className="attach-img-download"><a href="#">avatar-1.jpg</a></div>
                                                            <div className="task-attach-img"><img src={User} alt="" /></div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}