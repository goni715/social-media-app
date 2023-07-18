import React, {useState} from 'react';
import profilePic from '../../assets/images/p2.jpeg'
import {ConfirmFriendRequest, DeleteFriendRequest} from "../../ApiServices/FriendApiRequest.js";

const Request = ({item}) => {

     const [confirm, setConfirm] = useState(false)
     const [deleted, setDeleted] = useState(false)

    const Confirm = async (friendID) => {
         setConfirm((prev) => !prev);
         await ConfirmFriendRequest(friendID);
    }

    const Delete = async (friendID) => {
         setDeleted((prev) => !prev);
         await DeleteFriendRequest(friendID);
    }





    /*
     const Confirm = async (friendID) => {
        let result = await ConfirmFriendRequest(friendID);
        if(result === true){
           await GetFriendRequests();
        }
    }

    const Delete = async (friendID) => {
        let result = await DeleteFriendRequest(friendID);
        if(result === true){
            await GetFriendRequests();
        }
    }
     */






    return (
        <>
            <div className="follower">
                <div>
                    <img className="img-fluid followerImage" src={item.profilePicture ? item.profilePicture : profilePic} alt="follower"/>
                    <div className="name">
                        <span>{item.firstName} {item.lastName}</span>
                    </div>
                </div>
                <div>
                    {
                         confirm === deleted ? (
                            <>
                            <button onClick={()=>Confirm(item._id)} className="btn btn-success">Confirm</button>
                            <button onClick={()=>Delete(item._id)} className="btn btn-danger">Delete</button>
                           </>
                        ) : (
                            <>
                            </>
                        )
                    }
                    {
                        confirm && (
                            <button className="btn btn-primary">
                                You are now friends
                            </button>
                        )
                    }
                    {
                        deleted && (
                            <button className="btn btn-secondary">
                                Request Removed
                            </button>
                        )
                    }



                    {
                        /*
                         <button onClick={()=>Confirm(item._id)} className="button fc-button">Confirm</button>
                          < button onClick={()=>Delete(item._id)} className="button fc-button">Delete</button>
                         */
                    }




                </div>

            </div>
        </>
    );
};

export default Request;