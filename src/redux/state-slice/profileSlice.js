import {createSlice} from "@reduxjs/toolkit";
export const profileSlice=createSlice({
    name:'profile',
    initialState:{
        users:[],
        email:"",
        firstName:"",
        lastName:"",
        followers:"",
        following: "",
        coverPicture: "",
        profilePicture: "",
        id:"",
        location: "",
        occupation: ""
    },
    reducers:{
        SetUsers:(state,action)=>{
            state.users=action.payload
        },
        SetEmail:(state,action)=>{
            state.email=action.payload
        },
        SetFirstName:(state,action)=>{
            state.firstName=action.payload
        },
        SetLastName:(state,action)=>{
            state.lastName=action.payload
        },
        SetMyFollowers:(state,action)=>{
            state.followers=action.payload
        },
        SetMyFollowing:(state,action)=>{
            state.following=action.payload
        },
        SetCoverPicture:(state,action)=>{
            state.coverPicture=action.payload
        },
        SetProfilePicture:(state,action)=>{
            state.profilePicture=action.payload
        },
        SetID:(state,action)=>{
            state.id=action.payload
        },
        SetLocation:(state,action)=>{
            state.location=action.payload
        },
        SetOccupation:(state,action)=>{
            state.occupation=action.payload
        }

    }
})
export  const {SetEmail, SetFirstName, SetLastName, SetMyFollowers, SetMyFollowing, SetProfilePicture, SetCoverPicture, SetUsers, SetID, SetLocation, SetOccupation}=profileSlice.actions;
export const selectEmail = (state) => state.profile.email;
export const selectFirstName = (state) => state.profile.firstName;
export const selectLastName = (state) => state.profile.lastName;
export const selectMyFollowers = (state) => state.profile.followers;
export const selectMyFollowing = (state) => state.profile.following;
export const selectProfilePicture = (state) => state.profile.profilePicture;
export const selectCoverPicture = (state) => state.profile.coverPicture;
export const selectID = (state) => state.profile.id;
export const selectUsers = (state) => state.profile.users;

export const selectLocation = (state) => state.profile.location;
export const selectOccupation = (state) => state.profile.occupation;


export const profileSliceReducer = profileSlice.reducer;
