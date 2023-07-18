
import store from "../redux/store/store.js";
import {
    HideLoader,
    HidePostLoading,HideUploadLoading,
    ShowLoader,
    ShowPostLoading, ShowUploadLoading
} from "../redux/state-slice/settingsSlice.js";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper.js";
import {getToken} from "../helper/SessionHelper.js";
import {
    SetPostDesc, SetPostImage,
    SetSinglePost,
    SetTimelinePosts
} from "../redux/state-slice/postSlice.js";
const BaseURL = "http://localhost:5000/api/post";
const AxiosHeader={headers:{"token":getToken()}}




//Create Enquiry
export async function CreatePostRequest(Description, Image){

    try{
        store.dispatch(ShowUploadLoading())
        let URL = BaseURL+"/create-post";
        let PostBody={
            desc: Description,
            image: Image
        }
        let res =await axios.post(URL,PostBody, AxiosHeader)
        store.dispatch(HideUploadLoading())
        if(res.status === 200) {
            if(res.data['message'] === "success"){
                //SuccessToast("MyPost Upload Success")
                return true;
            }
            else{
                ErrorToast("Request Fail, Try Again");
                return false;
            }
        }
    }
    catch(e){
        store.dispatch(HideUploadLoading())
        //ErrorToast("Something Went Wrong");
        ErrorToast(2)
        if(e['message'] === "Request failed with status code 401"){
            localStorage.clear();
            setTimeout(()=>{
                window.location.href="/";
            },1000)
        }
        return false;
    }
}

//Create Enquiry
export async function UpdatePostRequest(PostBody, ObjectID){

    try{
       // store.dispatch(ShowUploadLoading())
        let URL = BaseURL+"/update-post/"+ObjectID;
        let res =await axios.put(URL,PostBody, AxiosHeader)
        store.dispatch(HideUploadLoading())
        if(res.status === 200) {
            if(res.data['message'] === "success"){
                //SuccessToast("Update Success")
                return true;
            }
            else{
                ErrorToast("Request Fail, Try Again");
                return false;
            }
        }
    }
    catch(e){
        store.dispatch(HideUploadLoading())
        //ErrorToast("Something Went Wrong");
        ErrorToast(2)
        if(e['message'] === "Request failed with status code 401"){
            localStorage.clear();
            setTimeout(()=>{
                window.location.href="/";
            },1000)
        }
        return false;
    }
}




//Get Timeline MyPosts
export async function GetTimelinePostsRequest() {
    try {
        store.dispatch(ShowPostLoading())
        let URL = BaseURL+"/get-timeline-posts";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HidePostLoading())

        if (res.status === 200 && res.data['message'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetTimelinePosts(res.data['data']))
            } else {
                store.dispatch(SetTimelinePosts([]))
            }
        } else {
            ErrorToast("Request Fail, Try Again")
            ErrorToast("Timeline Post Error")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HidePostLoading())
        ErrorToast("Timeline Post Error")
    }
}




//Get User MyPosts
export async function GetUserPostsRequest(ObjectID) {
    try {
        store.dispatch(ShowPostLoading())
        let URL = BaseURL+"/get-user-posts/"+ObjectID;

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HidePostLoading())

        if (res.status === 200 && res.data['message'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetTimelinePosts(res.data['data']))
            } else {
                store.dispatch(SetTimelinePosts([]))
            }
        } else {
            ErrorToast("Something Went Wrong")
            ErrorToast("Get User Post")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HidePostLoading())
        ErrorToast("Get User Post")
    }
}



//Get User MyPosts
export async function GetPostRequest(ObjectID) {
    try {
        //store.dispatch(ShowPostLoading())
        let URL = BaseURL+"/get-post/"+ObjectID;

        const res = await axios.get(URL,AxiosHeader)
        //store.dispatch(HidePostLoading())

        if (res.status === 200 && res.data['message'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetSinglePost(res.data['data']));
                store.dispatch(SetPostDesc(res.data['data'][0]['desc']));
                store.dispatch(SetPostImage(res.data['data'][0]?.image));
            } else {
                store.dispatch(SetSinglePost([]))
                store.dispatch(SetPostDesc(""));
                store.dispatch(SetPostImage(""));
            }
        } else {
            ErrorToast("Request Fail, try again")
            ErrorToast("Get User Post")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HidePostLoading())
        ErrorToast("Get User Post")
    }
}







//Add Wishlist
export async function LikeDislikePostRequest(PostID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/like-dislike-post";
        let PostBody = {postID: PostID}
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








//Add Wishlist
export async function CommentPostRequest(Comment,PostID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/comment-post";
        let PostBody = {
            comment: Comment,
            postID: PostID
        }
        const res = await axios.put(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res.data['status'] === "success"){
                //SuccessToast(res.data['result']);
                //SuccessToast("Post SingleComment Success");
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




//Reply Post SingleComment
export async function ReplyPostRequest(Text,CommentID,PostID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/reply-post";
        let PostBody = {
            postID: PostID,
            commentID: CommentID,
            text: Text
        }
        const res = await axios.put(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res.data['status'] === "success"){
                //SuccessToast(res.data['result']);
                //SuccessToast("Post Reply Success");
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

