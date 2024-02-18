import React, {useEffect, useState} from 'react';
import profilePic from '../../assets/images/p2.jpeg'
import {getUserDetails} from "../../helper/SessionHelper.js";
import {SuccessToast} from "../../helper/ValidationHelper.js";
import {AddCancelFriendRequest, UnfriendRequest} from "../../ApiServices/FriendApiRequest.js";
import {useNavigate} from "react-router-dom";
import {io} from "socket.io-client";

const User = ({item}) => {
    const [socket, setSocket] = useState(null);

    useEffect(()=> {
        const socketInstance = io('http://localhost:5000');
        setSocket(socketInstance);
    },[]);


    let currentUserId = getUserDetails()['id'];
    const navigate =useNavigate();
    const [friendRequests, setFriendRequests] = useState(item.friendRequests.includes(currentUserId));
    const [alreadyFriend, setAlreadyFriend] = useState(item.friends.includes(currentUserId));


    const AddCancelFriend = async (friendID) => {
        setFriendRequests((prev) => !prev);
        await AddCancelFriendRequest(friendID);
        socket.emit('confirm-request', "confirm-request");
    }



    const Unfriend = async (friendID) => {
        setAlreadyFriend((prev) => !prev);
        await UnfriendRequest(friendID);
        socket.emit('confirm-request', "confirm-request");
    }



    const handleClick = (id) => {
      SuccessToast(id);
      navigate('/profile/'+id);
    }





    return (
        <>
            <div className="container m-0 m-auto">
                <div className="row">
                        <div className="follower mb-2">
                            <div onClick={()=>handleClick(item._id)} style={{cursor: "pointer"}}>
                                <img className="img-fluid followerImage" src={item.profilePicture ? item.profilePicture : profilePic} alt="follower"/>
                                <div className="name">
                                    <span>{item.firstName} {item.lastName}</span>
                                </div>
                            </div>
                            <div>

                                {
                                    alreadyFriend ? (
                                        <button onClick={()=>Unfriend(item._id)} className={ alreadyFriend ? "btn btn-primary" : "button fc-button" } >
                                            Friend
                                        </button>
                                    ) : (
                                        <button onClick={()=>AddCancelFriend(item._id)} className={ friendRequests ? "btn btn-secondary" : "button fc-button" } >
                                            {friendRequests ? "Cancel Request" : "Add Friend" }
                                        </button>
                                    )
                                }

                            </div>

                        </div>
                </div>
            </div>

        </>
    );
};

export default User;