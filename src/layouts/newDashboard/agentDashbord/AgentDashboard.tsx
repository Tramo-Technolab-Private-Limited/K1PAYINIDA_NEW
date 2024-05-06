import React from "react";
import AgentServices from "../AgentServices";
import { Box, Grid, Stack } from "@mui/material";
import DonutView from "../Charts/DonutView";
import LineView from "../Charts/LineView";
import TransactionDeatails from "../TransactionDeatails";
import Scrollbar from "src/components/scrollbar";

function AgentDashboard() {
  return (
    <Scrollbar>
      <Stack width={"100%"} p={2} spacing={2}>
        <AgentServices />
        <TransactionDeatails />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            transform: "scale(1)",
          }}
          gap={6}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={5}>
              <Stack
                sx={{
                  border: "1px dotted",
                  borderColor: "#C1C1C1",
                  borderRadius: 4,
                  borderWidth: 1,
                }}
              >
                <DonutView />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <Stack
                sx={{
                  border: "1px dotted",
                  borderColor: "#C1C1C1",
                  borderRadius: 4,
                  borderWidth: 1,
                }}
              >
                <LineView />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Scrollbar>
  );
}

export default AgentDashboard;
