import {createSlice} from "@reduxjs/toolkit";

export const modalSlice=createSlice({
    name:'modal',
    initialState:{
        ProfileModalShow:false,
        ShareModalShow:false,
        ProfilePicModalShow:false,
        CoverPicModalShow:false,
        CommentID:"commentId",
        PostID:"postId",
    },
    reducers:{
        SetProfileModalShow:(state,action)=>{
            state.ProfileModalShow=action.payload
        },
        SetShareModalShow:(state,action)=>{
            state.ShareModalShow=action.payload
        },
        SetProfilePicModalShow:(state,action)=>{
            state.ProfilePicModalShow=action.payload
        },
        SetCoverPicModalShow:(state,action)=>{
            state.CoverPicModalShow=action.payload
        },
        SetCommentID:(state,action)=>{
            state.CommentID=action.payload
        },
        SetPostID:(state,action)=>{
            state.PostID=action.payload
        }
    }
})
export  const {SetProfileModalShow, SetShareModalShow, SetProfilePicModalShow, SetCoverPicModalShow, SetCommentID, SetPostID}=modalSlice.actions;

export const selectProfileModalShow = (state) => state.modal.ProfileModalShow;
export const selectShareModalShow = (state) => state.modal.ShareModalShow;
export const selectProfilePicModalShow = (state) => state.modal.ProfilePicModalShow;
export const selectCoverPicModalShow = (state) => state.modal.CoverPicModalShow;

export const selectCommentID = (state) => state.modal.CommentID;

export const selectPostID = (state) => state.modal.PostID;

export const modalSliceReducer = modalSlice.reducer;
