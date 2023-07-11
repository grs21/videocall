import { configureStore } from "@reduxjs/toolkit";
import videoRoomSlice from "./slices/videoRoomSlice";
import messagesSlice from "./slices/messagesSlice";
import fileSlice from "./slices/fileSlice";

export default configureStore({
    reducer: {
        videoRoomProperty: videoRoomSlice,
        messages: messagesSlice,
        files: fileSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})