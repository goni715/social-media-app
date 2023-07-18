import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import {selectPostLoading} from "../redux/state-slice/settingsSlice.js";
import {selectTimelinePosts} from "../redux/state-slice/postSlice.js";
import {GetTimelinePostsRequest, GetUserPostsRequest} from "../ApiServices/PostApiRequest.js";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import {Typography, useTheme} from "@mui/material";
import {useLocation} from "react-router-dom";

const PostsWidget = ({ userId, isProfile=false }) => {

    const { palette } = useTheme();
    const location = useLocation();

    useEffect(()=>{
        (async () => {
            if (isProfile) {
                await GetUserPostsRequest(userId);
            }else{
                await GetTimelinePostsRequest();
            }
        })();
    },[])

    let postLoading = useSelector(selectPostLoading);
    const PostsData = useSelector(selectTimelinePosts);



    return (
        <>
            {postLoading ?
                    "Fetching posts"
                    : (
                        PostsData.map((post,i)=>{
                            return (
                                <>
                                    <PostWidget key={i.toString()} item={post}/>
                                </>
                            )
                        })

                    )
            }
            {
                location.pathname === "/profile/"+userId && (
                    PostsData.length === 0 && (
                        <WidgetWrapper>
                            <Typography
                                color={palette.neutral.dark}
                                variant="h5"
                                fontWeight="500"
                                sx={{ mb: "1.5rem" }}
                            >
                                There is no post
                            </Typography>
                        </WidgetWrapper>
                    )
                )

            }
        </>
    )


}


export default PostsWidget;