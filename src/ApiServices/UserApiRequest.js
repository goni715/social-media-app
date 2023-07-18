import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import store from "../redux/store/store";
import {getToken, setToken, setUserDetails} from "../helper/SessionHelper";
import {HideLoader, HideLoading, ShowLoader, ShowLoading} from "../redux/state-slice/settingsSlice";
import {
    SetCoverPicture,
    SetEmail,
    SetFirstName,
    SetLastName, SetLocation,
    SetMyFollowers,
    SetMyFollowing, SetOccupation, SetProfilePicture, SetUsers
} from "../redux/state-slice/profileSlice.js";
const BaseURL = "http://localhost:5000/api/auth";
const BaseURL2 = "http://localhost:5000/api/user";

const AxiosHeader={headers:{"token":getToken()}}





export async function RegisterRequest(Email,FirstName,LastName,Location, Occuption,Password){

    try{
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/Registration";
        let PostBody={
            email:Email,
            firstName:FirstName,
            lastName:LastName,
            location: Location,
            occupation: Occuption,
            password:Password,
            profilePicture: "https://res.cloudinary.com/dwok2hmb7/image/upload/v1689256535/Social-Media/uoh1crdmfvcs59ztzxpq.png"
        }
        let res =await axios.post(URL,PostBody)
        store.dispatch(HideLoader())
        if(res.status === 200) {
            if(res.data['status'] === "success"){
                SuccessToast("Registration Success");
                return true;
            }
            else if(res.data['status'] === "fail"){
                SuccessToast("Email Already Exist");
                return false;
            }
            else{
                SuccessToast("Request Fail. try again");
                return false;
            }
        }
    }
    catch(error){
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong");
        return false;
    }
}






export async function LoginRequest(email,password){

    try {
        //debugger;
        store.dispatch(ShowLoader())
        //debugger;
        let URL=BaseURL+"/Login";
        //debugger;
        let PostBody={"email":email,"password":password}
        //debugger;
        let res =await axios.post(URL,PostBody);
        store.dispatch(HideLoader())
        if(res.status===200){

            let MyToken = res.data['token'];
            let user = res.data['data'][0]; //This is Object
            setToken(MyToken);
            let userDetails = {
                email: user['email'],
                firstName: user['firstName'],
                lastName: user['lastName'],
                picture: user['profilePicture'],
                id:user['_id']
            }

            setUserDetails(userDetails);
            SuccessToast("Login Success");
            setTimeout(()=>{
                window.location.href="/home";
            },500)
            return true;
        }
    }
    catch (e) {

        if(e['message'] === "Request failed with status code 402"){
            ErrorToast("Could not Find this Email!");
        }
        else if(e['message'] === "Request failed with status code 403"){
            ErrorToast("Wrong Password");
        }
        else{
            ErrorToast("Something Went Wrong");
        }
        return false;
    }
}




export async function GetUserRequest(ObjectID){
    try {
        store.dispatch(ShowLoader())
        let URL=BaseURL2+"/get-user/"+ObjectID;
        let res=await axios.get(URL,AxiosHeader);
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['message'] === "success"){
                store.dispatch(SetEmail(res.data['data'][0]['email']));
                store.dispatch(SetFirstName(res.data['data'][0]['firstName']));
                store.dispatch(SetLastName(res.data['data'][0]['lastName']));
                store.dispatch(SetProfilePicture(res.data['data'][0]['profilePicture']));
                store.dispatch(SetLocation(res.data['data'][0]['location']));
                store.dispatch(SetOccupation(res.data['data'][0]['occupation']));
                //store.dispatch(SetProfilePicture(res.data['data'][0]['profilePicture']));
                //store.dispatch(SetCoverPicture(res.data['data'][0]['coverPicture']));
            }
            else{
                ErrorToast("Request Fail, Try Again");
            }
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        if(e['message'] === "Request failed with status code 401"){
            localStorage.clear();
            setTimeout(()=>{
                window.location.href="/login";
            },1000)
        }
    }
}


//CustomerList
export async function GetAllUsersRequest() {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/get-all-users";
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetUsers(res.data['data']))
            } else {
                store.dispatch(SetUsers([]))
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}




export async function EditProfilePicRequest(ProfilePicture){
    try {
        //store.dispatch(ShowLoader())
       // store.dispatch(ShowLoader())
        let URL=BaseURL+"/update-user";
        let PostBody={profilePicture: ProfilePicture};
        let res=await axios.put(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoading())

        if(res.status===200){
            if(res.data['message'] === "success"){
                SuccessToast("Profile Picture Upload Success")
                return true;
            }
            else{
                ErrorToast("Request Fail, Try Again")
                return  false;
            }
        }
    }
    catch (e){
        store.dispatch(HideLoading())
        ErrorToast("Something Went Wrong")
        if(e['message'] === "Request failed with status code 401"){
            localStorage.clear();
            setTimeout(()=>{
                window.location.href="/login";
            },1000)
        }
        return false;
    }

}




export async function EditCoverPicRequest(CoverPicture){
    try {
        //store.dispatch(ShowLoader())
        // store.dispatch(ShowLoader())
        let URL=BaseURL+"/update-user";
        let PostBody={coverPicture: CoverPicture};
        let res=await axios.put(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoading())

        if(res.status===200){
            if(res.data['message'] === "success"){
                SuccessToast("Cover Picture Upload Success")
                return true;
            }
            else{
                ErrorToast("Request Fail, Try Again")
                return  false;
            }
        }
    }
    catch (e){
        store.dispatch(HideLoading())
        ErrorToast("Something Went Wrong")
        if(e['message'] === "Request failed with status code 401"){
            localStorage.clear();
            setTimeout(()=>{
                window.location.href="/login";
            },1000)
        }
        return false;
    }

}




export async function ProfileUpdateRequest(Email,FirstName,LastName,Mobile){
    try {
        store.dispatch(ShowLoader())
        store.dispatch(ShowLoader())
        let URL=BaseURL+"/UpdateUser";
        let PostBody={email:Email,firstName:FirstName,lastName:LastName,mobile:Mobile};
        let UserDetails={email:Email,firstName:FirstName,lastName:LastName,mobile:Mobile};
        let res=await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())

        if(res.status===200){
            if(res.data['status'] === "success"){
                SuccessToast("Profile Update Success")
                setUserDetails(UserDetails);
                return true;
            }
            else{
                ErrorToast("Something Went Wrong")
                return  false;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        if(e['message'] === "Request failed with status code 401"){
            localStorage.clear();
            setTimeout(()=>{
                window.location.href="/login";
            },1000)
        }
        return false;
    }

}






