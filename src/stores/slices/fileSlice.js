import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const fileSlice = createSlice({
    name: 'file',
    initialState: {
        selectedFile: null,
        isDragging: false,
        preview: null,
        shareImgURL: '',
    },
    reducers: {
        setSelectedFile: (state, action) => {
            state.selectedFile = action.payload;
        },
        setIsDragging: (state, action) => {
            state.isDragging = action.payload
        },
        setPreview: (state, action) => {
            state.preview = action.payload
        },
        setShareImgURL: (state, action) => {
            state.shareImgURL = action.payload
        }
    }
});

export const { setSelectedFile, setIsDragging, setPreview, setShareImgURL } = fileSlice.actions;

export default fileSlice.reducer;
