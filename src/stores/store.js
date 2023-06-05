import { configureStore } from "@reduxjs/toolkit";
import videoRoomSlice from "./slices/videoRoomSlice";

export default configureStore({
    reducer: {
        videoRoomProperty:videoRoomSlice
    }
})