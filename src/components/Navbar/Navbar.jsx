import React, {useEffect, useState} from "react";
import {
    Box,
    Badge,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery, Link,
} from "@mui/material";
import {
    Home,
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
    Diversity3
} from "@mui/icons-material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {useDispatch, useSelector,} from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween/FlexBetween";
import {SetMode} from "../../redux/state-slice/authSlice";
import {getUserDetails} from "../../helper/SessionHelper.js";
import {selectTotalFriendRequests} from "../../redux/state-slice/friendSlice.js";
import {GetFriendRequests} from "../../ApiServices/FriendApiRequest.js";
import {io} from "socket.io-client";


const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const socket = io('http://localhost:5000');


    useEffect(()=>{
        (async () => {
            await GetFriendRequests();
        })();
    },[])
    const TotalFriendRequests = useSelector(selectTotalFriendRequests);
    const fullName = getUserDetails()?.firstName + " " + getUserDetails()?.lastName;
    const currentUserId = getUserDetails()['id'];


   const Logout = () => {
     localStorage.clear();
     window.location.href="/";
   }


    useEffect(()=>{
        socket.on('success-request', (data) => {
            (async () => {
                await GetFriendRequests();
            })();
        });
    },[]);



    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    Sociopedia
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(SetMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Home onClick={()=>navigate("/home")}  sx={{
                        fontSize: "25px",
                        "&:hover": {
                            cursor: "pointer",
                        }}} />
                    <div onClick={()=>navigate("/friend-requests")} className="position-relative request" >
                        <PeopleAltIcon sx={{ fontSize: "25px" }} />
                        <span className="badge bg-primary text-white position-absolute my-badge">
                         {TotalFriendRequests !== "" ? TotalFriendRequests : "0"}
                        </span>
                    </div>
                    <Message sx={{ fontSize: "25px" }} />
                    <Diversity3
                        sx={{
                            fontSize: "25px",
                            "&:hover": {
                                cursor: "pointer",
                            }}}
                        onClick={()=>navigate("/users")}
                    />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>
                                    {fullName}
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={()=>{
                                    navigate("/profile/"+currentUserId)
                                }}
                            >
                                <Typography>
                                   Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={Logout}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <>
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Menu />
                    </IconButton>
                </>

            )
            }

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <IconButton
                            onClick={() => dispatch(SetMode())}
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <Home onClick={()=>navigate("/home")}  sx={{
                            fontSize: "25px",
                            "&:hover": {
                                cursor: "pointer",
                            }}} />
                        <div onClick={()=>navigate("/friend-requests")} className="position-relative request" >
                            <PeopleAltIcon sx={{ fontSize: "25px" }} />
                            <span className="badge bg-primary text-white position-absolute my-badge">
                         {TotalFriendRequests !== "" ? TotalFriendRequests : "0"}
                        </span>
                        </div>
                        <Message sx={{ fontSize: "25px" }} />
                        <Diversity3
                            sx={{
                                fontSize: "25px",
                                "&:hover": {
                                    cursor: "pointer",
                                },}}
                            onClick={()=>navigate("/users")}
                        />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName} >
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={Logout}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;
