import { createSlice } from "@reduxjs/toolkit";
import PrepareVideoCall from "../../model/PrepareVideoCall.js"

export const videoRoomSlice = createSlice({
    name: 'videoRoom',
    initialState: {
        inCalling:false,
        isCallEnd:false,
        GUID: '7939bcb4-2a22-4833-af7c-6faf3381a613#',
        callPrepareVideo: new PrepareVideoCall(),
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
    }
})
export const { setCallPrepareVideo, setInCalling, setIsCallEnd} = videoRoomSlice.actions;

export default videoRoomSlice.reducer