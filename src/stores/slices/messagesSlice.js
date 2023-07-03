import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        newMessageCount : 0,
        notifCState: false,
    },
    reducers: {

        initializeMessages : (state,action) =>{
            state.messages = action.payload;
            
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
            state.newMessageCount++;
        },
        setMessagesCount:(state, action)=>{
            state.newMessageCount = action.payload;
        },
        setNotifCState: (state,action) =>{
            state.notifCState = action.payload;
        }
    }
});

export const { addMessage, initializeMessages, setMessagesCount, setNotifCState  } = messagesSlice.actions

export default messagesSlice.reducer;
