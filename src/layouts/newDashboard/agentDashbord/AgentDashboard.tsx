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
import CustomCard from "../CustomCard";
import AmountCustomCard from "../AmountCustomCard";
import SuccessNew from "../../../assets/dashboardIcon/Success.svg";
import FailedNew from "../../../assets/dashboardIcon/Failed.svg";
import PendingNew from "../../../assets/dashboardIcon/Pending.svg";
import WalletTop from "../../../assets/dashboardIcon/Wallet.svg";
import Earned from "../../../assets/dashboardIcon/Earned.svg";
import Incurred from "../../../assets/dashboardIcon/Incurred.svg";
import DonutView from "../Charts/DonutView";
import LineView from "../Charts/LineView";
import { Api } from "src/webservices";
function AgentDashboard() {
  const [value, setValue] = useState("daily");
  const [transaction, setTransactions] = useState<any>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    getTransactionList();
  }, [value]);

  const getTransactionList = () => {
    let token = localStorage.getItem("token");
    Api(`user/dashboard/transactionVolume/${value}`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setTransactions(Response.data);
            console.log("..............................", Response);
          }
        }
      }
    );
  };

  return (
    <>
      <Stack style={{ maxHeight: "720px", overflowY: "auto" }}>
        <Stack width={"100%"} p={2} spacing={2}>
          <AgentServices />

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
                  <Tab value="daily" label="Today" />
                  <Tab value="weekly" label="Weekly" />
                  <Tab value="monthly" label="Monthly" />
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
                      Status={transaction?.status}
                      amount={transaction?.count}
                      noOfTransaction={transaction?.totalAmount}
                    />
                  </Stack>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    Status="Failed"
                    icon={<img src={FailedNew} />}
                    footerColor="#FF5630"
                    amount="1000000"
                    noOfTransaction="2033"
                  />
                </Grid> */}
                {/* <Grid item xs={12} sm={6} md={4}>
                  <CustomCard
                    Status="Pending"
                    icon={<img src={PendingNew} />}
                    footerColor="#FFAB00"
                    amount="1000000"
                    noOfTransaction="2033"
                  />
                </Grid> */}
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
                    amountType="Wallet Top Up"
                    Amount="40,00,00,000"
                    icon={<img src={WalletTop} />}
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
