import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Icon1 from "../../../assets/icons/Frame 1171275314.svg";
import Icon2 from "../../../assets/icons/Frame 1171275315.svg";
import Icon3 from "../../../assets/icons/Frame 1171275316.svg";
import Icon4 from "../../../assets/icons/Frame 1171275317.svg";
import Icon5 from "../../../assets/icons/Isolation_Mode 1 (1).svg";
import Icon6 from "../../../assets/icons/money 1.svg";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { WidthFull } from "@mui/icons-material";
import { useAuthContext } from "src/auth/useAuthContext";
import { useSnackbar } from "notistack";

export default function TodayData() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [value, setValue] = React.useState(0);

  const { user, Api } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    GetMessage();
  }, []);

  const GetMessage = () => {
    let token = localStorage.getItem("token");
    Api(`admin/flash_news?role=${"m_distributor"}`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setMessage(Response.data.data);
          } else {
            enqueueSnackbar(Response.data.message, { variant: "error" });
          }
        }
      }
    );
  };

  const demoImageUrl = "";
  const name = "Balaji Enterprises";

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: "#683886",
    color: "#FFFFFF",
  }));

  const ColorDot = styled("span")(({ color }) => ({
    height: 10,
    width: 10,
    backgroundColor: color,
    borderRadius: "50%",
    display: "inline-block",
    marginRight: 8,
  }));

  const data = [
    { product: "Recharges", color: "#E91E63" },
    { product: "Bill Payments", color: "#FFA000" },
    { product: "Money Transfer", color: "#F44336" },
    { product: "Payout", color: "#3F51B5" },
    { product: "AEPS", color: "#FF9800" },
    { product: "Aadhaar Pay", color: "#00BCD4" },
    { product: "mATM", color: "#3F51B5" },
    { product: "Indo Nepal", color: "#4CAF50" },
  ];

  return (
    <>
      {/* <Box
        sx={{
          p: 2,
          width: "100%",
          height: isMobile ? "100%" : "auto",
          overflowY: "auto",
        }}
      > */}
      <Card sx={{ p: 2 }}>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{
            flexWrap: "wrap",
          }}
        >
          {/* Success Card */}
          <Card
            sx={{
              width: { xs: "100%", sm: "30%" },
              height: 150,
              p: 2,
              mb: 2,
            }}
          >
            <Stack flexDirection={"row"} gap={1}>
              <img src={Icon1} alt="Icon1" style={{ width: 40 }} />
              <Typography variant="h4">Success</Typography>
            </Stack>
            <Stack mt={1}>
              <Typography>Transaction Vol.</Typography>
              <Typography variant="subtitle1">₹ 10,00,00,000.00</Typography>
            </Stack>
            <Stack pl={3}>
              <Box sx={{ bgcolor: "#36B37E", p: 1 }}>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Typography color={"white"}>Transaction Count</Typography>
                  <Typography color={"white"}>2100</Typography>
                </Stack>
              </Box>
            </Stack>
          </Card>

          {/* Pending Card */}
          <Card
            sx={{
              width: { xs: "100%", sm: "30%" },
              height: 150,
              p: 2,
              mb: 2,
            }}
          >
            <Stack flexDirection={"row"} gap={1}>
              <img src={Icon2} alt="Icon2" style={{ width: 40 }} />
              <Typography variant="h4">Pending</Typography>
            </Stack>
            <Stack mt={1}>
              <Typography>Transaction Vol.</Typography>
              <Typography variant="subtitle1">₹ 10,00,00,000.00</Typography>
            </Stack>
            <Stack pl={3}>
              <Box sx={{ bgcolor: "#FFAB00", p: 1 }}>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Typography color={"white"}>Transaction Count</Typography>
                  <Typography color={"white"}>2100</Typography>
                </Stack>
              </Box>
            </Stack>
          </Card>

          {/* Failed Card */}
          <Card
            sx={{
              width: { xs: "100%", sm: "30%" },
              height: 150,
              p: 2,
              mb: 2,
            }}
          >
            <Stack flexDirection={"row"} gap={1}>
              <img src={Icon3} alt="Icon3" style={{ width: 40 }} />
              <Typography variant="h4">Failed</Typography>
            </Stack>
            <Stack mt={1}>
              <Typography>Transaction Vol.</Typography>
              <Typography variant="subtitle1">₹ 10,00,00,000.00</Typography>
            </Stack>
            <Stack pl={3}>
              <Box sx={{ bgcolor: "#FF5630", p: 1 }}>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Typography color={"white"}>Transaction Count</Typography>
                  <Typography color={"white"}>2100</Typography>
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Stack>

        {/* Second Row */}
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {/* Fund Transfer Card */}
          <Card
            sx={{
              width: { xs: "100%", sm: "30%" },
              height: 100,
              p: 2,
              mb: 2,
            }}
          >
            <Stack flexDirection={"row"} justifyContent={"space-between"} p={2}>
              <Stack>
                <Typography variant="body1">Fund Transfer</Typography>
                <Typography variant="subtitle1">₹ 20,00,000.00</Typography>
              </Stack>
              <Stack>
                <img src={Icon4} alt="Icon4" style={{ width: 50 }} />
              </Stack>
            </Stack>
          </Card>

          {/* Total Commission Earned Card */}
          <Card
            sx={{
              width: { xs: "100%", sm: "30%" },
              height: 100,
              p: 2,
              mb: 2,
            }}
          >
            <Stack flexDirection={"row"} justifyContent={"space-between"} p={2}>
              <Stack>
                <Typography variant="body1">Total Commission Earned</Typography>
                <Typography variant="subtitle1">₹ 20,00,000.00</Typography>
              </Stack>
              <Stack>
                <img src={Icon5} alt="Icon5" style={{ width: 50 }} />
              </Stack>
            </Stack>
          </Card>

          {/* Charges Incurred Card */}
          <Card
            sx={{
              width: { xs: "100%", sm: "30%" },
              height: 100,
              p: 2,
              mb: 2,
            }}
          >
            <Stack flexDirection={"row"} justifyContent={"space-between"} p={2}>
              <Stack>
                <Typography variant="body1">Charges Incurred</Typography>
                <Typography variant="subtitle1">₹ 20,00,000.00</Typography>
              </Stack>
              <Stack>
                <img src={Icon6} alt="Icon6" style={{ width: 50 }} />
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Card>
      <Box sx={{ p: 2, bgcolor: "#F2F2F2DD", mt: 3, borderRadius: 2 }}>
        <Typography variant="h6">Funds</Typography>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          {" "}
          <Card
            sx={{
              height: 170,
              p: 2,
              mt: 1,
              width: { xs: "100%", sm: "30%" },
              position: "relative",
            }}
          >
            <Typography variant="h6">Distributor (2452)</Typography>
            <Stack mt={1}>
              <Typography mt={1}>Fund Total</Typography>
              <Typography variant="subtitle1" mt={1}>
                ₹ 4,200
              </Typography>
            </Stack>

            {/* Bottom Pattis */}
            <Stack
              flexDirection={"column"}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                mt: 5,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#974EC4",
                  color: "white",
                }}
              >
                <Stack flexDirection={"row"} gap={30} pl={4}>
                  <Typography color={"white"}>Main</Typography>
                  <Typography color={"white"}>₹2100</Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#683886",
                  color: "white",
                }}
              >
                <Stack flexDirection={"row"} gap={30} pl={4}>
                  <Typography color={"white"}>AEPS</Typography>
                  <Typography color={"white"}>₹2100</Typography>
                </Stack>
              </Box>
            </Stack>
          </Card>
          <Card
            sx={{
              height: 170,
              p: 2,
              mt: 1,
              position: "relative",
              width: { xs: "100%", sm: "30%" },
            }}
          >
            <Typography variant="h6">Agent (45678)</Typography>
            <Stack mt={1}>
              <Typography mt={1}>Fund Total</Typography>
              <Typography variant="subtitle1" mt={1}>
                ₹ 4,200
              </Typography>
            </Stack>

            {/* Bottom Pattis */}
            <Stack
              flexDirection={"column"}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                mt: 5,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#974EC4",
                  color: "white",
                }}
              >
                <Stack flexDirection={"row"} gap={30} pl={4}>
                  <Typography color={"white"}>Main</Typography>
                  <Typography color={"white"}>₹2100</Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#683886",
                  color: "white",
                }}
              >
                <Stack flexDirection={"row"} gap={30} pl={4}>
                  <Typography color={"white"}>AEPS</Typography>
                  <Typography color={"white"}>₹2100</Typography>
                </Stack>
              </Box>
            </Stack>
          </Card>
          <Card
            sx={{
              height: 170,
              p: 2,
              mt: 1,
              position: "relative",
              bgcolor: "#E5BBFF",
              width: { xs: "100%", sm: "30%" },
            }}
          >
            <Stack mt={1}>
              <Typography mt={1} variant="h6">
                Fund Total
              </Typography>
              <Typography variant="h6" mt={1}>
                ₹ 10,00,00,000.00
              </Typography>
            </Stack>
          </Card>
        </Stack>
      </Box>
      <Card sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="financial dashboard table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  Business Volume
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  Success
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  Pending
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  Failed
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "#F5F2FF" }}>
                <TableCell />
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.product}>
                  <TableCell component="th" scope="row">
                    <ColorDot color={row.color} />
                    {row.product}
                  </TableCell>
                  <TableCell align="right">₹234</TableCell>
                  <TableCell align="right">23</TableCell>
                  <TableCell align="right">₹234</TableCell>
                  <TableCell align="right">23</TableCell>
                  <TableCell align="right">₹234</TableCell>
                  <TableCell align="right">23</TableCell>
                  <TableCell align="right">₹234</TableCell>
                  <TableCell align="right">23</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card sx={{ mt: 1, p: 1, bgcolor: "#F8FAFC" }}>
        <Typography variant="h6">Top 5 Distributors</Typography>
        <Stack flexDirection={"row"} mt={3} justifyContent={"space-between"}>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200, // Adjust height for the image
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 1</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 2</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 3</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 4</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 5</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
        </Stack>
      </Card>
      <Card sx={{ mt: 1, p: 1, bgcolor: "#F8FAFC" }}>
        <Typography variant="h6">Top 5 Agents</Typography>
        <Stack flexDirection={"row"} mt={3} justifyContent={"space-between"}>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 1</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 2</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 3</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 4</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", sm: "18%" },
              height: 200, // Adjust height for the image
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle2">Rank 5</Typography>
            <Typography variant="subtitle2">Transaction Vol.</Typography>
            <Typography variant="h6">₹ 10,00,00,000.00</Typography>
          </Card>
        </Stack>
      </Card>
      <Box
        sx={{
          bgcolor: "#5C2B78",
          height: "5vh",
          position: "fixed",
          bottom: 2,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Stack justifyContent={"space-between"} flexDirection={"row"} p={1}>
          <Marquee style={{ width: "100%" }}>
            <Typography color="white" variant="h6">
              {message}
            </Typography>
          </Marquee>
        </Stack>
      </Box>
      {/* </Box> */}
    </>
  );
}
