import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {

        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
});

export const {addMessage} = messagesSlice.actions

export default messagesSlice.reducer;
