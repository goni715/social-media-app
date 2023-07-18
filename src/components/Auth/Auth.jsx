import React, {useState} from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Register from "./Register.jsx";
import Login from "./Login.jsx";


const Auth = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <>
            <Box>
                <Box
                    width="100%"
                    backgroundColor={theme.palette.background.alt}
                    p="1rem 6%"
                    textAlign="center"
                >
                    <Typography fontWeight="bold" fontSize="32px" color="primary">
                        Sociopedia
                    </Typography>
                </Box>

                <Box
                    width={isNonMobileScreens ? "50%" : "93%"}
                    p="2rem"
                    m="2rem auto"
                    borderRadius="1.5rem"
                    backgroundColor={theme.palette.background.alt}
                >
                    <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                        Welcome to Socipedia, the Social Media for Sociopaths!
                    </Typography>

                    { isSignUp ? (
                        <>
                            <Register setIsSignUp={setIsSignUp}/></>
                        ) : (
                            <>
                                <Login setIsSignUp={setIsSignUp}/>
                            </>
                        )
                    }
                </Box>
            </Box>
        </>
    );
};

export default Auth;