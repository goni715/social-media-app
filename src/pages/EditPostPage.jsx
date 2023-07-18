import React, {Suspense} from 'react';
import Navbar from "../components/Navbar/Navbar";
import {Box} from "@mui/material";
import {useParams} from "react-router-dom";
const EditPost = React.lazy(() => import('../components/EditPost/EditPost.jsx'));

const EditPostPage = () => {

    const {id} = useParams();

    return (
        <>
            <Box>
                <Navbar />
                <Suspense fallback="">
                    <EditPost id={id}/>
                </Suspense>
            </Box>
        </>
    );
};

export default EditPostPage;