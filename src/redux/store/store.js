import {configureStore} from "@reduxjs/toolkit";
import {modalSliceReducer} from "../state-slice/ModalSlice";
import {profileSliceReducer} from "../state-slice/profileSlice.js";
import {settingsSliceReducer} from "../state-slice/settingsSlice.js";
import {uploadSliceReducer} from "../state-slice/uploadSlice.js";
import {postSliceReducer} from "../state-slice/postSlice.js";
import {friendSliceReducer} from "../state-slice/friendSlice.js";
import {followSliceReducer} from "../state-slice/followSlice.js";
import {authSliceReducer} from "../state-slice/authSlice";


export default configureStore({

    reducer:{
        modal:modalSliceReducer,
        profile: profileSliceReducer,
        settings: settingsSliceReducer,
        upload: uploadSliceReducer,
        post: postSliceReducer,
        friend: friendSliceReducer,
        follow: followSliceReducer,
        auth: authSliceReducer
    }
})