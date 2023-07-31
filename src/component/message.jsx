import React from 'react';
import { User } from '../assets/imagePath';
import ChatLine from './chatLine';
import { useDispatch, useSelector } from 'react-redux';
import { setShareImgURL } from '../stores/slices/imageShareSlice';
import { isBase64 } from '../helper/videoCallHelper';

function Chat({ message }) {
    const { callPrepareVideo } = useSelector(state => state.videoRoomProperty);
    const dispatch = useDispatch();
    const doctorImg = callPrepareVideo.getDoctorPhoto();
    const patientImg = callPrepareVideo.getPatientPhoto();
    const doctorId = callPrepareVideo.getDoctorId();
    const messageFromId = message.FromId;
    const isDoctor = doctorId === messageFromId
    const fileUrl = message.FileUrl;
    const fileExtension = fileUrl.split('.').pop();
    const messageName = message.FromName.replace(/Optional|\(|\)|\[|\]|\{|\}/g, "").replace(/"/g, "");
    const isThereFile = fileUrl === '';
    const isImage = fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg'
    const isPDF = fileExtension === 'pdf';

    const imageMessageHandler = (e) => {
        dispatch(setShareImgURL(fileUrl));
    }

    return (
        <div className={'chat ' + (isDoctor ? 'chat-right' : 'chat-left')}>
            <div className="chat-avatar">
                <div className="avatar">
                    <img alt="" src={
                        isDoctor ? (doctorImg === null ? User : doctorImg)
                            : (patientImg === null ? User
                                : isBase64(patientImg) ? patientImg
                                    : `data:image/png;base64,${patientImg}`)
                    } />
                </div>
            </div>
            <div className="chat-body">
                <div className="chat-bubble">
                    <div className={'chat-content ' + (isThereFile ? '' : isImage ? 'img-content' : '')}>
                        {isDoctor ? '' :
                            <div>
                                <span className="task-chat-user">{messageName}</span>
                                <ChatLine date={''} />
                            </div>
                        }
                        {isThereFile ?
                            <p>{message.Message}</p> :
                            (isImage) ?
                                <img alt="" src={fileUrl} onClick={imageMessageHandler} data-bs-toggle='modal' data-bs-target='#share_files' /> :
                                <a target="_blank" href={fileUrl}>
                                    {message.Message}
                                    {isPDF ? <i className="ml-2 fa fa-file-pdf-o" /> : <i className="ml-2 fa fa-paperclip" />}
                                </a>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat