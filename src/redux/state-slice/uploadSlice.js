import {createSlice} from "@reduxjs/toolkit";

export const uploadSlice=createSlice({
    name:'upload',
    initialState:{
        PostImage:[],
    },
    reducers:{
        SetPostImage:(state,action)=>{
            state.PostImage=action.payload
        },
    }
})
export  const {SetPostImage}=uploadSlice.actions;
export const selectPostImage = (state) => state.upload.PostImage;

export const uploadSliceReducer = uploadSlice.reducer;
