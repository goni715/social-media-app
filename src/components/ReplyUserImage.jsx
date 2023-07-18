import { Box } from "@mui/material";

const ReplyUserImage = ({ image}) => {
  return (
    <Box width="60px" height="60px">
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width="50px"
        height="50px"
        alt="user"
        src={image}
      />
    </Box>
  );
};

export default ReplyUserImage;
