import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {

        initializeMessages : (state,action) =>{
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
            console.log(state.messages,'eeee');
        }
    }
});

export const { addMessage, initializeMessages  } = messagesSlice.actions

export default messagesSlice.reducer;
