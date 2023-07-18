import {createSlice} from "@reduxjs/toolkit";

export const postSlice=createSlice({
    name:'post',
    initialState:{
        Posts:[],
        myPosts:[],
        totalPost:"",
        SinglePost:[],
        desc:"",
        image:""
    },
    reducers:{
        SetTimelinePosts:(state,action)=>{
            state.Posts=action.payload
        },
        SetMyPosts:(state,action)=>{
            state.myPosts=action.payload
        },
        SetMyTotalPosts:(state,action)=>{
            state.totalPost=action.payload
        },
        SetSinglePost:(state,action)=>{
            state.SinglePost=action.payload
        },
        SetPostDesc:(state,action)=>{
            state.desc=action.payload
        },
        SetPostImage:(state,action)=>{
            state.image=action.payload
        },
    }
})
export  const {SetTimelinePosts, SetMyPosts, SetMyTotalPosts, SetSinglePost, SetPostDesc, SetPostImage}=postSlice.actions;
export const selectTimelinePosts = (state) => state.post.Posts;
export const selectMyPosts = (state) => state.post.myPosts;
export const selectMyTotalPosts = (state) => state.post.totalPost;
export const selectSinglePost = (state) => state.post.SinglePost;
export const selectPostDesc = (state) => state.post.desc;
export const selectPostImage = (state) => state.post.image;

export const postSliceReducer = postSlice.reducer;
