import { Box } from "@mui/material";
import pic from "../assets/images/p1.jpeg";

const UserImage = ({ image}) => {
  return (
    <Box width="60px" height="60px">
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width="60px"
        height="60px"
        alt="user"
        src={image}
      />
    </Box>
  );
};

export default UserImage;
