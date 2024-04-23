import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
// import DMT2 from "../../assets/services/DMT1.svg";
function CustomCard(props: any) {
  return (
    <>
      <Card sx={{ background: props.color }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="000000">
            {props.icon} {props?.Status}
          </Typography>
          <Typography
            sx={{
              width: "1440px",
              top: "491px",
              left: "2601px",
            }}
            color="000000"
          >
            Transaction Vol.
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              fontStyle: "Public Sans",
              lineHeight: "23.5px",
            }}
            color="000000"
          >
            ₹ 1000000000
          </Typography>
        </CardContent>
        <Stack
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "green",
            padding: "4px",
            textAlign: "center",
            color: "white",
          }}
        >
          Footer Content
        </Stack>
      </Card>

      {/* <DMT2 /> */}
    </>
  );
}

export default CustomCard;
