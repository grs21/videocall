import React from 'react';
import { User } from '../assets/imagePath';
import ChatLine from './chatLine';
import { useDispatch, useSelector } from 'react-redux';
import { setShareImgURL } from '../stores/slices/imageShareSlice';

function Chat({ message }) {
    const { roomProperty, callProperty } = useSelector(state => state.videoRoomProperty);
    const { imageModalState, shareImgURL } = useSelector(state => state.modal);
    const dispatch = useDispatch();
    const doctorImg = callProperty.getDoctorPhoto();
    const patientImg = callProperty.getPatientPhoto();
    const doctorId = callProperty.getDoctorId();
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
                    <img alt="" src={isDoctor ? (doctorImg === null ? User : doctorImg) : (patientImg === null ? User : `data:image/png;base64,${patientImg}`)} />
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
                                <img alt="" src={fileUrl} onClick={imageMessageHandler} data-bs-toggle='modal' data-bs-target='#share_files'/> :
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


// data-bs-toggle='modal' data-bs-target='#share_files'

{/*
<div className="chat chat-left">
    <div className="chat-avatar">
        <Link to="/app/profile/employee-profile" className="avatar">
            <img alt="" src={Avatar_09} />
        </Link>
    </div>
    <div className="chat-body">
        <div className="chat-bubble">
            <div className="chat-content">
                <span className="task-chat-user">John Doe</span> <span className="chat-time">8:35 am</span>
                <p>I'm just looking around.</p>
                <p>Will you tell me something about yourself? </p>
            </div>
        </div>
    </div>
</div>    

<div className="chat chat-left">
    <div className="chat-avatar">
        <Link to="/app/profile/employee-profile" className="avatar">
            <img alt="" src={Avatar_16} />
        </Link>
    </div>
    <div className="chat-body">
        <div className="chat-bubble">
            <div className="chat-content">
                <span className="task-chat-user">Jeffery Lalor</span> <span className="file-attached">attached file <i className="fa fa-paperclip" /></span> <span className="chat-time">Yesterday at 9:16pm</span>
                <ul className="attach-list">
                    <li className="pdf-file"><i className="fa fa-file-pdf-o" /> <a href="#">Document_2016.pdf</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>



<div className="chat chat-left">
    <div className="chat-avatar">
        <Link to="/app/profile/employee-profile" className="avatar">
            <img alt="" src={Avatar_16} />
        </Link>
    </div>
    <div className="chat-body">
        <div className="chat-bubble">
            <div className="chat-content">
                <span className="task-chat-user">Jeffery Lalor</span> <span className="file-attached">attached file <i className="fa fa-paperclip" /></span> <span className="chat-time">Today at 12:42pm</span>
                <ul className="attach-list">
                    <li className="img-file">
                        <div className="attach-img-download"><a href="#">avatar-1.jpg</a></div>
                        <div className="task-attach-img"><img src={User} alt="" /></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div> */}