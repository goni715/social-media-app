import React, {Suspense} from 'react';
import Navbar from "../components/Navbar/Navbar";
import {Box} from "@mui/material";
const Home = React.lazy(() => import('../components/Home/Home.jsx'));

const HomePage = () => {


    return (
        <>
            <Box>
                <Navbar />
                <Suspense fallback="">
                    <Home/>
                </Suspense>
            </Box>
        </>
    );
};

export default HomePage;