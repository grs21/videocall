import AgoraRTC from "agora-rtc-sdk-ng";

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
        console.log(container);
        console.log("publish success!");
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
            //window.location.reload();
        }
    } catch (error) {
        let errorMesage = error.code;
        // document.getElementById('videoContainer').innerHTML = `<div>${errorMesage}</div>`
        console.error(errorMesage);
    }
}

const removeVideoDiv = (elementId) => {
    console.log("Removing " + elementId + "Div");
    let div = document.getElementById(elementId);
    if (div) {
        div.remove();
    }
};