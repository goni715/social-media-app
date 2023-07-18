import React, {useMemo} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import {useSelector} from "react-redux";
import {selectMode} from "./redux/state-slice/authSlice";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {themeSettings} from "./helper/theme";
import FriendRequestsPage from "./pages/FriendRequestsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import {getToken} from "./helper/SessionHelper.js";
import EditPostPage from "./pages/EditPostPage.jsx";

const App = () => {

    const mode = useSelector(selectMode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


    if(getToken()){
        return (
            <>
                <div className="app">
                    <BrowserRouter>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Routes>
                                <Route path="/" element={<LoginPage />} />
                                <Route path="/home" element={<HomePage />} />
                                <Route
                                    path="/profile/:id"
                                    element={<ProfilePage/>}
                                />
                                <Route
                                    path="/edit-post/:id"
                                    element={<EditPostPage/>}
                                />
                                <Route path="/friend-requests" element={<FriendRequestsPage/>} />
                                <Route path="/users" element={<UsersPage/>} />
                            </Routes>
                        </ThemeProvider>
                    </BrowserRouter>
                </div>
            </>
        );
    }else{
        return (
            <>
                <div className="app">
                    <BrowserRouter>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Routes>
                                <Route path="/" element={<LoginPage />} />
                                <Route path="/home" element={<Navigate to="/" replace />} />
                                <Route
                                    path="/profile/:id"
                                    element={<Navigate to="/" replace />}
                                />
                                <Route path="/friend-requests" element={<Navigate to="/" replace />} />
                                <Route path="/users" element={<Navigate to="/" replace />} />
                            </Routes>
                        </ThemeProvider>
                    </BrowserRouter>
                </div>
            </>
        );
    }

};

export default App;