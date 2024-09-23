import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import WalletTop from "../../assets/dashboardIcon/Wallet.svg";
import Earned from "../../assets/dashboardIcon/Earned.svg";
import Incurred from "../../assets/dashboardIcon/Incurred.svg";
import CustomCard from "./CustomCard";
import AmountCustomCard from "./AmountCustomCard";
import ApiDataLoading from "src/components/customFunctions/ApiDataLoading";
import { useAuthContext } from "src/auth/useAuthContext";
import DonutView from "./Charts/DonutView";
function TransactionDeatails() {
  const { user, logout, Api, UploadFileApi } = useAuthContext();
  const [value, setValue] = useState("daily");
  const [transaction, setTransactions] = useState<any>([]);
  const [refund, settotalRefund] = useState<any>([]);
  const [Commission, settotalComission] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [volume, settotalvolume] = useState([]);
  const [totalSuccess, setTotalSuccess] = useState<any>([]);
  const [totalFail, setTotalFail] = useState<any>([]);
  const [totalpending, settotalPending] = useState<any>([]);
  const [totalCharge, settotalCharges] = useState<any>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "920", sm: "920" },
    bgcolor: "background.paper",
    border: "2px ",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };
  useEffect(() => {
    getTransactionList();
    getTotalSuccess();
    getTotalFail();
    getTotalPending();
    getTotalCharges();
    getTotalRefund();
    getTotalComission();
  }, [value]);

  const getTransactionList = () => {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    Api(`user/dashboard/totalTransactions`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setTransactions(Response?.data?.totalTransactions);
            settotalvolume(Response?.data?.volume);
            console.log("totalTransactions=-=======", Response);
            setIsLoading(false);
          }
          setIsLoading(false);
        }
      }
    );
  };

  const getTotalSuccess = () => {
    let token = localStorage.getItem("token");
    Api(`user/dashboard/totalSuccessTransaction`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setTotalSuccess(Response?.data?.totalTransactions);
          }
        }
      }
    );
  };
  const getTotalFail = () => {
    let token = localStorage.getItem("token");
    Api(`user/dashboard/totalFailedTransaction`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setTotalFail(Response?.data?.totalTransactions);
          }
        }
      }
    );
  };

  const getTotalPending = () => {
    let token = localStorage.getItem("token");
    Api(`user/dashboard/totalPendingTransaction`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            settotalPending(Response?.data?.totalTransactions);
          }
        }
      }
    );
  };

  const getTotalCharges = () => {
    let token = localStorage.getItem("token");
    Api(`user/dashboard/totalPendingTransaction`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            settotalCharges(Response?.data?.totalTransactions);
          }
        }
      }
    );
  };

  const getTotalRefund = () => {
    let token = localStorage.getItem("token");
    Api(`user/dashboard/totalRefunded`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            settotalRefund(Response?.data?.totalTransactions);
          }
        }
      }
    );
  };

  const getTotalComission = () => {
    let token = localStorage.getItem("token");
    Api(`user/dashboard/totalCommission/daily`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            settotalComission(Response?.data?.totalCommission);
          }
        }
      }
    );
  };

  const handleClickB = () => {
    console.log("Clicked in Component B");
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: "100%",
        }}
      >
        <Box sx={{ p: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Business Summary</Typography>
            {/* <Tabs
              value={value}
              onChange={handleChange}
              aria-label="disabled tabs example"
            > */}
            <Button variant="contained" sx={{ bgcolor: "#5C2B78" }}>
              Today
            </Button>
            {/* <Tab value="daily" label="Today" /> */}
            {/* <Tab value="weekly" label="Weekly" />
              <Tab value="monthly" label="Monthly" /> */}
            {/* </Tabs> */}
          </Stack>
        </Box>
        {/* <Divider /> */}
        {isLoading ? (
          <ApiDataLoading />
        ) : (
          <>
            <Stack flexDirection={{ xs: "column", md: "row" }}>
              <Stack sx={{ mt: 2, width: { xs: "100%", md: "30%" } }}>
                {" "}
                <Grid>
                  <DonutView />
                </Grid>
              </Stack>

              <Grid sx={{ width: { xs: "100%", md: "70%" }, mt: 5 }}>
                <Stack mt={10}>
                  {/* <Grid container spacing={3}>
                    {transaction.map((item: any) => (
                      <Grid item xs={12} sm={6} md={4}>
                        <span onClick={handleClickB}>
                          <CustomCard
                            sx={{ height: "150px" }}
                            color="FFFFFF"
                            Status={item?.status}
                            amount={item?.count}
                            noOfTransaction={item?.totalAmount}
                          />
                        </span>
                      </Grid>
                    ))}
                  </Grid> */}

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <AmountCustomCard
                        sx={{ height: "150px" }}
                        amountType="Total Transactions"
                        Amount={transaction}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <AmountCustomCard
                        sx={{ height: "150px" }}
                        amountType="Total Amount"
                        Amount={volume}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <AmountCustomCard
                        sx={{ height: "150px" }}
                        amountType="Total Refunded Transactions"
                        Amount={refund}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <AmountCustomCard
                        sx={{ height: "150px" }}
                        amountType="Total Commission"
                        Amount={Commission}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mt={5}>
                    <Grid item xs={12} sm={6} md={3}>
                      <AmountCustomCard
                        sx={{ height: "150px" }}
                        amountType="Total Success Transactions"
                        Amount={totalSuccess}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <AmountCustomCard
                        sx={{ height: "150px" }}
                        amountType="Total Pending Transactions"
                        Amount={totalpending}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <AmountCustomCard
                        sx={{ height: "150px" }}
                        amountType="Total Failed Transactions"
                        Amount={totalFail}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <AmountCustomCard
                        sx={{ height: "150px" }}
                        amountType="Total Charges"
                        Amount={totalCharge}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Stack>
          </>
        )}
      </Card>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            <CustomCard />
          </Typography>
        </Box>
      </Modal> */}
    </>
  );
}

export default TransactionDeatails;
