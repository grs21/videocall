import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const imageShareSlice = createSlice({
    name: 'file',
    initialState: {
        shareImgURL: [
            {
                src: 'https://source.unsplash.com/Z6SXt1v5tP8/768x512',
                alt: 'Mechanical keyboard with white, pastel pink, yellow and red keycaps.',
            },
        ],
    },
    reducers: {
        setShareImgURL: (state, action) => {
            state.shareImgURL[0]['src'] = action.payload;
        },
    }
});

export const { setImageModalState, setShareImgURL } = imageShareSlice.actions;

export default imageShareSlice.reducer;