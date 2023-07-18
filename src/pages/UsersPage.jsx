import React, {Suspense} from 'react';
import Navbar from "../components/Navbar/Navbar.jsx";
import {Box} from "@mui/material";
const AllUsers = React.lazy(() => import('../components/AllUsers/AllUsers.jsx'));


const UsersPage = () => {
    return (
        <>
            <Box>
                <Navbar />
                <Suspense fallback="">
                    <AllUsers/>
                </Suspense>
            </Box>
        </>
    );
};

export default UsersPage;