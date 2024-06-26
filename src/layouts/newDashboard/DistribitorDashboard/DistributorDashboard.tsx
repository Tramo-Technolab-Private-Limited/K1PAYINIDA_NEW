import React, { useState } from "react";
import AgentServices from "../AgentServices";
import {
  Box,
  Card,
  Divider,
  Grid,
  Modal,
  Stack,
  Tab,
  Typography,
  Tabs,
} from "@mui/material";
import CustomCard from "../CustomCard";
import AmountCustomCard from "../AmountCustomCard";
import { useAuthContext } from "src/auth/useAuthContext";
import SuccessNew from "../../../assets/dashboardIcon/Success.svg";
import FailedNew from "../../../assets/dashboardIcon/Failed.svg";
import PendingNew from "../../../assets/dashboardIcon/Pending.svg";
import WalletTop from "../../../assets/dashboardIcon/Wallet.svg";
import Earned from "../../../assets/dashboardIcon/Earned.svg";
import Incurred from "../../../assets/dashboardIcon/Incurred.svg";

import FundTransfer from "../../../assets/dashboardIcon/FundTransfer.svg";
import Main from "../../../assets/dashboardIcon/Main.svg";
import AEPS from "../../../assets/dashboardIcon/AEPS.svg";

import DonutView from "../Charts/DonutView";
import LineView from "../Charts/LineView";
import MonochromePieChart from "../Charts/MonochromePie";

function DistributorDashboard() {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack style={{ maxHeight: "720px", overflowX: "auto" }}>
        <Stack width={"100%"} p={2} spacing={2}>
          <Card
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
                p: 1.5,
                display: "flex",
                justifyContent: "center",
                transform: "scale(1)",
              }}
              gap={6}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack>
                    <CustomCard
                      color="FFFFFF"
                      Status="Success"
                      icon={<img src={SuccessNew} />}
                      footerColor="#36B37E"
                      amount="1000000"
                      noOfTransaction="2033"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    Status="Failed"
                    icon={<img src={FailedNew} />}
                    footerColor="#FF5630"
                    amount="1000000"
                    noOfTransaction="2033"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    Status="Pending"
                    icon={<img src={PendingNew} />}
                    footerColor="#FFAB00"
                    amount="1000000"
                    noOfTransaction="2033"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                p: 1.5,
                display: "flex",
                justifyContent: "center",
                transform: "scale(1)",
              }}
              gap={6}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <AmountCustomCard
                    amountType="Fund Transfer"
                    Amount="40,00,00,000"
                    icon={<img src={FundTransfer} />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <AmountCustomCard
                    amountType="Total Commission Earned"
                    Amount="40,00,00,000"
                    icon={<img src={Earned} />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <AmountCustomCard
                    amountType="Charges Incurred"
                    Amount="40,00,00,000"
                    icon={<img src={Incurred} />}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              transform: "scale(1)",
            }}
            gap={6}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <Stack
                  sx={{
                    border: "1px dotted",
                    borderColor: "#C1C1C1",
                    borderRadius: 4,
                    borderWidth: 1,
                    padding: 3,
                  }}
                >
                  <Stack spacing={2}>
                    <AmountCustomCard
                      amountType="Main"
                      Amount="40,00,00,000"
                      icon={<img src={Main} />}
                      color="#F3F3F3"
                    />

                    <AmountCustomCard
                      amountType="AEPS"
                      Amount="40,00,00,000"
                      icon={<img src={AEPS} />}
                      color="#F3F3F3"
                    />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Stack
                  sx={{
                    border: "1px dotted",
                    borderColor: "#C1C1C1",
                    borderRadius: 4,
                    borderWidth: 1,
                  }}
                >
                  <DonutView chartHeight="220px" />
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Card
            sx={{
              width: "100%",
              background: "#F8FAFC",
            }}
          >
            <Box
              sx={{
                p: 1.5,
                display: "flex",
                justifyContent: "space-between", // Change this line
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>
                Top 5 Performers{" "}
              </Typography>
              <Stack p={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <CustomCard
                      color="FFFFFF"
                      Status="Success"
                      icon={<img src={SuccessNew} />}
                      footerColor="#000000"
                      amount="1000000"
                      noOfTransaction="2033"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <CustomCard
                      Status="Failed"
                      icon={<img src={FailedNew} />}
                      footerColor="#000000"
                      amount="1000000"
                      noOfTransaction="2033"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <CustomCard
                      Status="Failed"
                      icon={<img src={FailedNew} />}
                      footerColor="#000000"
                      amount="1000000"
                      noOfTransaction="2033"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <CustomCard
                      Status="Failed"
                      icon={<img src={FailedNew} />}
                      footerColor="#000000"
                      amount="1000000"
                      noOfTransaction="2033"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <CustomCard
                      Status="Failed"
                      icon={<img src={FailedNew} />}
                      footerColor="#000000"
                      amount="1000000"
                      noOfTransaction="2033"
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Card>
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
                  <MonochromePieChart chartHeight="340" />
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

export default DistributorDashboard;
