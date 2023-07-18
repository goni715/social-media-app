import React, {Suspense} from 'react';
import Navbar from "../components/Navbar/Navbar.jsx";
import {Box} from "@mui/material";
const FriendRequests = React.lazy(() => import('../components/FriendRequests/FriendRequests'));

const FriendRequestsPage = () => {
    return (
        <>
            <Box>
                <Navbar />
                <Suspense fallback="">
                    <FriendRequests/>
                </Suspense>
            </Box>

        </>
    );
};

export default FriendRequestsPage;