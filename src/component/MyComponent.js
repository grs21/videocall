import React, { useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const MyComponent = () => {
    const agoraEngineRef = useRef(null);
    const localPlayerContainerRef = useRef(null);
    const remotePlayerContainerRef = useRef(null);
    const channelParametersRef = useRef({
        localAudioTrack: null,
        localVideoTrack: null,
        remoteAudioTrack: null,
        remoteVideoTrack: null,
        remoteUid: null,
    });
    const options = {
        appId: "afadeb1ff63443ac93d5e953314a544f", // Pass your App ID here.
        channel: "test1", // Set the channel name.
        token: "007eJxTYHiRynHSwJlxznmNc7MXuvBdjNEvn1HXzsB1Xvopl8kdb1MFhsS0xJTUJMO0NDNjExPjxGRL4xTTVEtTY2NDk0RTE5O0+e0lKQ2BjAx9FwSYGBkgEMRnZShJLS4xZGAAANqLHdA=",
        uid: 0, // Set the user ID.
    };

    useEffect(() => {
        const startBasicCall = async () => {
            agoraEngineRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            const remotePlayerContainer = document.createElement("div");
            const localPlayerContainer = document.createElement("div");
            localPlayerContainer.id = options.uid;
            localPlayerContainer.textContent = "Local user " + options.uid;
            localPlayerContainer.style.width = "240px";
            localPlayerContainer.style.height = "280px";
            localPlayerContainer.style.padding = "15px 5px 5px 5px";
            localPlayerContainer.style.marginRight = "3em"

            remotePlayerContainer.style.width = "240px";
            remotePlayerContainer.style.height = "280px";
            remotePlayerContainer.style.padding = "15px 5px 5px 5px";

            agoraEngineRef.current.on("user-published", async (user, mediaType) => {
                await agoraEngineRef.current.subscribe(user, mediaType);

                if (mediaType === "video") {
                    channelParametersRef.current.remoteVideoTrack = user.videoTrack;
                    channelParametersRef.current.remoteAudioTrack = user.audioTrack;
                    channelParametersRef.current.remoteUid = user.uid.toString();
                    remotePlayerContainer.id = user.uid.toString();
                    channelParametersRef.current.remoteUid = user.uid.toString();
                    remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
                    document.getElementById('videoContainer').append(remotePlayerContainer);
                    channelParametersRef.current.remoteVideoTrack.play(remotePlayerContainer);
                }
                if (mediaType === "audio") {
                    channelParametersRef.current.remoteAudioTrack = user.audioTrack;
                    channelParametersRef.current.remoteAudioTrack.play();
                }
            });

           document.getElementById("join").onclick = async () => {
                await agoraEngineRef.current.join(options.appId, options.channel, options.token, options.uid);
                channelParametersRef.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                channelParametersRef.current.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
                document.getElementById('videoContainer').append(localPlayerContainer);
                await agoraEngineRef.current.publish([
                    channelParametersRef.current.localAudioTrack,
                    channelParametersRef.current.localVideoTrack,
                ]);
                channelParametersRef.current.localVideoTrack.play(localPlayerContainer);
                console.log("publish success!");
            };

            document.getElementById("leave").onclick = async () => {
                if (channelParametersRef.current.localAudioTrack !== null) {
                    channelParametersRef.current.localAudioTrack.close();
                    channelParametersRef.current.localVideoTrack.close();
                    removeVideoDiv(remotePlayerContainer.id);
                    removeVideoDiv(localPlayerContainer.id);
                    await agoraEngineRef.current.leave();
                    window.location.reload();
                }
            };

        };

        startBasicCall();
    }, []);

    const removeVideoDiv = (elementId) => {
        console.log("Removing " + elementId + "Div");
        let div = document.getElementById(elementId);
        if (div) {
            div.remove();
        }
    };

    return (
        <div>
            {/* onClick={() => joinButton()} */}
            <button id="join" >Join</button>
            <button id="leave">Leave</button>
            <div id="videoContainer" style={{display:"flex",alignItems:"center",justifyContent:"center"}}></div>
            <div ref={localPlayerContainerRef}></div>
            <div ref={remotePlayerContainerRef}></div>
        </div>
    );
};

export default MyComponent;