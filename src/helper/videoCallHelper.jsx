import AgoraRTC from "agora-rtc-sdk-ng";
import { SOCKET_IO, UID } from '../constant/constant';
import { getDeviceInfo } from "./deviceReference";
import { videoCallRecord } from "../service/api/apiService";

export var joinVideoRoom = async (agoraEngineRef, channelParametersRef, callPrepareVideo, container) => {
    const appId = callPrepareVideo.getAppId(); // Pass your App ID here.
    const channel = callPrepareVideo.getChannel(); // Set the channel name.
    const token = callPrepareVideo.getToken();
    const uid = 1000; // Set the user ID.
    try {
        if (token !== '') {
            await agoraEngineRef.current.join(appId, channel, token, UID);
            channelParametersRef.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            channelParametersRef.current.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            const myVideoRow = document.querySelector('#my-video-container ');
            if (container !== null && container !== undefined && myVideoRow !== null && myVideoRow !== undefined) {
                myVideoRow.appendChild(container, myVideoRow.firstChild)
            }
            await agoraEngineRef.current.publish([
                channelParametersRef.current.localAudioTrack,
                channelParametersRef.current.localVideoTrack,
            ]);
            channelParametersRef.current.localVideoTrack.play(container);
            container.firstChild.firstChild.style = 'transform: rotateY(180deg); object-fit: cover; width: 100%; height: 100%; position: relative; left: 0px; top: 0px;';

        }
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

export const isBase64 = (data) => {
    /// a temporary function will be deleted upon base64 enhancement
    return data !== undefined ? data.includes('http') : ''
}

export const formatPhoneNumber = (phoneNumber) => {
    // Sayıları dışındaki tüm karakterleri kaldır
    phoneNumber = phoneNumber.replace(/\D/g, '');
    // 10 haneli numara formatına dönüştür
    const areaCode = phoneNumber.slice(0, 3);
    const firstPart = phoneNumber.slice(3, 6);
    const secondPart = phoneNumber.slice(6, 10);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
}

export const getFirstName = (fullName) => {
    if (!fullName) return "";
    const names = fullName.split(" ");
    return names[0];
}

export const getLastName = (fullName) => {
    if (!fullName) return "";
    const names = fullName.split(" ");
    return names.slice(1).join(" ");
}

export const startSetCallRecord = async (state, GUID) => {
    var batteryLevel = 100;
    state === undefined ? state = 'Connected' : state = state;
    try {
        let batteryPromise = await navigator.getBattery();
        batteryLevel = batteryPromise.level * 100;
    }
    catch (error) {
        console.error(error);
        console.log(error.message);
        batteryLevel = 200;
    }
    var device = getDeviceInfo(window);
    videoCallRecord(state, UID, GUID, batteryLevel, device);
}