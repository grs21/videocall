import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import DragFilesModal from '../modals/dragFilesModal';
import ShareFileModal from '../modals/shareFileModal';
import VideoArea from '../initialpage/layout/videoArea';
import NavItem from '../component/navItem';
import Chat from '../initialpage/sidebar/chat';
import Profile from '../initialpage/sidebar/profile';
import { useLocation } from 'react-router-dom';
import { setGUID } from '../stores/slices/videoRoomSlice';
import { useRef } from 'react';
import { callPrepareVideo } from '../service/api/apiService';
import { setCallPrepareVideo } from '../stores/slices/videoRoomSlice';

const VideoCall = () => {
  const dispatch = useDispatch();
  const { GUID } = useSelector(state => state.videoRoomProperty);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const guid = searchParams.get('GUID');
  const effectRun = useRef(false);
  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight - 1,
  })

  useEffect(() => {
    dispatch(setGUID(GUID));
    if (effectRun.current === false) {
      const initializeApp = async () => {
        const resPrepareVideoCall = await callPrepareVideo(guid);
        await dispatch(setCallPrepareVideo(resPrepareVideoCall));
      }
      initializeApp();
      return () => {
        effectRun.current = true;
      }
    }
    console.log(guid);
  });
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,

    })
  }
  useEffect(() => {
    window.addEventListener("resize", detectSize)
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimension])
  useEffect(() => {
    let firstload = localStorage.getItem("minheight")
    if (firstload === "false") {
      setTimeout(function () {
        window.location.reload(1)
        localStorage.removeItem("minheight")
      }, 1000)
    }
  });

  return (
    <div className="page-wrapper" style={{ minHeight: windowDimension.winHeight }}>
      <Helmet>
        <title>Video Call - MLP Online</title>
        <meta name="description" content="Chat" />
      </Helmet>
      {/* Main Row */}
      <div className="chat-main-row">
        <div className="chat-main-wrapper">
          <VideoArea />
          <div className="col-lg-3 message-view chat-profile-view chat-sidebar collapse show" id="task_window">
            <div className="chat-window video-window">
              <div className="fixed-header">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <NavItem href='#profile_tab' state='active' navName='Profil' />
                  <NavItem href='#chats_tab' state='' navName='Chat' />

                </ul>
              </div>
              <div className="tab-content chat-contents">
                <Profile />
                <Chat />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Main Row */}
      {/* Dragfiles Modal */}
      <DragFilesModal />
      {/* /Dragfiles Modal */}
      {/* Share Files Modal */}
      <ShareFileModal />
      {/* /Share Files Modal */}
    </div >
  );

}

export default VideoCall;
