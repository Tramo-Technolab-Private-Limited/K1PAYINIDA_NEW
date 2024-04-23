import React, { useState } from "react";
import AgentServices from "../AgentServices";
import { Box, Card, Divider, Grid, Stack, Tab, Tabs } from "@mui/material";
import CustomCard from "../CustomCard";
import { useAuthContext } from "src/auth/useAuthContext";

function AgentDashboard() {
  const [value, setValue] = useState(1);
  const { user } = useAuthContext();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <AgentServices />
      <Stack width={"100%"} mt={1}>
        {user?.role == "agent" && (
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              background: "#F8FAFC",
            }}
          >
            <Box sx={{ p: 1, background: "#F6F6F6" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                >
                  <Tab label="Today" />
                  <Tab label="7 Days" />
                  <Tab label="30 Days" />
                </Tabs>
              </Stack>
            </Box>
            <Divider />
            <Box
              sx={{
                p: 4,
                display: "flex",
                justifyContent: "center",
                transform: "scale(1)",
              }}
              gap={6}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    color="FFFFFF"
                    Status="Success"
                    // icon={<Pending />}
                    icon="hi"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard Status="Failed" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard Status="Pending" />
                </Grid>
              </Grid>
            </Box>
          </Card>
        )}
      </Stack>
    </div>
  );
}

export default AgentDashboard;
