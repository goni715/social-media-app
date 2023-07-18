import React, {useEffect, useRef, useState} from 'react';
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../FlexBetween/FlexBetween.jsx";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import WidgetWrapper from "../WidgetWrapper.jsx";
import {
    GetPostRequest,
    UpdatePostRequest
} from "../../ApiServices/PostApiRequest.js";
import {useDispatch, useSelector} from "react-redux";
import {selectPostDesc, selectPostImage, SetPostImage} from "../../redux/state-slice/postSlice.js";
import {UpdatePostWithImageRequest} from "../../ApiServices/UploadApiRequest.js";
import {useNavigate} from "react-router-dom";
import {ErrorToast} from "../../helper/ValidationHelper.js";
import {selectPostUpdateLoading} from "../../redux/state-slice/settingsSlice.js";

const EditPostBox = ({postId}) => {
    let descRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [image, setImage] = useState("")
    let loading = useSelector(selectPostUpdateLoading);
    const { palette } = useTheme();
    const medium = palette.neutral.medium;


    useEffect(()=>{
        (async () => {
            await GetPostRequest(postId);
        })();
    },[postId])

    const description = useSelector(selectPostDesc);
    const PostImage = useSelector(selectPostImage);




    const handlePost = async () => {
        setBtnDisabled(true);

        if(PostImage){
            let postBody={desc: descRef.value}
            let result = await UpdatePostRequest(postBody, postId);
            if(result===true){
                setBtnDisabled(false)
                navigate(-1);
            }
        }
        else if(image) {
            let formData = new FormData();
            formData.append("image", image);
            formData.append("desc", descRef.value);
            let result = await UpdatePostWithImageRequest(formData, postId);
            if(result===true){
                setBtnDisabled(false)
                navigate(-1);
            }
        }
        else if(!PostImage && descRef.value){
            ErrorToast("PostImage Nei")
            let postBody={desc: descRef.value, image: ""}
            let result = await UpdatePostRequest(postBody, postId);
            if(result===true){
                setBtnDisabled(false)
                navigate(-1);
            }
        }
        else {
            if(descRef.value){
                ErrorToast("Only Text")
                let postBody={desc: descRef.value}
                let result = await UpdatePostRequest(postBody, postId);
                if(result===true){
                    setBtnDisabled(false)
                    navigate(-1);
                }
            }else{
                ErrorToast("Write Something");
            }
        }

    }








    return (
        <>
            <WidgetWrapper>
                <div className="pb-5">
                    <textarea ref={(input)=>descRef=input} key={Date.now()} rows={3} placeholder="What's on your mind..." defaultValue={description} className="form-control animated fadeInUp"/>
                    <div className="d-flex gap-5 mt-2">
                        {
                            PostImage ? (
                                <div className="d-flex position-relative">
                                    <img
                                        width="150px"
                                        height="150px"
                                        alt="post"
                                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                                        src={PostImage}
                                    />
                                    <button onClick={()=>dispatch(SetPostImage(""))} className="btn btn-close position-absolute button-close"></button>
                                </div>

                        ) : (
                                <Box
                                    border={`1px solid ${medium}`}
                                    borderRadius="5px"
                                    mt="1rem"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                            setImage(acceptedFiles[0]);
                                        }}

                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <FlexBetween>
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed ${palette.primary.main}`}
                                                    p="1rem"
                                                    width="100%"
                                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!image ? (
                                                        <p>Upload Image</p>
                                                    ) : (
                                                        <FlexBetween>
                                                            <Typography>{image.name}</Typography>
                                                            <EditOutlined />
                                                        </FlexBetween>
                                                    )}
                                                </Box>
                                                {image && (
                                                    <IconButton
                                                        onClick={() =>{
                                                            setImage(null);
                                                            //setBtnDisabled(true)
                                                        }}
                                                        sx={{ width: "15%" }}
                                                    >
                                                        <DeleteOutlined />
                                                    </IconButton>
                                                )}
                                            </FlexBetween>
                                        )}
                                    </Dropzone>
                                </Box>
                            )

                        }


                    </div>

                    <div className="d-flex float-end gap-2 mt-2">
                        <button onClick={handlePost} className="btn btn-info" disabled={btnDisabled}>
                            {loading ? "Uploading" : "Update"}
                        </button>
                        <button onClick={()=>navigate(-1)} className="btn btn-danger">Cancel</button>
                    </div>
                </div>
            </WidgetWrapper>

        </>
    );
};

export default EditPostBox;