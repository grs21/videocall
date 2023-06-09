import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { setRoomProperty } from '../stores/slices/videoRoomSlice';
import DragFilesModal from '../modals/dragFilesModal';
import ShareFileModal from '../modals/shareFileModal';
import VideoArea from '../initialpage/layout/videoArea';
import NavItem from '../component/navItem';
import Chat from '../initialpage/sidebar/chat';
import Calls from '../initialpage/sidebar/calls';
import Profile from '../initialpage/sidebar/profile';

const VideoCall = () => {
  const { roomProperty } = useSelector(state => state.videoRoomProperty);
  const { messages, newMessageCount, notifCState, sidebarState } = useSelector(state => state.messages);
  const { imageModalState, shareImgURL } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  dispatch(setRoomProperty({
    appId: 'afadeb1ff63443ac93d5e953314a544f',
    channel: 'test1',
    token: '007eJxTYPDRCBW6asf5bdFsziPHJv8/xntMo0xsinnuUsanghrOnUcUGBLTElNSkwzT0syMTUyME5MtjVNMUy1NjY0NTRJNTUzSnixel9IQyMiwWvQyAyMUgvisDCWpxSWGDAwAJlwfUg==',
    uid: 0,
  }))
  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight - 1,
  })
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
        <title>Video Call - HRMS Admin Template</title>
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
                  <NavItem href='#profile_tab' state='active' navName='Profile' />
                  <NavItem href='#chats_tab' state='' navName='Chats' />
                  <NavItem href='#calls_tab' state='' navName='Calls' />
                </ul>
              </div>
              <div className="tab-content chat-contents">
                <Profile />
                <Chat />
                <Calls />
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
