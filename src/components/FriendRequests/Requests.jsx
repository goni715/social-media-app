import React, {useEffect} from 'react';
import {GetTimelinePostsRequest} from "../../ApiServices/PostApiRequest.js";
import {GetFriendRequests} from "../../ApiServices/FriendApiRequest.js";
import {useSelector} from "react-redux";
import {selectLoading} from "../../redux/state-slice/settingsSlice.js";
import {getUserDetails} from "../../helper/SessionHelper.js";
import Request from "./Request.jsx";
import {selectFriendRequests} from "../../redux/state-slice/friendSlice.js";
import WidgetWrapper from "../WidgetWrapper.jsx";
import {Box, Typography, useTheme} from "@mui/material";

const Requests = () => {

    const { palette } = useTheme();

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