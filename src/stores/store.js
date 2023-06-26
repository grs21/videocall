import { configureStore } from "@reduxjs/toolkit";
import videoRoomSlice from "./slices/videoRoomSlice";
import messagesSlice from "./slices/messagesSlice";

export default configureStore({
    reducer: {
        videoRoomProperty: videoRoomSlice,
        messages: messagesSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})