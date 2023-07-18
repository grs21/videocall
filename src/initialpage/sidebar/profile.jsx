import React from 'react'
import { Link } from 'react-router-dom';
import { User, Attachment, Avatar_01, Avatar_05, Avatar_02, Avatar_09, Avatar_13, Avatar_16, Video_Call } from '../../assets/imagePath'

function profile() {
  return (
    <div className="content-full tab-pane show active" id="profile_tab">
    <div className="display-table">
      <div className="table-row">
        <div className="table-body">
          <div className="table-content">
            <div className="chat-profile-img">
              <div className="edit-profile-img">
                <img src={Avatar_09} alt="" />
                <span className="change-img">Change Image</span>
              </div>
              <h3 className="user-name m-t-10 mb-0">John Doe</h3>
              <small className="text-muted">Web Designer</small>
              <a href="" className="btn btn-primary edit-btn"><i className="fa fa-pencil" /></a>
            </div>
            <div className="chat-profile-info">
              <ul className="user-det-list">
                <li>
                  <span>Username:</span>
                  <span className="float-end text-muted">johndoe</span>
                </li>
                <li>
                  <span>DOB:</span>
                  <span className="float-end text-muted">24 July</span>
                </li>
                <li>
                  <span>Email:</span>
                  <span className="float-end text-muted">johndoe@example.com</span>
                </li>
                <li>
                  <span>Phone:</span>
                  <span className="float-end text-muted">9876543210</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default profile
