import {createSlice} from "@reduxjs/toolkit";

export const followSlice=createSlice({
    name:'follow',
    initialState:{
        followers:[],
        following:[],
    },
    reducers:{
        SetFollowers:(state,action)=>{
            state.followers=action.payload
        },
        SetFollowing:(state,action)=>{
            state.following=action.payload
        },
    }
})
export  const {SetFollowers, SetFollowing}=followSlice.actions;
export const selectFollowers = (state) => state.follow.followers;
export const selectFollowing = (state) => state.follow.following;
export const followSliceReducer = followSlice.reducer;
