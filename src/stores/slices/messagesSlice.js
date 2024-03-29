import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        newMessageCount: 0,
        // If the char bar is clicked, its value will be true
        notifCState: false,
        // if side bar opened value true
        sidebarState: true,
        messagesState: false,
    },
    reducers: {

        initializeMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
            state.newMessageCount++;
            console.log(state.newMessageCount);
        },
        setMessagesCount: (state, action) => {
            state.newMessageCount = action.payload;
        },
        setNotifCState: (state, action) => {
            state.notifCState = action.payload;
        },
        setSidebarState: (state, action) => {
            state.sidebarState = action.payload;
        },
        setMessagesState: (state, action) => {
            state.messagesState = action.payload;
        }
    }
});

export const { addMessage, initializeMessages, setMessagesCount, setNotifCState, setSidebarState, setMessagesState } = messagesSlice.actions

export default messagesSlice.reducer;
