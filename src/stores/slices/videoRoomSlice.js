import { createSlice } from "@reduxjs/toolkit";
import PrepareVideoCall from "../../model/PrepareVideoCall.js"

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
        GUID: '7939bcb4-2a22-4833-af7c-6faf3381a613#',
        callProperty: new PrepareVideoCall(),
    },
    reducers: {
        setRoomProperty: (state, action) => {
            state.roomProperty.appId = action.payload.appId;
            state.roomProperty.channel = action.payload.channel;
            state.roomProperty.token = action.payload.token;
            state.roomProperty.uid = action.payload.uid;
        },
        setCallProperty: (state, action) => {
            const response = action.payload;
            if (response !== undefined) {
                state.callProperty = new PrepareVideoCall(response);
            } else {
                console.log('setTestData', 'Undefined');
            }
        },
    }
})
export const { setRoomProperty, setCallProperty } = videoRoomSlice.actions;

export default videoRoomSlice.reducer