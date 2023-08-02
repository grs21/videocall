import { createSlice } from '@reduxjs/toolkit'

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
    }
});

export const { setSelectedFile, setIsDragging, setPreview } = fileSlice.actions;

export default fileSlice.reducer;
