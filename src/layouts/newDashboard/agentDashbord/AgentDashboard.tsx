import React, { useEffect, useState } from "react";
import AgentServices from "../AgentServices";
import {
  Box,
  Card,
  Divider,
  Grid,
  Modal,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import DonutView from "../Charts/DonutView";
import LineView from "../Charts/LineView";
import TransactionDeatails from "../TransactionDeatails";
function AgentDashboard() {
  return (
    <>
      <Stack style={{ maxHeight: "720px", overflowY: "auto" }}>
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
                  <DonutView chartHeight="380" />
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
                  <LineView chartHeight="300" />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default AgentDashboard;
