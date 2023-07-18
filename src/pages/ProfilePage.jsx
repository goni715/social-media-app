import React, {Suspense} from 'react';
import {Box} from "@mui/material";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
const Profile = React.lazy(() => import('../components/Profile/Profile.jsx'));


const ProfilePage = () => {

    const { id } = useParams();

    return (
        <>
            <Box>
                <Navbar/>
                <Suspense fallback="">
                    <Profile id={id}/>
                </Suspense>
            </Box>
        </>
    );
};

export default ProfilePage;