import store from "../redux/store/store.js";
import {HideLoader, HideLoading, ShowLoader, ShowLoading} from "../redux/state-slice/settingsSlice.js";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper.js";
import {getToken} from "../helper/SessionHelper.js";
import {SetFollowers, SetFollowing} from "../redux/state-slice/followSlice.js";
import {BaseURL} from "../helper/config.js";
const AxiosHeader={headers:{"token":getToken()}}

export async function GetFollowersRequest() {

    try {
        store.dispatch(ShowLoading())
        let URL = BaseURL+"/user/get-followers";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoading())

        if (res.status === 200 && res.data['message'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetFollowers(res.data['data'][0]['Followers']));
            } else {
                store.dispatch(SetFollowers([]))
            }
        } else {
            ErrorToast("Request Fail, Try Again");
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoading())
    }
}





export async function GetFollowingRequest() {

    try {
        store.dispatch(ShowLoading())
        let URL = BaseURL+"/user/get-following";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoading())

        if (res.status === 200 && res.data['message'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetFollowing(res.data['data'][0]['Following']));
            } else {
                store.dispatch(SetFollowing([]))
            }
        } else {
            ErrorToast("Request Fail, Try Again");
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoading())
    }
}





export async function FollowRequest(FollowUserID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/user/follow-user";
        let PostBody = {followUserID: FollowUserID}
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res.data['message'] === "success"){
                SuccessToast(res.data['result']);
                return true;
            }
            else{
                ErrorToast("Request Fail, Try Again");
                return false;
            }
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        //alert(JSON.stringify(e));
        if(e['message'] === "Request failed with status code 401"){
            localStorage.clear();
            setTimeout(()=>{
                window.location.href="/";
            },1000)
        }
        return false;
    }
}

