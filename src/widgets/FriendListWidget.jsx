import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { useEffect } from "react";
import {useSelector } from "react-redux";
import {selectFriends} from "../redux/state-slice/friendSlice.js";
import {GetFriends} from "../ApiServices/FriendApiRequest.js";


const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();


    useEffect(()=>{
        (async () => {
            await GetFriends(userId);
        })();
    },[userId])


    const FriendList = useSelector(selectFriends);


  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">

        {FriendList?.map((item,i) => (
            <Friend
                key={i.toString()}
                friendId={item?._id}
                name={item?.firstName+" "+item?.lastName}
                subtitle="subtitle"
                userPicturePath={item?.profilePicture}
                userId={userId}
            />
        ))}

      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
