import React, { useEffect, useRef, useState } from 'react';
import { User, Video_Call } from '../../assets/imagePath'
import { joinVideoRoom, isBase64, leaveRoom } from '../../helper/videoCallHelper';
import AgoraRTC from "agora-rtc-sdk-ng";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMessagesCount } from '../../stores/slices/messagesSlice';
import ChatIcon from '../../component/chatIcon';
import { prepareVideoCallPush } from '../../service/api/apiService';
import { Call } from '../../assets/svg/assets';
import { ARE_YOU_SHOURE, BEGIN_COLLING, CALL_END, CANCEL } from '../../constant/constant';
import { setInCalling, setIsCallEnd } from '../../stores/slices/videoRoomSlice';
import ResultItem from '../../component/resultItem';


function VideoArea() {
  const { callPrepareVideo, inCalling, isCallEnd } = useSelector(state => state.videoRoomProperty);
  const { messages, sidebarState } = useSelector(state => state.messages);
  const [isCalling, setIsCalling] = useState(false);
  const dispatch = useDispatch();
  const agoraEngineRef = useRef(null);
  const pattientName = callPrepareVideo.getPatinetName();
  const patientImg = callPrepareVideo.getPatientPhoto();
  const channelParametersRef = useRef({
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    remoteUid: null,
  });

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
  }, [messages])

  useEffect(() => {
    const startBasicCall = async () => {
      agoraEngineRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      const remotePlayerContainer = document.createElement('div');
      remotePlayerContainer.style = 'width: 100%;height: 100%;position: inherit;overflow: hidden;'
      const localPlayerContainer = document.createElement('div');
      localPlayerContainer.style = 'width: 100%;height: 100%;position: inherit;overflow: hidden;border-radius: 6px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;border: 1px solid white;';
      agoraEngineRef.current.on("user-published", async (user, mediaType) => {
        const uuid = user.uid;
        await agoraEngineRef.current.subscribe(user, mediaType);
        if (mediaType === "video") {
          channelParametersRef.current.remoteVideoTrack = user.videoTrack;
          channelParametersRef.current.remoteAudioTrack = user.audioTrack;
          channelParametersRef.current.remoteUid = uuid;
          remotePlayerContainer.id = uuid;
          channelParametersRef.current.remoteUid = uuid;
          document.getElementById('user-video-container').append(remotePlayerContainer);
          setIsCalling(false);
          dispatch(setInCalling(true));
          await channelParametersRef.current.remoteVideoTrack.play(remotePlayerContainer);
          const videoContainer = remotePlayerContainer.childNodes[0];
          videoContainer.style = ''
          videoContainer.firstChild.style = 'object-fit: contain;width: 100%;height: 100%;position: absolute;left: 0px;top: 0px;'

        }
        if (mediaType === "audio") {
          channelParametersRef.current.remoteAudioTrack = user.audioTrack;
          channelParametersRef.current.remoteAudioTrack.play();
        }
      });
      document.getElementById('begin_call').onclick = async (e) => {
        e.preventDefault();
        setIsCalling(true);
        dispatch(setInCalling(true));
        dispatch(setIsCallEnd(false));
        console.log('başlattttt');
        if (agoraEngineRef.current.store.state.uid === undefined) {
          await startBasicCall();
        }
        //prepareVideoCallPush();
        document.getElementById('my-video-container').classList.add('my-video-small');
      }

      document.getElementById('end_call').onclick = (e) => {
        e.preventDefault();
        console.log('leaveeeeee');
        leaveRoom(agoraEngineRef, channelParametersRef, remotePlayerContainer, localPlayerContainer);
        dispatch(setInCalling(false));
        setIsCalling(false);
        dispatch(setIsCallEnd(true));
        document.getElementById('my-video-container').classList.remove('my-video-small');
      }
      joinVideoRoom(agoraEngineRef, channelParametersRef, callPrepareVideo, localPlayerContainer);
    }
    startBasicCall();
  }, [callPrepareVideo])

  return (
    <div className="col-lg-9 message-view task-view show" id='task_window'>
      <div className="chat-window">
        <div className="fixed-header">
          <div className="navbar">
            <div className="user-details">
              <div className="float-start user-img">
                <Link className="avatar" to="/app/profile/employee-profile" title="Mike Litorus">
                  <img src={User} alt="" className="rounded-circle" />
                  <span className="status online" />
                </Link>
              </div>
              <div className="user-info float-start">
                <Link to="/app/Email/employee-profile"><span>Mike Litorus</span></Link>
                <span className="last-seen">Online</span>
              </div>
            </div>
            <ChatIcon />
          </div>
        </div>
        <div className="chat-contents">
          <div className="chat-content-wrap">
            <div className="user-video" id='user-video-container'>
              {
                isCalling ?
                  <div className='calling-container' id='callin_container'>
                    <div className="call-profile-img">
                      <div className="wrap-profile-img">
                        <img src={
                          (patientImg === null ? User
                            : isBase64(patientImg) ? patientImg
                              : `data:image/png;base64,${patientImg}`)
                        } alt="" />
                      </div>
                      <h3 className="user-name m-t-10 mb-0">{pattientName}</h3>
                    </div>
                    <div className="calling">
                      <Call />
                    </div>
                    <span>Aranıyor...</span>
                  </div>
                  : <div></div>
              }
            </div>
            {
              <div className="my-video" id='my-video-container'>
                {
                  isCallEnd ?
                    <ResultItem />
                    :
                    <img src={User} className={(inCalling ? 'hide' : 'show')} alt="" />
                }

              </div>
            }
          </div>
        </div>
        <div className="chat-footer">
          <div className="call-icons">
            <span className="call-duration">00:59</span>
            <ul className="call-items">
              <li className="call-item">
                <a href="" title="Enable Video" data-placement="top" data-bs-toggle="tooltip">
                  <i className="fa fa-video-camera camera" />
                </a>
              </li>
              <li className="call-item">
                <a href="" title="Mute Audio" data-placement="top" data-bs-toggle="tooltip">
                  <i className="fa fa-microphone microphone" />
                </a>
              </li>
              <li className="call-item">
                <a href="" title="Add User" data-placement="top" data-bs-toggle="tooltip">
                  <i className="fa fa-user-plus" />
                </a>
              </li>
              <li className="call-item">
                <a href="" title="Full Screen" data-placement="top" data-bs-toggle="tooltip">
                  <i className="fa fa-arrows-v full-screen" />
                </a>
              </li>
            </ul>
            <div className='call-container'>
              <div className={"end-call " + (inCalling ? 'show' : 'hide')} data-bs-toggle='modal' data-bs-target='#call-end-modal'  >
                <div>
                  <i className="material-icons">call_end</i>
                </div>
              </div>
              <div className={"begin-call " + (inCalling ? 'hide' : 'show')} id='begin_call' >
                <div>
                  <i className="material-icons">call_end</i>
                  <div >{BEGIN_COLLING}</div>
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
    </div>
  )
}

export default VideoArea