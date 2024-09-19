import React from "react";
import AgentServices from "../AgentServices";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import DonutView from "../Charts/DonutView";
import LineView from "../Charts/LineView";
import TransactionDeatails from "../TransactionDeatails";
import Scrollbar from "src/components/scrollbar";

function AgentDashboard() {
  return (
    <Scrollbar>
      <div style={{ backgroundColor: "#F1D9FF" }}>
        <Stack maxWidth={"100%"} p={2} spacing={2}>
          <AgentServices />
          <TransactionDeatails />
        </Stack>
        <Card
          sx={{
            bgcolor: "#5C2B78",
            height: "5vh",
          }}
        >
          <Stack justifyContent={"space-between"} flexDirection={"row"} p={2}>
            <Stack></Stack>
            <Stack>
              <Typography color="white" variant="caption">
                News Flash Coming Soon
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </div>
    </Scrollbar>
  );
}

export default AgentDashboard;
