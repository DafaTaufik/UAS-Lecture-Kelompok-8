import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = ({ value }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        alignItems: "center",
        width: "100%",
        height: "50px",
        borderRadius: "100%", 
        backgroundColor: "rgba(0, 0, 0, 1)" 
      }}
    >
      <CircularProgress variant="determinate" value={value * 10} color="info" size={50} />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          sx={{
            marginTop: "-5px",
            color: "#ffffff",
            padding: "4px 8px"
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;
