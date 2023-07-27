import { createSlice } from "@reduxjs/toolkit";
import PrepareVideoCall from "../../model/PrepareVideoCall.js"

export const videoRoomSlice = createSlice({
    name: 'videoRoom',
    initialState: {
        inCalling:false,
        isCallEnd:false,
        GUID: '7939bcb4-2a22-4833-af7c-6faf3381a613#',
        callPrepareVideo: new PrepareVideoCall(),
        timerStarted:false,
        isAudio: false,
        isVideo:false,
        isPatientLeft: false,
    },
    reducers: {
        setInCalling: (state, action) =>{
            state.inCalling = action.payload;
        },
        setIsCallEnd: (state, action) =>{
            state.isCallEnd = action.payload;
        },
        setCallPrepareVideo: (state, action) => {
            const response = action.payload;
            if (response !== undefined) {
                state.callPrepareVideo = new PrepareVideoCall(response);
            } else {
                console.log('setTestData', 'Undefined');
            }
        },
        setTimerStarted: (state,action) =>{
            state.timerStarted = action.payload;
        },
        setIsAudio: (state, action) =>{
            state.isAudio = action.payload;
        },
        setIsVideo: (state, action) =>{
            state.isVideo = action.payload;
        },
        setIsPatientLeft: (state, action) =>{
            state.isPatientLeft = action.payload;
        },
    }
})
export const { setCallPrepareVideo, setInCalling, setIsCallEnd, setTimerStarted, setIsAudio, setIsVideo, setIsPatientLeft } = videoRoomSlice.actions;

export default videoRoomSlice.reducer