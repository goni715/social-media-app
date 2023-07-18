import React from 'react';
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    AccountCircle
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import FlexBetween from "../components/FlexBetween/FlexBetween.jsx";
import {getToken, getUserDetails} from "../helper/SessionHelper.js";
import {GetUserRequest} from "../ApiServices/UserApiRequest.js";
import {
    selectEmail,
    selectFirstName,
    selectLastName,
    selectLocation, selectOccupation,
    selectProfilePicture
} from "../redux/state-slice/profileSlice.js";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import UserImage from "../components/UserImage.jsx";
import pic from "../assets/images/p2.jpeg";
import linkedin from '../assets/images/linkedin.png';
import twitter from '../assets/images/twitter.png';
import EditProfilePicModal from "../components/Modal/EditProfilePicModal.jsx";
import {SetProfilePicModalShow} from "../redux/state-slice/ModalSlice.js";


const UserWidget = ({userId, picturePath}) => {

    const dispatch = useDispatch();
    const { palette } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const token = getToken();
    const dark = palette.neutral.dark;
    const primaryLight = palette.primary.light;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    let currentUserId = getUserDetails()['id'];




    useEffect(()=>{
        (async () => {
            await GetUserRequest(userId);
        })();
    },[userId])

    let Email =useSelector(selectEmail);
    let FirstName = useSelector(selectFirstName);
    let LastName = useSelector(selectLastName);
    let ProfilePicture = useSelector(selectProfilePicture);
    let Location = useSelector(selectLocation);
    let Occupation = useSelector(selectOccupation);



    return (
        <>
           <WidgetWrapper>
               {/* FIRST ROW onClick={() => navigate("/profile/"+userId)} */}
               <FlexBetween
                   gap="0.5rem"
                   pb="1.1rem"

               >
                   <FlexBetween gap="1rem">
                       <UserImage image={ProfilePicture} />
                       <Box>
                           <Typography
                               variant="h4"
                               color={dark}
                               fontWeight="500"
                               sx={{
                                   "&:hover": {
                                       cursor: "pointer",
                                   },
                               }}
                           >
                               {FirstName} {LastName}
                           </Typography>
                           <Typography color={medium}>40 friends</Typography>
                       </Box>
                   </FlexBetween>
                   <ManageAccountsOutlined />
               </FlexBetween>

               <Divider/>


               {/* SECOND ROW */}
                <Box p="1rem 0">
                   <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                       <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                       <Typography color={medium}>{Location}</Typography>
                   </Box>
                   <Box display="flex" alignItems="center" gap="1rem">
                       <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                       <Typography color={medium}>{Occupation}</Typography>
                   </Box>
               </Box>

               <Divider />



               {/* THIRD ROW */}
               <Box p="1rem 0">
                   <FlexBetween mb="0.5rem">
                       <Typography color={medium}>Who's viewed your profile</Typography>
                       <Typography color={main} fontWeight="500">
                           viewprofile
                       </Typography>
                   </FlexBetween>
                   <FlexBetween>
                       <Typography color={medium}>Impressions of your post</Typography>
                       <Typography color={main} fontWeight="500">
                           impressions
                       </Typography>
                   </FlexBetween>
               </Box>

               <Divider />




               {/* Fifth ROW */}

               {
                   location.pathname === "/profile/"+userId && (
                       userId === currentUserId && (
                           <>
                               <Box p="1rem 0">
                                   <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                                       My Profile
                                   </Typography>

                                   <FlexBetween gap="1rem">
                                       <FlexBetween gap="1rem">
                                           <AccountCircle sx={{fontSize: "25px", color: main }}/>
                                           <Box>
                                               <Typography color={main} fontWeight="500">
                                                   Profile Picture
                                               </Typography>
                                           </Box>
                                       </FlexBetween>
                                       <EditOutlined onClick={()=>dispatch(SetProfilePicModalShow(true))} sx={{
                                           color:main,
                                           "&:hover": {
                                               cursor: "pointer",
                                           },
                                       }} />
                                   </FlexBetween>
                               </Box>
                           </>
                       )

                   )

               }


               <Divider />


               {/* FOURTH ROW */}
               <Box p="1rem 0">
                   <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                       Social Profiles
                   </Typography>

                   <FlexBetween gap="1rem" mb="0.5rem">
                       <FlexBetween gap="1rem">
                           <img src={twitter} alt="twitter" />
                           <Box>
                               <Typography color={main} fontWeight="500">
                                   Twitter
                               </Typography>
                               <Typography color={medium}>Social Network</Typography>
                           </Box>
                       </FlexBetween>
                       <EditOutlined sx={{ color: main }} />
                   </FlexBetween>

                   <FlexBetween gap="1rem">
                       <FlexBetween gap="1rem">
                           <img src={linkedin} alt="linkedin" />
                           <Box>
                               <Typography color={main} fontWeight="500">
                                   Linkedin
                               </Typography>
                               <Typography color={medium}>Network Platform</Typography>
                           </Box>
                       </FlexBetween>
                       <EditOutlined sx={{ color: main }} />
                   </FlexBetween>
               </Box>




               <EditProfilePicModal/>


           </WidgetWrapper>




        </>
    );
};

export default UserWidget;