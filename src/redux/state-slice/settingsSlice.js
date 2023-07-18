import {createSlice} from "@reduxjs/toolkit";

export const settingsSlice=createSlice({

    name:'settings',
    initialState:{
        loader:"d-none",
        postLoading:false,
        UploadLoading:false,
        PostUpdateLoading:false,
    },
    reducers:{
        ShowLoader:(state)=>{
            state.loader=""
        },
        HideLoader:(state)=>{
            state.loader="d-none"
        },
        ShowLoading:(state)=>{
            state.loading=true
        },
        HideLoading:(state)=>{
            state.loading=false
        },
        ShowPostLoading:(state)=>{
            state.postLoading=true
        },
        HidePostLoading:(state)=>{
            state.postLoading=false
        },
        ShowPostUpdateLoading:(state)=>{
            state.PostUpdateLoading=true
        },
        HidePostUpdateLoading:(state)=>{
            state.PostUpdateLoading=false
        },
        ShowUploadLoading:(state)=>{
            state.UploadLoading=true
        },
        HideUploadLoading:(state)=>{
            state.UploadLoading=false
        }
    }

})

export  const {ShowLoader, HideLoader, ShowLoading,HideLoading,ShowPostLoading,HidePostLoading, ShowUploadLoading, HideUploadLoading, ShowPostUpdateLoading, HidePostUpdateLoading}=settingsSlice.actions;
export const selectLoader = (state) => state.settings.loader;
export const selectLoading = (state) => state.settings.loading;
export const selectPostLoading = (state) => state.settings.postLoading;
export const selectUploadLoading = (state) => state.settings.UploadLoading;
export const selectPostUpdateLoading = (state) => state.settings.PostUpdateLoading;


export const settingsSliceReducer = settingsSlice.reducer;