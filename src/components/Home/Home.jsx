import {Box, useMediaQuery} from "@mui/material";
import {getUserDetails} from "../../helper/SessionHelper.js";
import UserWidget from "../../widgets/UserWidget.jsx";
import MyPostWidget from "../../widgets/MyPostWidget.jsx";
import PostsWidget from "../../widgets/PostsWidget.jsx";
import AdvertWidget from "../../widgets/AdvertWidget.jsx";
import FriendListWidget from "../../widgets/FriendListWidget.jsx";

const Home = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const picturePath = getUserDetails()['picture'];
    let currentUserId = getUserDetails()['id'];



    return (
        <>

                <Box
                    width="100%"
                    padding="2rem 6%"
                    display={isNonMobileScreens ? "flex" : "block"}
                    gap="0.5rem"
                    justifyContent="space-between"
                >
                    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                        <UserWidget userId={currentUserId} picturePath={picturePath} />
                    </Box>
                    <Box
                        flexBasis={isNonMobileScreens ? "42%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                        <MyPostWidget picturePath={picturePath} />
                        <PostsWidget userId={currentUserId} />
                    </Box>

                    {isNonMobileScreens && (
                        <Box flexBasis="26%">
                            <AdvertWidget />
                            <Box m="2rem 0" />
                            <FriendListWidget userId={currentUserId} />
                        </Box>
                    )
                    }


                </Box>


        </>
    );
};

export default Home;