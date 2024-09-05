import {useState} from 'react';
import ReplyUserImage from "../ReplyUserImage.jsx";
import {Box, InputBase, Typography, useTheme} from "@mui/material";
import {getUserDetails} from "../../helper/SessionHelper.js";
import {ReplyPostRequest} from "../../ApiServices/PostApiRequest.js";

const SingleReply = ({item, setReplies, commentID, postID}) => {
    const [isReply, setIsReply] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replyBtnDisabled, setReplyBtnDisabled] = useState(true);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const picture = getUserDetails()['picture'];
    const FirstName = getUserDetails()['firstName'];
    const LastName = getUserDetails()['lastName'];


    const addReply2 = async () => {
        const myReply = {
            text:replyText,
            firstName: FirstName,
            lastName: LastName,
            profilePicture:picture
        };
       // let myArray = [myReply, ...replies];
        //setReplies(myArray);
        setIsReply(!isReply);
        setReplies((prev)=> [myReply, ...prev]);
        let result = await ReplyPostRequest(replyText,commentID,postID);
        if(result ===true){
           setReplyText("");
        }


    }

    return (
        <>
            <div className="d-flex gap-4 px-5 mx-5 mb-3">
                <div className="d-flex">
                    <ReplyUserImage image={item?.profilePicture} size="55px" />
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
                            {item?.text}
                        </Typography>
                    </Box>
                </div>
                <div className="d-flex align-items-center">
                    <button onClick={()=>{
                        setIsReply(!isReply);
                    }} className="btn btn-primary btn-sm reply-btn">Reply</button>
                </div>

            </div>

            {
                isReply && (
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
                        <button onClick={addReply2} className="btn btn-success btn-sm" disabled={replyBtnDisabled}>Submit</button>
                        <button
                            onClick={()=>{
                                setIsReply(!isReply);
                            }}
                            className="btn btn-sm btn-danger">
                            Cancel
                        </button>
                    </div>
                )
            }
        </>
    );
};

export default SingleReply;