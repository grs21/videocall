import React from 'react'
import { Coming_Soon, User } from '../../assets/imagePath'
import { useSelector } from 'react-redux';
import { isBase64 } from '../../helper/videoCallHelper';
import ChatLine from '../../component/chatLine';

function Profile() {
  const { callPrepareVideo } = useSelector(state => state.videoRoomProperty);
  const patientImg = callPrepareVideo.getPatientPhoto();
  const patientName = callPrepareVideo.getPatinetName();
  return (
    <div className="content-full tab-pane show active" id="profile_tab">
      <div className="display-table">
        <div className="table-row">
          <div className="table-body">
            <div className="table-content">
              <div className="chat-profile-img">
                <div className="edit-profile-img">
                  <img src={
                    ((patientImg === null || patientImg === undefined) ? User
                      : isBase64(patientImg) ? patientImg
                        : `data:image/png;base64,${patientImg}`)
                  } alt="" />
                  <span className="change-img">Change Image</span>
                </div>
                <h3 className="user-name m-t-10 mb-0">{
                  patientName === null ? '' : patientName
                }</h3>
              </div>
              <ChatLine date={''} />
              <div className="chat-profile-info">
                <ul className="user-det-list">
                  <li>
                    <img src={Coming_Soon} alt="" />
                    {/* <span>Yakında burdayız...</span> */}

                    {/* <span className="float-end text-muted">{firstName}</span> */}
                  </li>
                  {/* <li>
                    <span>Soyadı:</span>
                    <span className="float-end text-muted">{lastName}</span>
                  </li>
                  <li>
                    <span>Numara:</span>
                    <span className="float-end text-muted">{patientNumber === null ? '' : patientNumber}</span>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
