import { createSlice } from "@reduxjs/toolkit";
import PrepareVideoCall from "../../modal/PrepareVideoCall.js"

const prepareVideoCallInstance = new PrepareVideoCall();
export const videoRoomSlice = createSlice({
    name: 'videoRoom',
    initialState: {
        roomProperty: {
            appId: '',
            channel: '',
            token: '',
            uid: 0,
        },
        GUID:'7939bcb4-2a22-4833-af7c-6faf3381a613#',
        testData : prepareVideoCallInstance,
    },
    reducers: {
        createSlice: (state, action) => {
            state.roomProperty.appId = action.payload.appId;
            state.roomProperty.channel = action.payload.channel;
            state.roomProperty.token = action.payload.token;
            state.roomProperty.uid = action.payload.uid;
        },
        setTestData:(state, action) => {
            prepareVideoCallInstance.setResponse(action.payload)
        },
    }
})
export const { setRoomProperty,setTestData } = videoRoomSlice.actions;

export default videoRoomSlice.reducer