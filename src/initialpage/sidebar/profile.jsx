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
            <div>
              <ul className="nav nav-tabs nav-tabs-solid nav-justified mb-0">
                <li className="nav-item"><a className="nav-link active" href="#all_files" data-bs-toggle="tab">All Files</a></li>
                <li className="nav-item"><a className="nav-link" href="#my_files" data-bs-toggle="tab">My Files</a></li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane show active" id="all_files">
                  <ul className="files-list">
                    <li>
                      <div className="files-cont">
                        <div className="file-type">
                          <span className="files-icon"><i className="fa fa-file-pdf-o" /></span>
                        </div>
                        <div className="files-info">
                          <span className="file-name text-ellipsis">AHA Selfcare Mobile Application Test-Cases.xls</span>
                          <span className="file-author"><a href="#">Loren Gatlin</a></span> <span className="file-date">May 31st at 6:53 PM</span>
                        </div>
                        <ul className="files-action">
                          <li className="dropdown dropdown-action">
                            <a href="" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_horiz</i></a>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="">Download</a>
                              <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#share_files">Share</a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="tab-pane" id="my_files">
                  <ul className="files-list">
                    <li>
                      <div className="files-cont">
                        <div className="file-type">
                          <span className="files-icon"><i className="fa fa-file-pdf-o" /></span>
                        </div>
                        <div className="files-info">
                          <span className="file-name text-ellipsis">AHA Selfcare Mobile Application Test-Cases.xls</span>
                          <span className="file-author"><a href="#">John Doe</a></span> <span className="file-date">May 31st at 6:53 PM</span>
                        </div>
                        <ul className="files-action">
                          <li className="dropdown dropdown-action">
                            <a href="" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_horiz</i></a>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="">Download</a>
                              <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#share_files">Share</a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
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

export default profile
