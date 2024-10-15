import React, { useEffect, useState } from "react";
import AgentServices from "../AgentServices";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import DonutView from "../Charts/DonutView";
import LineView from "../Charts/LineView";
import TransactionDeatails from "../TransactionDeatails";
import Scrollbar from "src/components/scrollbar";
import Marquee from "react-fast-marquee";
import { useAuthContext } from "src/auth/useAuthContext";
import { useSnackbar } from "notistack";

function AgentDashboard() {
  const { user, Api } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [message, setMessage] = useState([]);

  // useEffect(() => {
  //   GetMessage();
  // }, []);

  // const GetMessage = () => {
  //   let token = localStorage.getItem("token");
  //   Api(`admin/flash_news?role=${"agent"}`, "GET", "", token).then(
  //     (Response: any) => {
  //       if (Response.status == 200) {
  //         if (Response.data.code == 200) {
  //           setMessage(Response.data.data);
  //         } else {
  //           enqueueSnackbar(Response.data.message, { variant: "error" });
  //         }
  //       }
  //     }
  //   );
  // };

  return (
    <Scrollbar>
      <div style={{ backgroundColor: "#F1D9FF" }}>
        <Stack maxWidth={"100%"} p={2} spacing={2}>
          <AgentServices />
          <TransactionDeatails />
        </Stack>
        <Box
          sx={{
            bgcolor: "#5C2B78",
            height: "5vh",
            position: "fixed",
            bottom: 2,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Stack justifyContent={"space-between"} flexDirection={"row"} p={1}>
            <Marquee style={{ width: "100%" }}>
              <Typography color="white" variant="h6">
                {message}
              </Typography>
            </Marquee>
          </Stack>
        </Box>
      </div>
    </Scrollbar>
  );
}

export default AgentDashboard;
