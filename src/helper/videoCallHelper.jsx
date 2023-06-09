import AgoraRTC from "agora-rtc-sdk-ng";
import { SOCKET_IO } from '../constant/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFile, setIsDragging } from '../stores/slices/fileSlice';

export var joinVideoRoom = async (agoraEngineRef, channelParametersRef, roomProperty, container) => {
    try {
        await agoraEngineRef.current.join(roomProperty.appId, roomProperty.channel, roomProperty.token, roomProperty.uid);
        channelParametersRef.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        channelParametersRef.current.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        const myVideoRow = document.querySelector('#my-video-container ul li');
        if (container !== null && container !== undefined && myVideoRow !== null && myVideoRow !== undefined) {
            myVideoRow.replaceChild(container, myVideoRow.firstChild)
        }
        await agoraEngineRef.current.publish([
            channelParametersRef.current.localAudioTrack,
            channelParametersRef.current.localVideoTrack,
        ]);
        channelParametersRef.current.localVideoTrack.play(container);
        container.firstChild.firstChild.style = 'transform: rotateY(180deg); object-fit: cover; width: 100%; height: 100%; position: relative; left: 0px; top: 0px;';
    } catch (error) {
        let errorMesage = error.code;
        console.error(errorMesage);
    }
}

export var leaveRoom = async (agoraEngineRef, channelParametersRef, remotePlayerContainer, localPlayerContainer) => {
    try {
        if (channelParametersRef.current.localAudioTrack !== null) {
            channelParametersRef.current.localAudioTrack.close();
            channelParametersRef.current.localVideoTrack.close();
            removeVideoDiv(remotePlayerContainer.id);
            removeVideoDiv(localPlayerContainer.id);
            await agoraEngineRef.current.leave();
        }
    } catch (error) {
        let errorMesage = error.code;
        console.error(errorMesage);
    }
}

const removeVideoDiv = (elementId) => {
    let div = document.getElementById(elementId);
    if (div) {
        div.remove();
    }
};

export const dateFormat = (date, options) => {
    if (date !== null && date !== undefined) {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleString('tr-TR', options);
        return formattedDate;
    }
}

export const chatScroll = () => {
    var chatList = document.getElementById('chat-list');
    if (chatList) {
        chatList.scrollTop = chatList.scrollHeight;
    }
}
export const CloseModal = (tagId) => {
    const modal = document.getElementById(tagId);
    const modalIsOpen = modal.classList.contains('show');
    const body = document.body;
    if (modalIsOpen) {
        /// modal cosed
        modal.classList.remove('show')
        modal.style = ''
        const modalBackDrop = document.getElementsByClassName('modal-backdrop fade show')[0];
        modalBackDrop.remove();
        body.classList.remove('modal-open');
        body.style = '';
    } else {
        modal.classList.add('show')
    }
}
export const sendMessage = (roomId, fromName, fromId, toId, fileUrl, toName, fileName) => {
    console.log('gönderrrrrr');
    const messageInput = document.getElementById('messageInput');
    if (messageInput !== null && messageInput !== undefined) {
        const message = fileUrl === '' ? messageInput.value : fileName;
        if (message !== '' || fileUrl !== '') {
            SOCKET_IO.emit('typing', { RoomId: roomId, username: fromName, isTyping: false, FromId: fromId });
            SOCKET_IO.emit('new_message', {
                RoomId: roomId,
                FromId: fromId,
                FromName: fromName,
                ToId: toId,
                ToName: toName,
                Message: message,
                FileUrl: fileUrl
            });
            messageInput.value = '';
        }
    }
}