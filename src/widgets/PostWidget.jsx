import React, {useEffect} from 'react';
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined, ImageOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import {Box, Button, Divider, IconButton, InputBase, Typography, useTheme} from "@mui/material";
import FlexBetween from "../components/FlexBetween/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState } from "react";
import {getUserDetails} from "../helper/SessionHelper.js";
import {CommentPostRequest, LikeDislikePostRequest, ReplyPostRequest} from "../ApiServices/PostApiRequest.js";
import {format} from "timeago.js";
import UserImage from "../components/UserImage.jsx";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import SingleComment from "../components/Post/SingleComment.jsx";
import NameHeading from "../components/NameHeading.jsx";

const PostWidget = ({item}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isComments, setIsComments] = useState(false);
    let currentUserId = getUserDetails()['id'];
    const sortingComments = [...item?.comments].reverse();
    const [comments, setComments] = useState(sortingComments);
    const [comment, setComment] = useState("");
    const [liked, setLiked] = useState(item?.likes.includes(currentUserId));
    const [likes, setLikes] = useState(item?.likes.length);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [replyBtnDisabled, setReplyBtnDisabled] = useState(true);
    const [text, setText] = useState("");
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;
    //let comments = [1,2,3,4,5];
    const picture = getUserDetails()['picture'];
    const FirstName = getUserDetails()['firstName'];
    const LastName = getUserDetails()['lastName'];


    const LikePost = async (postID) => {
        setLiked((prev) => !prev);
        liked? setLikes((prev)=> prev-1) : setLikes((prev)=> prev+1)
         await LikeDislikePostRequest(postID);
    }


    const addComment = async (postID) => {
        const myComment = {
            firstName:FirstName,
            lastName: LastName,
            profilePicture: picture,
            comment: comment,
            reply:[],
            createdAt:new Date().toISOString()
        };
        let myArray = [myComment, ...comments];
        //setComments((prev)=> [...prev, myComment]);
        setComments(myArray);
        let result = await CommentPostRequest(comment,postID);
        if(result ===true){
            setComment("");
           setBtnDisabled(true);
        }
    }




    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));




    return (
        <>
            <WidgetWrapper m="2rem 0">
                <NameHeading
                    postId={item?._id}
                    friendId={item?.userId}
                    name={item?.firstName+" "+item?.lastName}
                    subtitle={format(item?.createdAt)}
                    userPicturePath={item?.profilePicture}
                />
                <Typography color={main} sx={{ mt: "1rem"}} >
                        {item?.desc}
                </Typography>
                {item?.image && (
                    <img
                        width="100%"
                        height="auto"
                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={item?.image}
                    />
                )}
                <FlexBetween mt="0.25rem">
                    <FlexBetween gap="1rem">
                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={()=>LikePost(item?._id)}>
                                {liked ? (
                                    <FavoriteOutlined sx={{ color: primary }} />
                                ) : (
                                    <FavoriteBorderOutlined />
                                )}
                            </IconButton>
                            <Typography>
                                {likes}
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={() => setIsComments(!isComments)}>
                                <ChatBubbleOutlineOutlined />
                            </IconButton>
                            <Typography>{comments.length}</Typography>
                        </FlexBetween>
                    </FlexBetween>

                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                </FlexBetween>
                {isComments && (
                    <Box mt="0.5rem">


                        <Box
                            width="80%"
                            padding="1rem 2%"
                            gap="0.5rem"
                        >
                            <FlexBetween gap="0.2rem">
                                <UserImage image={picture} />
                                <InputBase
                                    placeholder="What a comment..."
                                    onChange={(e) =>{
                                        setComment(e.target.value);
                                        if(e.target.value){
                                            setBtnDisabled(false);
                                        }
                                        else{
                                            setBtnDisabled(true);
                                        }
                                    }}
                                    value={comment}
                                    sx={{
                                        width: "58%",
                                        backgroundColor: palette.neutral.light,
                                        borderRadius: "0.5rem",
                                        padding: "0.4rem 0.7rem",
                                    }}
                                />

                                <button  onClick={()=>addComment(item?._id)} className="btn btn-info" disabled={btnDisabled}>Post</button>

                            </FlexBetween>
                        </Box>

                        <Divider />

                        {
                            comments?.map((item2, i2) => (
                                <>
                                    <SingleComment key={i2.toString()} item={item2} postID={item?._id}/>
                                </>

                        ))}
                        <Divider />

                    </Box>
                )}
            </WidgetWrapper>


        </>
    );
};

export default PostWidget;