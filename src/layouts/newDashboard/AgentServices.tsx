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

import Recharge from "../../assets/icons/Group 35.svg";
import MoneyTransfer from "../../assets/icons/rupee_843780 1 (Traced).svg";
import DMT1 from "../../assets/icons/monetizing_1521786 1 (Traced).svg";
import DMT2 from "../../assets/icons/monetizing_1521786 1 (Traced).svg";
import BillPayment from "../../assets/icons/invoice_846190 1 (Traced).svg";
import AEPS from "../../assets/icons/fingerprint-scan_6692271 1 (Traced).svg";
import MATM from "../../assets/icons/atm-machine_584072 1 (Traced).svg";
import AadharPay from "../../assets/icons/Group 44.svg";
import IndoNepal from "../../assets/icons/Group 46.svg";

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
              minHeight: "19.5vh",
              maxHeight: "20vh",
            }}
          >
            <Box sx={{ p: 1.5, background: "#5C2B78" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  ml="3"
                  component="div"
                  color={"#FFFFFF"}
                >
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
              <Grid container justifyContent="space-between">
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
                      <Typography variant="subtitle1" sx={{ color: "#5C2B78" }}>
                        Recharge
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
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
                        variant="subtitle1"
                        sx={{ color: "#5C2B78" }}
                        noWrap
                      >
                        Money Transfer
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
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
                      <Typography variant="subtitle1" sx={{ color: "#5C2B78" }}>
                        DMT1
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                {/* <Divider orientation="vertical" flexItem sx={{ mx: 2 }} /> */}
                {/* <Grid item xs={4} sm={3} md={1.2}>
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
                      <Typography variant="subtitle1" sx={{ color: "#5C2B78" }}>
                        DMT2
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid> */}
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
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
                        variant="subtitle1"
                        sx={{ color: "#5C2B78" }}
                        noWrap
                      >
                        Bill Payment
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
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
                      <Typography variant="subtitle1" sx={{ color: "#5C2B78" }}>
                        AEPS
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack>
                    <Stack alignItems="center">
                      <img src={MATM} />
                      <Typography variant="subtitle1" sx={{ color: "#5C2B78" }}>
                        MATM
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#5C2B78" }}
                        noWrap
                      >
                        comming soon
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
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
                      <Typography variant="subtitle1" sx={{ color: "#5C2B78" }}>
                        AadharPay
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <Grid item xs={4} sm={3} md={1.2}>
                  <Stack>
                    <Stack alignItems="center">
                      <img src={IndoNepal} />
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#5C2B78" }}
                        noWrap
                      >
                        Indo Nepal
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#5C2B78" }}
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
