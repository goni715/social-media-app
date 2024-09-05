import {Create} from "@mui/icons-material";
import {Box, IconButton,Typography, useTheme} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween/FlexBetween";
import UserImage from "./UserImage";
import {getUserDetails} from "../helper/SessionHelper.js";

const NameHeading = ({postId, friendId, name, subtitle, userPicturePath }) => {
    const navigate = useNavigate();

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const currentUserId = getUserDetails()['id'];




    return (
        <>
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
                        friendId === currentUserId && (

                            <IconButton
                                onClick={()=>navigate("/edit-post/"+postId)}
                                sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                            >

                                <Create sx={{ color: primaryDark }} />
                            </IconButton>


                        )

                    }

            </FlexBetween>
        </>
    );
};

export default NameHeading;