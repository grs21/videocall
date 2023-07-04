import React, { useEffect, useRef, useState } from 'react';
import { Avatar_01, Avatar_05 } from '../../assets/imagePath'
import { joinVideoRoom, leaveRoom } from '../../helper/videoCallHelper';
import AgoraRTC from "agora-rtc-sdk-ng";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMessagesCount } from '../../stores/slices/messagesSlice';
import ChatIcon from '../../component/chatIcon';

function VideoArea() {
  const { roomProperty, callProperty } = useSelector(state => state.videoRoomProperty);
  const { messages, newMessageCount, notifCState, sidebarState } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const agoraEngineRef = useRef(null);
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
        await agoraEngineRef.current.subscribe(user, mediaType);
        if (mediaType === "video") {
          channelParametersRef.current.remoteVideoTrack = user.videoTrack;
          channelParametersRef.current.remoteAudioTrack = user.audioTrack;
          channelParametersRef.current.remoteUid = user.uid.toString();
          remotePlayerContainer.id = user.uid.toString();
          channelParametersRef.current.remoteUid = user.uid.toString();
          remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
          document.getElementById('user-video-container').append(remotePlayerContainer);
          await channelParametersRef.current.remoteVideoTrack.play(remotePlayerContainer);
          remotePlayerContainer.childNodes[1].style = ''
          remotePlayerContainer.childNodes[1].firstChild.style = 'object-fit: contain;width: 100%;height: 100%;position: absolute;left: 0px;top: 0px;'
        }
        if (mediaType === "audio") {
          channelParametersRef.current.remoteAudioTrack = user.audioTrack;
          channelParametersRef.current.remoteAudioTrack.play();
        }
      });

      document.getElementById('ara').onclick = async (e) => {
        e.preventDefault();
        joinVideoRoom(agoraEngineRef, channelParametersRef, roomProperty, localPlayerContainer);
      }
    }
    startBasicCall();
  }, [callProperty])

  return (
    <div className="col-lg-9 message-view task-view show" id='task_window'>
      <div className="chat-window">
        <div className="fixed-header">
          <div className="navbar">
            <div className="user-details">
              <div className="float-start user-img">
                <Link className="avatar" to="/app/profile/employee-profile" title="Mike Litorus">
                  <img src={Avatar_05} alt="" className="rounded-circle" />
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
              {/* <img src={Video_Call} alt="" /> */}
            </div>
            <div className="my-video" id='my-video-container'>
              <ul>
                <li>
                  <img src={Avatar_01} className="img-fluid" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="chat-footer">
          <div className="call-icons">
            <span className="call-duration">00:59</span>
            <ul className="call-items">
              <li className="call-item" id='ara'>
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
            <div className="end-call">
              <a href="">
                <i className="material-icons">call_end</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoArea