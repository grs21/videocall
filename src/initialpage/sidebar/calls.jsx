import React from 'react'
import { Link } from 'react-router-dom';
import { Avatar_02, Avatar_09 } from '../../assets/imagePath'

function calls() {
  return (
    <div className="content-full tab-pane" id="calls_tab">
      <div className="chat-wrap-inner">
        <div className="chat-box">
          <div className="chats">
            <div className="chat chat-left">
              <div className="chat-avatar">
                <Link to="/app/profile/employee-profile" className="avatar">
                  <img alt="" src={Avatar_02} />
                </Link>
              </div>
              <div className="chat-body">
                <div className="chat-bubble">
                  <div className="chat-content">
                    <span className="task-chat-user">You</span> <span className="chat-time">8:35 am</span>
                    <div className="call-details">
                      <i className="material-icons">phone_missed</i>
                      <div className="call-info">
                        <div className="call-user-details">
                          <span className="call-description">Jeffrey Warden missed the call</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat chat-left">
              <div className="chat-avatar">
                <Link to="/app/profile/employee-profile" className="avatar">
                  <img alt="" src={Avatar_02} />
                </Link>
              </div>
              <div className="chat-body">
                <div className="chat-bubble">
                  <div className="chat-content">
                    <span className="task-chat-user">John Doe</span> <span className="chat-time">8:35 am</span>
                    <div className="call-details">
                      <i className="material-icons">call_end</i>
                      <div className="call-info">
                        <div className="call-user-details"><span className="call-description">This call has ended</span></div>
                        <div className="call-timing">Duration: <strong>5 min 57 sec</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-line">
              <span className="chat-date">January 29th, 2019</span>
            </div>
            <div className="chat chat-left">
              <div className="chat-avatar">
                <Link to="/app/profile/employee-profile" className="avatar">
                  <img alt="" src={Avatar_09} className="img-fluid rounded-circle" />
                </Link>
              </div>
              <div className="chat-body">
                <div className="chat-bubble">
                  <div className="chat-content">
                    <span className="task-chat-user">Richard Miles</span> <span className="chat-time">8:35 am</span>
                    <div className="call-details">
                      <i className="material-icons">phone_missed</i>
                      <div className="call-info">
                        <div className="call-user-details">
                          <span className="call-description">You missed the call</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat chat-left">
              <div className="chat-avatar">
                <Link to="/app/profile/employee-profile" className="avatar">
                  <img alt="" src={Avatar_09} />
                </Link>
              </div>
              <div className="chat-body">
                <div className="chat-bubble">
                  <div className="chat-content">
                    <span className="task-chat-user">You</span> <span className="chat-time">8:35 am</span>
                    <div className="call-details">
                      <i className="material-icons">ring_volume</i>
                      <div className="call-info">
                        <div className="call-user-details">
                          <a href="#" className="call-description call-description--linked" data-qa="call_attachment_link">Calling John Smith ...</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default calls
