import React from "react";
import AgentServices from "../AgentServices";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import DonutView from "../Charts/DonutView";
import LineView from "../Charts/LineView";
import TransactionDeatails from "../TransactionDeatails";
import Scrollbar from "src/components/scrollbar";
import Marquee from "react-fast-marquee";

function AgentDashboard() {
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
                We're working hard to bring you an amazing experience. Our team
                is dedicated to developing innovative features that will enhance
                your journey with us. We can’t wait to share what we’ve been
                building!
              </Typography>
            </Marquee>
          </Stack>
        </Box>
      </div>
    </Scrollbar>
  );
}

export default AgentDashboard;
