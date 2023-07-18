import {createSlice} from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'auth',
    initialState:{
       mode: "light",
       user: null,
       token: null,
       posts: []
    },
    reducers:{
        SetMode:(state,action)=>{
            state.mode= state.mode === "light" ? "dark" : "light";
        }
    }
})
export  const {SetMode}=authSlice.actions;
export const selectMode = (state) => state.auth.mode;
export const authSliceReducer = authSlice.reducer;
