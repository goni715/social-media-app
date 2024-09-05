import {useState} from 'react';
import { PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {useNavigate} from "react-router-dom";
import FlexBetween from "../components/FlexBetween/FlexBetween";
import UserImage from "./UserImage";
import {getUserDetails} from "../helper/SessionHelper.js";
import {UnfriendRequest} from "../ApiServices/FriendApiRequest.js";

const Friend = ({ friendId, name, subtitle, userPicturePath, userId }) => {
    const navigate = useNavigate();

    const { palette } = useTheme();
    const [isFriend, setIsFriend] = useState(true);
    const primaryLight = palette.primary.light;

    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const currentUserId = getUserDetails()['id'];


    const Unfriend = async (friendID) => {
        //SuccessToast(friendID);
        setIsFriend((prev) => !prev);
        await UnfriendRequest(friendID);
    }

    return (
        <>
            {
               isFriend && (
                    <FlexBetween>
                        <FlexBetween gap="1rem">
                            <UserImage image={userPicturePath} size="55px" />
                            <Box
                                onClick={() => {
                                    navigate("/profile/"+friendId);
                                    //navigate(0);
                                }}
                            >
                                <Typography
                                    color={main}
                                    variant="h5"
                                    fontWeight="500"
                                    sx={{
                                        "&:hover": {
                                            color: palette.primary.light,
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    {name}
                                </Typography>
                                <Typography color={medium} fontSize="0.75rem">
                                    {subtitle}
                                </Typography>
                            </Box>
                        </FlexBetween>

                        {
                            userId === currentUserId && (
                                <IconButton
                                    sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                                >
                                    <PersonRemoveOutlined onClick={()=>Unfriend(friendId)} sx={{ color: primaryDark }} />
                                </IconButton>
                            )
                        }

                    </FlexBetween>
                )
            }

        </>
    );
};

export default Friend;