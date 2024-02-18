import React, {useEffect, useState} from 'react';
import {GetTimelinePostsRequest} from "../../ApiServices/PostApiRequest.js";
import {GetFriendRequests} from "../../ApiServices/FriendApiRequest.js";
import {useSelector} from "react-redux";
import {selectLoading} from "../../redux/state-slice/settingsSlice.js";
import {getUserDetails} from "../../helper/SessionHelper.js";
import Request from "./Request.jsx";
import {selectFriendRequests} from "../../redux/state-slice/friendSlice.js";
import WidgetWrapper from "../WidgetWrapper.jsx";
import {Box, Typography, useTheme} from "@mui/material";
import {io} from "socket.io-client";

const Requests = () => {
    const [socket, setSocket] = useState(null);
    const { palette } = useTheme();

    useEffect(()=> {

        const socketInstance = io('https://social-media-api-goni.vercel.app/api');
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Connected to server');
        });

        socketInstance.on('receive-message-from-server', (data) => {
            console.log(`Received message: ${data}`);
        });

        socketInstance.on('success-request', (data) => {
            (async () => {
                await GetFriendRequests();
            })();
        });

        socketInstance.emit('send-message-from-client', "Message from clint");


    },[]);

    useEffect(()=>{
        (async () => {
            await GetFriendRequests();
        })();
    },[])


    let loading = useSelector(selectLoading);
    let currentUserId = getUserDetails()['id'];
    const Requests = useSelector(selectFriendRequests);

    return (
        <>

            <WidgetWrapper>
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    sx={{ mb: "1.5rem" }}
                >
                    Friend Requests
                </Typography>
                <Box display="flex" flexDirection="column" gap="1.5rem">
                    {
                        Requests?.map((user,i)=>{
                            return(
                                <Request key={i.toString()} item={user} />
                            )
                        })

                    }

            </Box>
            </WidgetWrapper>
        </>
    );
};

export default Requests;