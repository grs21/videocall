import { configureStore } from "@reduxjs/toolkit";
import videoRoomSlice from "./slices/videoRoomSlice";
import messagesSlice from "./slices/messagesSlice";
import fileSlice from "./slices/fileSlice";
import imageShareSlice from "./slices/imageShareSlice";
import componentState from "./slices/componentState";

export default configureStore({
    reducer: {
        videoRoomProperty: videoRoomSlice,
        messages: messagesSlice,
        files: fileSlice,
        modal: imageShareSlice,
        componentState: componentState,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})