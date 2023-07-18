import React, {useState} from 'react';
import {Modal} from "antd";
import {selectProfilePicModalShow, SetProfilePicModalShow} from "../../redux/state-slice/ModalSlice.js";
import {useSelector} from "react-redux";
import store from "../../redux/store/store.js";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../FlexBetween/FlexBetween.jsx";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import WidgetWrapper from "../WidgetWrapper.jsx";
import {useNavigate} from "react-router-dom";
import convertToBase64 from "../../helper/convertToBase64.js";
import {UploadProfilePictureRequest} from "../../ApiServices/UploadApiRequest.js";
import {selectLoading} from "../../redux/state-slice/settingsSlice.js";

const EditProfilePicModal = () => {

    const navigate = useNavigate();
    const profilePicModalShow = useSelector(selectProfilePicModalShow);
    const [image, setImage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [file, setFile] = useState("");
    const { palette } = useTheme();
    const loading = useSelector(selectLoading);
    const medium = palette.neutral.medium;

    const handleCancel = () => {
        store.dispatch(SetProfilePicModalShow(false));
        setImage("");
        setFile("");
    };


    const onUpload = async () => {
        setBtnDisabled(true);
        let formData = new FormData();
        formData.append("image", image);
        let result = await UploadProfilePictureRequest(formData);
        if(result === true){
            setBtnDisabled(false);
            store.dispatch(SetProfilePicModalShow(false));
            setImage("");
            setFile("");
            navigate('/home');
        }
    }




    return (
        <>

            {/*Modal Part*/}
            <Modal title="Edit Profile Picture " open={profilePicModalShow} onCancel={handleCancel}>

                <WidgetWrapper>
                    <div className="pb-5">
                        <div className="d-flex gap-5 mt-2">
                            {
                                image && (
                                    <div className="d-flex position-relative">
                                        <img
                                            width="150px"
                                            height="150px"
                                            alt="post"
                                            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                                            src={file}
                                        />
                                    </div>
                                )
                            }

                                    <Box
                                        border={`1px solid ${medium}`}
                                        borderRadius="5px"
                                        mt="1rem"
                                        p="1rem"
                                    >
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={ async (acceptedFiles) => {
                                                setImage(acceptedFiles[0]);
                                                const base64 = await convertToBase64(acceptedFiles[0]);
                                                setFile(base64);
                                                if(acceptedFiles[0]){
                                                    setBtnDisabled(false)
                                                }else{
                                                    setBtnDisabled(true);
                                                }
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
                                                                setBtnDisabled(true)
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

                        </div>

                        <div className="d-flex float-end gap-2 mt-2">
                            <button className="btn btn-info" onClick={onUpload} disabled={btnDisabled}>
                                {loading ? "Processing..." : "Update"}
                            </button>
                            <button
                                onClick={()=>{
                                    store.dispatch(SetProfilePicModalShow(false));
                                    setImage("");
                                    setFile("");
                                }}
                               className="btn btn-danger"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </WidgetWrapper>

            </Modal>
            {/*Modal Ended*/}

        </>
    );
};

export default EditProfilePicModal;