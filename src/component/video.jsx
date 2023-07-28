import React, { useEffect, useRef, useState } from 'react';
import { MuteMicrophone, User, UserLeave, Video_Call } from '../assets/imagePath'
import { joinVideoRoom, isBase64, leaveRoom, startSetCallRecord } from '../helper/videoCallHelper';
import AgoraRTC from "agora-rtc-sdk-ng";
import { useSelector, useDispatch } from 'react-redux';
import { prepareVideoCallPush } from '../service/api/apiService';
import { Call, VideoSlash } from '../assets/svg/assets';
import { setInCalling, setIsCallEnd} from '../stores/slices/videoRoomSlice';
import { setTimerStarted, setIsAudio, setIsVideo, setIsPatientLeft, setIsPatientMute, setIsCalling} from '../stores/slices/componentState';
import ResultItem from '../component/resultItem';

function Video( {channelParametersRef}) {
    const { callPrepareVideo, inCalling, isCallEnd } = useSelector(state => state.videoRoomProperty);
    const { isPatientLeft, isCalling } = useSelector(state => state.componentState);
    const dispatch = useDispatch();
    const agoraEngineRef = useRef(null);
    const pattientName = callPrepareVideo.getPatinetName();
    const patientImg = callPrepareVideo.getPatientPhoto();
    const micController = document.getElementById('mic_controller');
    const vidController = document.getElementById('video_controller');
    let interval;
    
    useEffect(() => {
        const startBasicCall = async () => {
            agoraEngineRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            const remotePlayerContainer = document.createElement('div');
            remotePlayerContainer.style = 'width: 100%;height: 100%;position: inherit;overflow: hidden;'
            const micICon = document.createElement('img');
            micICon.id = 'remote_mic'
            micICon.className = 'remote-mic hide';
            micICon.src = MuteMicrophone;
            remotePlayerContainer.append(micICon);
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
                    dispatch(setIsCalling(false));
                    dispatch(setInCalling(true));
                    dispatch(setIsPatientLeft(false));
                    let remoteUser = document.getElementById('user-video-container');
                    remoteUser.childNodes[1].style.display = 'block'
                    await channelParametersRef.current.remoteVideoTrack.play(remotePlayerContainer);
                    const videoContainer = remotePlayerContainer.childNodes[1];
                    videoContainer.style = ''
                    videoContainer.firstChild.style = 'object-fit: contain;width: 100%;height: 100%;position: absolute;left: 0px;top: 0px;'

                }
                if (mediaType === "audio") {
                    channelParametersRef.current.remoteAudioTrack = user.audioTrack;
                    channelParametersRef.current.remoteAudioTrack.play();
                }
            });
            agoraEngineRef.current.on('user-left', async (user, reason) => {
                dispatch(setIsPatientLeft(true));
                let remoteUser = document.getElementById('user-video-container');
                remoteUser.childNodes[1].style.display = 'none'
            });
            agoraEngineRef.current.on("user-published", async (user, mediaType) => {
                if (mediaType === "audio") {

                    dispatch(setIsPatientMute(false))
                    document.getElementById('remote_mic').classList.remove('show');
                } else if (mediaType === "video") {

                }
            });
            agoraEngineRef.current.on("user-unpublished", async (user, mediaType) => {
                if (mediaType === "audio") {
                    dispatch(setIsPatientMute(true))
                    document.getElementById('remote_mic').classList.add('show');

                } else if (mediaType === "video") {

                }
            });
            document.getElementById('begin_call').onclick = async (e) => {
                e.preventDefault();
                dispatch(setIsCalling(true));
                dispatch(setInCalling(true));
                dispatch(setIsCallEnd(false));
                dispatch(setTimerStarted(true));
                if (agoraEngineRef.current.store.state.uid === undefined) {
                    await startBasicCall();
                }
                prepareVideoCallPush();
                document.getElementById('my-video-container').classList.add('my-video-small');
                startSetCallRecord('Connected');
                interval = setInterval(startSetCallRecord, 10000);
            }

            document.getElementById('end_call').onclick = (e) => {
                e.preventDefault();
                leaveRoom(agoraEngineRef, channelParametersRef, remotePlayerContainer, localPlayerContainer);
                dispatch(setInCalling(false));
                dispatch(setIsCalling(false));
                dispatch(setIsCallEnd(true));
                dispatch(setTimerStarted(false));
                dispatch(setIsVideo(false));
                dispatch(setIsAudio(false));
                dispatch(setIsPatientLeft(false));
                document.getElementById('my-video-container').classList.remove('my-video-small');
                clearInterval(interval);
                startSetCallRecord('Disconnected');
                micController.classList.remove('call-mute');
                vidController.classList.remove('call-mute');
            }
            joinVideoRoom(agoraEngineRef, channelParametersRef, callPrepareVideo, localPlayerContainer);
        }
        startBasicCall();
    }, [callPrepareVideo])



    return (
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
                            : isPatientLeft ? (
                                <div className='result-wrapper'>
                                    <div className='body-container' >
                                        <div className='custom-background-img'>
                                            <img src={UserLeave} alt="" style={{ marginBlock: '2em' }} />
                                        </div>
                                        {/* <div className='text-container'>
                            <p>Hasta görüşmeden ayrıldı.</p>
                        </div> */}
                                    </div>
                                </div>
                            ) : <div></div>
                    }
                </div>
                {
                    <div className="my-video" id='my-video-container'>
                        {
                            isCallEnd ?
                                (<ResultItem />)
                                :
                                (<img src={User} className={(inCalling ? 'hide' : 'show')} alt="" />)
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Video
