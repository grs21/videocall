import { createSlice } from "@reduxjs/toolkit";

export const componentStateSlice = createSlice({
    name: 'videoRoom',
    initialState: {
        timerStarted: false,
        isAudio: false,
        isVideo: false,
        isPatientLeft: false,
        isPatientMute: false,
        isCalling: false,
    },
    reducers: {
        setTimerStarted: (state, action) => {
            state.timerStarted = action.payload;
        },
        setIsAudio: (state, action) => {
            state.isAudio = action.payload;
        },
        setIsVideo: (state, action) => {
            state.isVideo = action.payload;
        },
        setIsPatientLeft: (state, action) => {
            state.isPatientLeft = action.payload;
        },
        setIsPatientMute: (state, action) => {
            state.isPatientMute = action.payload;
        },
        setIsCalling: (state, action) => {
            state.isCalling = action.payload;
        }
    }
})
export const { setTimerStarted, setIsAudio, setIsVideo, setIsPatientLeft, setIsPatientMute, setIsCalling } = componentStateSlice.actions;

export default componentStateSlice.reducer