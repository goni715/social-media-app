import store from "../redux/store/store";
import {
    HideLoading, HidePostUpdateLoading,
    HideUploadLoading,
    ShowLoading, ShowPostUpdateLoading,
    ShowUploadLoading
} from "../redux/state-slice/settingsSlice";
import {ErrorToast} from "../helper/ValidationHelper";
import axios from "axios";
import {getToken, setUserDetails} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/config.js";
const AxiosHeader={headers:{"Content-Type": "multipart/form-data", "token":getToken()}}
//const AxiosHeader={headers:{"token":getToken()}}



//Upload Single Product Image
export async function UploadImageRequest(FormData) {
    try {
        store.dispatch(ShowUploadLoading())
        let URL = BaseURL+"/upload/upload-image";

        const res = await axios.post(URL, FormData)
        //store.dispatch(HideUploadLoading())
        if(res.status === 200) {
             //SuccessToast("Upload Success");
             return res.data['data']['img_url'];
        }
    }
    catch (e) {
        //alert(JSON.stringify(e))
        store.dispatch(HideUploadLoading())
        ErrorToast("Something Went Wrong")
        ErrorToast(1)
    }
}







//Upload Profile Picture
export async function UploadProfilePictureRequest(FormData) {
    try {
        store.dispatch(ShowLoading())
        let URL = BaseURL+"/upload/upload-profile-picture";
        alert(JSON.stringify(FormData))

        const res = await axios.post(URL,FormData,
            {
                headers:{
                    'Content-Type': "multipart/form-data",
                    token:getToken()
                }
            })
        store.dispatch(HideLoading())
        if(res.status === 200) {
            //SuccessToast("Picture upload Success");
            let user = res.data['data'][0]; //This is Object
            let userDetails = {
                email: user['email'],
                firstName: user['firstName'],
                lastName: user['lastName'],
                picture: user['profilePicture'],
                id:user['_id']
            }
            setUserDetails(userDetails);
            return true;
        }
    }
    catch (e) {
        //alert(JSON.stringify(e))
        store.dispatch(HideLoading())
        ErrorToast("Something Went Wrong")
        alert(JSON.stringify(e.response))
        ErrorToast(1)
    }
}



export async function CreatePostWithImageRequest(FormData) {
    try {
        store.dispatch(ShowUploadLoading())
        let URL = BaseURL+"/post/create-post-with-image";

        const res = await axios.post(URL,FormData, {headers:{"Content-Type": "multipart/form-data", "token":getToken()}})
        store.dispatch(HideUploadLoading())
        if(res.status === 200) {
            //SuccessToast("Post Upload Success");
            return true;
        }
    }
    catch (e) {
        //alert(JSON.stringify(e))
        store.dispatch(HideUploadLoading())
        ErrorToast("Something Went Wrong")
        alert(JSON.stringify(e))
        ErrorToast(1)
    }
}





export async function UpdatePostWithImageRequest(FormData, PostID) {
    try {
        store.dispatch(ShowPostUpdateLoading())
        let URL = BaseURL+"/post/update-post-with-image/"+PostID;

        const res = await axios.put(URL,FormData, AxiosHeader)
        store.dispatch(HidePostUpdateLoading())
        if(res.status === 200) {
            //SuccessToast("Post Update Success");
            return true;
        }
    }
    catch (e) {
        //alert(JSON.stringify(e))
        store.dispatch(HideUploadLoading())
        ErrorToast("Something Went Wrong")
        alert(JSON.stringify(e))
        ErrorToast(1)
    }
}