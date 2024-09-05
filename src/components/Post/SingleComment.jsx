import {useState} from 'react';
import UserImage from "../UserImage.jsx";
import {Box, Button, InputBase, Typography, useTheme} from "@mui/material";
import {ReplyPostRequest} from "../../ApiServices/PostApiRequest.js";
import {getUserDetails} from "../../helper/SessionHelper.js";
import SingleReply from "./SingleReply.jsx";
import {
    SwitchRight,
} from "@mui/icons-material";

const SingleComment = ({item, postID}) => {

    const [isReplies, setIsReplies] = useState(false);
    const [isReplyBox, setIsReplyBox] = useState(false);
    const sortingReplies = [...item?.reply].reverse();
    const [replies,setReplies] = useState(sortingReplies);
    const [replyText, setReplyText] = useState("");
    const [replyBtnDisabled, setReplyBtnDisabled] = useState(true);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const picture = getUserDetails()['picture'];
    const FirstName = getUserDetails()['firstName'];
    const LastName = getUserDetails()['lastName'];



    const addReply = async (commentID) => {
        const myReply = {
            text:replyText,
            firstName: FirstName,
            lastName: LastName,
            profilePicture:picture
         };
        let myArray = [myReply, ...replies];
        setReplies(myArray);
        //setReplies((prev)=> [...prev, myReply]);
        if(!isReplies){
            setIsReplies(!isReplies);
        }
        setIsReplyBox(!isReplyBox);
        let result = await ReplyPostRequest(replyText,commentID,postID);
        setReplyText("");

    }





    return (
        <>
            <div className="d-flex flex-column">
                <div key={Date.now()} className="d-flex gap-4 px-3 mb-3">
                    <UserImage image={item?.profilePicture} size="55px" />
                    <Box
                    >
                        <Typography
                            color={main}
                            variant="h5"
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {item?.firstName}  {item?.lastName}
                        </Typography>
                        <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                            {item?.comment}
                        </Typography>
                    </Box>
                    <div className="d-flex align-items-center">
                        <button
                            key={Date.now()}
                            onClick={()=>{
                                setIsReplyBox(!isReplyBox);
                            }}
                            className="btn btn-primary btn-sm reply-btn">
                            Reply
                        </button>

                    </div>

                </div>

                {isReplyBox && (
                    <>
                        {/*Reply Box Started*/}
                        <div className="d-flex gap-2 px-5 mx-5 mb-3">
                            <InputBase
                                placeholder="Add a reply..."
                                onChange={(e) =>{
                                    setReplyText(e.target.value);
                                    if(e.target.value){
                                      setReplyBtnDisabled(false);
                                    }
                                    else{
                                      setReplyBtnDisabled(true);
                                    }
                                }}
                                value={replyText}
                                sx={{
                                    width: "55%",
                                    backgroundColor: palette.neutral.light,
                                    borderRadius: "0.5rem",
                                    padding: "0.4rem 0.7rem",
                                }}
                            />
                            <button onClick={()=>addReply(item?._id)} className="btn btn-success btn-sm" disabled={replyBtnDisabled}>Submit</button>
                            <button
                                onClick={()=>{
                                    setIsReplyBox(!isReplyBox);
                                }}
                                className="btn btn-sm btn-danger">
                                Cancel
                            </button>
                        </div>
                        {/*Reply Box Ended*/}
                    </>
                )
                }
                {/*Total Replies part*/}
                     <div className="d-flex gap-2 px-5 mx-5 mb-3">
                    <Button onClick={()=>{
                        setIsReplies(!isReplies);
                    }} variant="outlined" startIcon={<SwitchRight />} className="replies-btn" >
                        {replies?.length} Replies
                    </Button>
                </div>
                {/*Total Replies*/}


                {isReplies && (
                   <>
                        { replies?.map((element,index)=>{
                            return(
                                <>
                                   <SingleReply key={index.toString()} commentID={item?._id} postID={postID} item={element} setReplies={setReplies} />
                                </>
                            )
                        })
                        }

                    </>

                )
                }



            </div>

        </>
    );
};

export default SingleComment;