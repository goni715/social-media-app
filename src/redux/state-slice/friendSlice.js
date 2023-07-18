import {createSlice} from "@reduxjs/toolkit";

export const friendSlice=createSlice({
    name:'friend',
    initialState:{
        friends:[],
        friendRequests:[],
        totalFriendRequests:""
    },
    reducers:{
        SetFriends:(state,action)=>{
            state.friends=action.payload
        },
        SetFriendRequests:(state,action)=>{
            state.friendRequests=action.payload
        },
        SetTotalFriendRequests:(state,action)=>{
            state.totalFriendRequests=action.payload
        },
    }
})
export  const {SetFriends, SetFriendRequests, SetTotalFriendRequests}=friendSlice.actions;
export const selectFriends = (state) => state.friend.friends;
export const selectFriendRequests = (state) => state.friend.friendRequests;
export const selectTotalFriendRequests = (state) => state.friend.totalFriendRequests;

export const friendSliceReducer = friendSlice.reducer;
