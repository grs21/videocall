import { configureStore } from "@reduxjs/toolkit";
import videoRoomSlice from "./slices/videoRoomSlice";
import messagesSlice from "./slices/messagesSlice";
import fileSlice from "./slices/fileSlice";
import imageShareSlice from "./slices/imageShareSlice";

export default configureStore({
    reducer: {
        videoRoomProperty: videoRoomSlice,
        messages: messagesSlice,
        files: fileSlice,
        modal: imageShareSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})