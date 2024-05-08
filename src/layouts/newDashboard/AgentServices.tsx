import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Container,
  Typography,
  Button,
  CardContent,
  Box,
  Stack,
  Card,
  Divider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import Recharge from "../../assets/services/RechargeNew.svg";
import MoneyTransfer from "../../assets/services/MoneyTransferNew.svg";
import DMT1 from "../../assets/services/DMT1New.svg";
import DMT2 from "../../assets/services/DMT2New.svg";
import BillPayment from "../../assets/services/BillPaymentNew.svg";
import AEPS from "../../assets/services/AEPSNew.svg";
import MATM from "../../assets/services/MATMNew.svg";
import AadharPay from "../../assets/services/AadharPayNew.svg";
import IndoNepal from "../../assets/services/IndoNepalNew.svg";

import { useAuthContext } from "src/auth/useAuthContext";

// ----------------------------------------------------------------------

export default function AgentServices(props: any) {
  const { user, Api, UploadFileApi } = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> My Stats | {process.env.REACT_APP_COMPANY_NAME} </title>
      </Helmet>
      <Grid width={"100%"}>
        {user?.role == "agent" && (
          <Card
            sx={{
              width: "100%",
              background: "#F8FAFC",
            }}
          >
            <Box sx={{ p: 1.5, background: "#CCD5E3" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography gutterBottom variant="h5" ml="3" component="div">
                  Services
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box
              sx={{
                p: 3,
              }}
            >
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      transition: "300ms ease ",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.2)",
                        transition: "300ms ease ",
                      },
                    }}
                  >
                    <Stack alignItems="center">
                      <img
                        src={Recharge}
                        onClick={() => navigate("/auth/service/recharge")}
                      />
                      <Typography variant="body2" sx={{ color: "#3333CC" }}>
                        Recharge
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      transition: "300ms ease ",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.2)",
                        transition: "300ms ease ",
                      },
                    }}
                  >
                    <Stack alignItems="center">
                      <img
                        src={MoneyTransfer}
                        onClick={() => navigate("/auth/service/dmt")}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#3498DB" }}
                        noWrap
                      >
                        Money Transfer
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      transition: "300ms ease ",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.2)",
                        transition: "300ms ease ",
                      },
                    }}
                  >
                    <Stack alignItems="center">
                      <img
                        src={DMT1}
                        onClick={() => navigate("/auth/service/dmt1")}
                      />
                      <Typography variant="body2" sx={{ color: "#2ECC71" }}>
                        DMT1
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      transition: "300ms ease ",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.2)",
                        transition: "300ms ease ",
                      },
                    }}
                  >
                    <Stack alignItems="center">
                      <img
                        src={DMT2}
                        onClick={() => navigate("/auth/service/dmt2")}
                      />
                      <Typography variant="body2" sx={{ color: "#9B59B6" }}>
                        DMT2
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      transition: "300ms ease ",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.2)",
                        transition: "300ms ease ",
                      },
                    }}
                  >
                    <Stack alignItems="center">
                      <img
                        src={BillPayment}
                        onClick={() => navigate("/auth/service/billpayment")}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#F1C40F" }}
                        noWrap
                      >
                        Bill Payment
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      transition: "300ms ease ",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.2)",
                        transition: "300ms ease ",
                      },
                    }}
                  >
                    <Stack alignItems="center">
                      <img
                        src={AEPS}
                        onClick={() => navigate("/auth/service/aeps")}
                      />
                      <Typography variant="body2" sx={{ color: "#F39C12" }}>
                        AEPS
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack>
                    <Stack alignItems="center">
                      <img src={MATM} />
                      <Typography variant="caption" sx={{ color: "#E74C3C" }}>
                        MATM
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#E74C3C" }}
                        noWrap
                      >
                        comming soon
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      transition: "300ms ease ",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.2)",
                        transition: "300ms ease ",
                      },
                    }}
                  >
                    <Stack alignItems="center">
                      <img
                        src={AadharPay}
                        onClick={() => navigate("/auth/service/aadhaarpay")}
                      />
                      <Typography variant="body2" sx={{ color: "#1ABC9C" }}>
                        AadharPay
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack>
                    <Stack alignItems="center">
                      <img src={IndoNepal} />
                      <Typography
                        variant="caption"
                        sx={{ color: "#FF6B81" }}
                        noWrap
                      >
                        Indo Nepal
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#FF6B81" }}
                        noWrap
                      >
                        comming soon
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Card>
        )}
      </Grid>
    </>
  );
}
