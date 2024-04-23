//////////////////last...................

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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";

import Recharge from "../../assets/services/Recharge.svg";
import MoneyTransfer from "../../assets/services/MoneyTransfer.svg";
import DMT1 from "../../assets/services/DMT1.svg";
import DMT2 from "../../assets/services/DMT2.svg";
import BillPayment from "../../assets/services/BillPayment.svg";
import AEPS from "../../assets/services/AEPS.svg";
import MATM from "../../assets/services/MATM.svg";
import AadharPay from "../../assets/services/AadharPay.svg";
import IndoNepal from "../../assets/services/IndoNepal.svg";

import { useAuthContext } from "src/auth/useAuthContext";
import CustomCard from "./CustomCard";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function AgentServices(props: any) {
  const { user } = useAuthContext();
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
            variant="outlined"
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
                p: 4,
                display: "flex",

                justifyContent: "center",

                transform: "scale(1)",
              }}
              gap={6}
            >
              <Stack
                sx={{
                  cursor: "pointer",
                  transition: "300ms ease ",
                  transform: "scale(1)",
                  "& : hover": {
                    transform: "scale(1.2)",
                    transition: "300ms ease ",
                  },
                }}
              >
                <img
                  src={Recharge}
                  onClick={() => navigate("/auth/service/recharge")}
                />
              </Stack>
              <Stack
                sx={{
                  cursor: "pointer",
                  transition: "300ms ease transform",
                  "& : hover": {
                    transform: "scale(1.2)",
                    transition: "300ms ease transform",
                  },
                }}
              >
                <img
                  src={MoneyTransfer}
                  onClick={() => navigate("/auth/service/dmt")}
                />
              </Stack>
              <Stack
                sx={{
                  cursor: "pointer",
                  transition: "300ms ease ",
                  transform: "scale(1)",
                  "& : hover": {
                    transform: "scale(1.2)",
                    transition: "300ms ease ",
                  },
                }}
              >
                <img
                  src={DMT1}
                  onClick={() => navigate("/auth/service/dmt1")}
                />
              </Stack>
              <Stack
                sx={{
                  cursor: "pointer",
                  transition: "300ms ease ",
                  transform: "scale(1)",
                  "& : hover": {
                    transform: "scale(1.2)",
                    transition: "300ms ease ",
                  },
                }}
              >
                <img
                  src={DMT2}
                  onClick={() => navigate("/auth/service/dmt2")}
                />
              </Stack>
              <Stack
                sx={{
                  cursor: "pointer",
                  transition: "300ms ease ",
                  transform: "scale(1)",
                  "& : hover": {
                    transform: "scale(1.2)",
                    transition: "300ms ease ",
                  },
                }}
              >
                <img
                  src={BillPayment}
                  onClick={() => navigate("/auth/service/billpayment")}
                />
              </Stack>
              <Stack
                sx={{
                  cursor: "pointer",
                  transition: "300ms ease ",
                  transform: "scale(1)",
                  "& : hover": {
                    transform: "scale(1.2)",
                    transition: "300ms ease ",
                  },
                }}
              >
                <img
                  src={AEPS}
                  onClick={() => navigate("/auth/service/aeps")}
                />
              </Stack>
              <Stack>
                <img src={MATM} style={{ width: "60px", height: "60px" }} />
                <Typography style={{ fontSize: "8px" }} color="error">
                  Comming soon
                </Typography>
              </Stack>
              <Stack
                sx={{
                  cursor: "pointer",
                  transition: "300ms ease ",
                  transform: "scale(1)",
                  "& : hover": {
                    transform: "scale(1.2)",
                    transition: "300ms ease ",
                  },
                }}
              >
                <img
                  src={AadharPay}
                  onClick={() => navigate("/auth/service/aadhaarpay")}
                />
              </Stack>

              <Stack>
                <img
                  src={IndoNepal}
                  style={{ width: "60px", height: "60px" }}
                />
                <Typography style={{ fontSize: "8px" }} color="error">
                  Comming soon
                </Typography>
              </Stack>
            </Box>
          </Card>
        )}
      </Grid>
    </>
  );
}

// export default AgentServices;
