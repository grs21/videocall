import { createSlice } from "@reduxjs/toolkit";

export const videoRoomSlice = createSlice({
    name: 'videoRoom',
    initialState: {
        roomProperty: {
            appId: '',
            channel: '',
            token: '',
            uid: 0,
        }
    },
    reducers: {
        setRoomProperty: (state, action) => {
            state.roomProperty.appId = action.payload.appId;
            state.roomProperty.channel = action.payload.channel;
            state.roomProperty.token = action.payload.token;
            state.roomProperty.uid = action.payload.uid;
        },
    }
})
export const { setRoomProperty } = videoRoomSlice.actions

export default videoRoomSlice.reducer