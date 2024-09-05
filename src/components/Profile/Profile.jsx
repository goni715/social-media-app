import {Box, useMediaQuery} from "@mui/material";
import UserWidget from "../../widgets/UserWidget.jsx";
import pic from "../../assets/images/p3.jpeg";
import FriendListWidget from "../../widgets/FriendListWidget.jsx";
import PostsWidget from "../../widgets/PostsWidget.jsx";
import AdvertWidget from "../../widgets/AdvertWidget.jsx";

const Profile = ({id}) => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");



    return (
        <>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={id} picturePath={pic} />
                    <Box m="2rem 0" />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <Box m="2rem 0" />
                    <PostsWidget userId={id} isProfile={true}/>
                </Box>

                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget userId={id} />
                    </Box>
                )
                }
            </Box>
        </>
    );
};

export default Profile;