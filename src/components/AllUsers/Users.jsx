import {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectLoading} from "../../redux/state-slice/settingsSlice.js";
import {GetAllUsersRequest} from "../../ApiServices/UserApiRequest.js";
import {getUserDetails} from "../../helper/SessionHelper.js";
import User from "./User.jsx";
import {GetFriendRequests} from "../../ApiServices/FriendApiRequest.js";
import {selectFriendRequests} from "../../redux/state-slice/friendSlice.js";
import {selectUsers} from "../../redux/state-slice/profileSlice";
import WidgetWrapper from "../WidgetWrapper.jsx";
import {Box, Typography, useTheme} from "@mui/material";

const Users = () => {
    const { palette } = useTheme();

    useEffect(()=>{
        (async () => {
            await GetAllUsersRequest();
            await GetFriendRequests();
        })();
    },[])


    let loading = useSelector(selectLoading);
    let currentUserId = getUserDetails()['id'];
    const DataList = useSelector(selectUsers);
    let data = DataList.filter((currentValue)=> currentValue._id.toString() !== currentUserId.toString());
    const FriendRequests = useSelector(selectFriendRequests);

    let Users = [];

    if(FriendRequests.length > 0){
        for( let i = 0; i < FriendRequests.length; i++){
            Users = data.filter((currentValue)=> currentValue._id.toString() !== FriendRequests[i]._id.toString())
        }
    }else{
        Users=data;
    }





    return (
        <>


            <WidgetWrapper>
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    sx={{ mb: "1.5rem" }}
                >
                    People You May Know
                </Typography>
                <Box display="flex" flexDirection="column" gap="1.5rem">

                    {loading
                        ? "Fetching Friends...."
                        : Users.map((user, i) => {
                            return(
                                <User item={user} />
                            );
                        })
                    }

                </Box>
            </WidgetWrapper>

        </>
    );
};

export default Users;