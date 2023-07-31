import React, { useEffect, useRef } from 'react';
import { User } from '../../assets/imagePath'
import { isBase64 } from '../../helper/videoCallHelper';
import { useSelector, useDispatch } from 'react-redux';
import { setMessagesCount } from '../../stores/slices/messagesSlice';
import ChatIcon from '../../component/chatIcon';
import { prepareVideoCallPush } from '../../service/api/apiService';
import { VideoSlash } from '../../assets/svg/assets';
import { AGAIN_BEGIN_COLLING, ARE_YOU_SHOURE, BEGIN_COLLING, CALL_END, CANCEL } from '../../constant/constant';
import { setInCalling, setIsCallEnd } from '../../stores/slices/videoRoomSlice';
import { setIsAudio, setIsVideo, setIsCalling } from '../../stores/slices/componentState';
import VideoCallTimer from '../../component/videoCallTimer';
import AppIcon from '../../component/appIcon';
import { ToastContainer } from 'react-toastify';
import Video from '../../component/video';


function VideoArea() {
  const { callPrepareVideo, inCalling, GUID } = useSelector(state => state.videoRoomProperty);
  const { isAudio, isVideo, isPatientLeft } = useSelector(state => state.componentState);
  const { messages, sidebarState } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const pattientName = callPrepareVideo.getPatinetName();
  const patientImg = callPrepareVideo.getPatientPhoto();
  const micController = document.getElementById('mic_controller');
  const vidController = document.getElementById('video_controller');
  const channelParametersRef = useRef({
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    remoteUid: null,
  });

  /// set message notification
  useEffect(() => {
    const chatNavbar = document.getElementsByClassName('nav-item');
    if (chatNavbar.length > 0) {
      for (let navbar of chatNavbar) {
        if (navbar.firstChild.href.includes('chats_tab')) {
          const isActive = navbar.firstChild.classList.contains('active');
          if (isActive && sidebarState) {
            dispatch(setMessagesCount(0));
          }
        }
      }
    }
  }, [messages,dispatch, sidebarState])

  const handlerFullscreen = (e) => {
    e.preventDefault();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  const handlerMuteMic = (e) => {
    e.preventDefault();
    dispatch(setIsAudio(!isAudio));
    const localAudioTrack = channelParametersRef.current.localAudioTrack;
    localAudioTrack.setEnabled(isAudio);
    micController.classList.toggle('call-mute', !isAudio);
  }

  const handlerVideo = (e) => {
    e.preventDefault();
    dispatch(setIsVideo(!isVideo));
    const localVideoTrack = channelParametersRef.current.localVideoTrack;
    if (localVideoTrack) {
      localVideoTrack.setEnabled(isVideo);
      vidController.classList.toggle('call-mute', !isVideo);
    }
  }
  const againBeginCall = () => {
    dispatch(setIsCalling(true));
    dispatch(setInCalling(true));
    dispatch(setIsCallEnd(false));
    prepareVideoCallPush(GUID);
  }
  return (
    <div className="col-lg-9 message-view task-view show" id='task_window'>
      <div className="chat-window">
        <div className="fixed-header">
          <div className="navbar">
            <div className="user-details">
              <div className="float-start user-img">
                <div className="avatar" title="Mike Litorus">
                  <img src={((patientImg === null || patientImg === undefined) ? User
                    : isBase64(patientImg) ? patientImg
                      : `data:image/png;base64,${patientImg}`)} alt="" className="rounded-circle" />
                </div>
              </div>
              <div className="user-info float-start">
                <div className='name'>{pattientName}</div>
                {/* <div className="last-seen">{branchName}</div> */}
              </div>
            </div>
            <AppIcon />
            <ChatIcon />
          </div>
        </div>
        <Video channelParametersRef={channelParametersRef}></Video>
        <div className="chat-footer">
          <div className="call-icons">
            <VideoCallTimer />
            <ul className="call-items">
              <li className="call-item">
                <a className='' id='video_controller' href="" title="Enable Video" onClick={handlerVideo} data-placement="top" data-bs-toggle="tooltip">
                  {
                    isVideo ? <VideoSlash />
                      :
                      <i className="fa fa-video-camera camera" />
                  }
                </a>
              </li>
              <li className="call-item">
                <a className='' id='mic_controller' href="" title="Mute Audio" onClick={handlerMuteMic} data-placement="top" data-bs-toggle="tooltip">
                  <i className={'fa ' + (isAudio ? 'fa-microphone-slash ' : 'fa-microphone') + ' microphone'} />
                </a>
              </li>
              <li className="call-item">
                <a href="" title="Full Screen" onClick={handlerFullscreen} data-placement="top" data-bs-toggle="tooltip">
                  <i className="fa fa-arrows-v full-screen" />
                </a>
              </li>
            </ul>
            <div className='call-container'>
              <div className='group-buttons'>
                <div className={"end-call " + (inCalling ? 'show' : 'hide')} data-bs-toggle='modal' data-bs-target='#call-end-modal'  >
                  <div>
                    <i className="material-icons">call_end</i>
                    <div className='button-text' >Aramayı Sonlandır</div>
                  </div>
                </div>
                <div className={"begin-call " + (inCalling ? 'hide' : 'show')} id='begin_call' >
                  <div>
                    <i className="material-icons">call_end</i>
                    <div className='button-text' >{BEGIN_COLLING}</div>
                  </div>
                </div>
              </div>
              <div className={"begin-call " + (isPatientLeft ? 'show' : 'hide')} id='again_begin_call' onClick={againBeginCall} >
                <div>
                  <i className="material-icons">call_end</i>
                  <div className='button-text' >{AGAIN_BEGIN_COLLING}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="call-end-modal" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>{ARE_YOU_SHOURE}</label>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <div className="btn btn-primary submit-btn" data-bs-dismiss="modal" aria-label="Close" >{CANCEL}</div>
                  <button className="btn btn-danger submit-btn" id='end_call' data-bs-dismiss="modal" aria-label="Close">{CALL_END}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={1000}
        hideProgressBar
      />
    </div>
  )
}

export default VideoArea