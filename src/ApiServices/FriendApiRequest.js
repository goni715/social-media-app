
import store from "../redux/store/store.js";
import {
    HideLoader,
    HideLoading,
    ShowLoader,
    ShowLoading,
} from "../redux/state-slice/settingsSlice.js";
import axios from "axios";
import {SetTimelinePosts} from "../redux/state-slice/postSlice.js";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper.js";
import {getToken} from "../helper/SessionHelper.js";
import {SetFriendRequests, SetFriends, SetTotalFriendRequests} from "../redux/state-slice/friendSlice.js";
const BaseURL = "http://localhost:5000/api/user";
const AxiosHeader={headers:{"token":getToken()}}




export async function GetFriends(userId) {

    try {
        store.dispatch(ShowLoading())
        let URL = BaseURL+"/get-friends/"+userId;

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoading())

        if (res.status === 200 && res.data['message'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetFriends(res.data['data'][0]['Friends']));
            } else {
                store.dispatch(SetFriends([]))
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




export async function GetFriendRequests() {

    try {
        store.dispatch(ShowLoading())
        let URL = BaseURL+"/get-friend-requests";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoading())

        if (res.status === 200 && res.data['message'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetFriendRequests(res.data['data'][0]['FriendRequests']));
                store.dispatch(SetTotalFriendRequests(res.data['data'][0]['FriendRequests'].length));
            } else {
                store.dispatch(SetFriendRequests([]))
                store.dispatch(SetTotalFriendRequests(""))
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




//Add Cancel Friend Request
export async function AddCancelFriendRequest(FriendID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/add-cancel-friend-request";
        let PostBody = {friendID: FriendID}
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res.data['message'] === "success"){
                //SuccessToast(res.data['result']);
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




//Unfriend Request
export async function UnfriendRequest(FriendID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/unfriend-user";
        let PostBody = {friendID: FriendID}
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res.data['message'] === "success"){
                 //SuccessToast("Unfriend Success");
                //SuccessToast(res.data['result']);
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




//Confirm Friend Request
export async function ConfirmFriendRequest(FriendID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/confirm-friend-request";
        let PostBody = {friendID: FriendID}
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res.data['message'] === "success"){
                //SuccessToast(res.data['result']);
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



//Delete Friend Request
export async function DeleteFriendRequest(FriendID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/delete-friend-request";
        let PostBody = {friendID: FriendID}
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res.data['message'] === "success"){
                //SuccessToast(res.data['result']);
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

