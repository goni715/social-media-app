import React, {useEffect} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import UserWidget from "../../widgets/UserWidget.jsx";
import MyPostWidget from "../../widgets/MyPostWidget.jsx";
import PostsWidget from "../../widgets/PostsWidget.jsx";
import AdvertWidget from "../../widgets/AdvertWidget.jsx";
import FriendListWidget from "../../widgets/FriendListWidget.jsx";
import {getUserDetails} from "../../helper/SessionHelper.js";
import EditPostBox from "./EditPostBox.jsx";
import {GetFriendRequests} from "../../ApiServices/FriendApiRequest.js";
import {GetPostRequest} from "../../ApiServices/PostApiRequest.js";
import {useSelector} from "react-redux";
import {selectSinglePost} from "../../redux/state-slice/postSlice.js";

const EditPost = ({id}) => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const picturePath = getUserDetails()['picture'];
    let currentUserId = getUserDetails()['id'];



    return (
        <>

            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={currentUserId} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <EditPostBox postId={id}/>
                </Box>

                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                    </Box>
                )
                }


            </Box>


        </>
    );
};

export default EditPost;