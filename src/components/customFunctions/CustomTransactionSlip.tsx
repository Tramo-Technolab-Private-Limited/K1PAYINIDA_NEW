import {
  Grid,
  IconButton,
  Stack,
  tableCellClasses,
  Tooltip,
  TableCell,
  styled,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TextField,
  Divider,
  Modal,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Iconify from "../iconify/Iconify";
import ReactToPrint from "react-to-print";
import { useAuthContext } from "src/auth/useAuthContext";
import { fDateTime } from "src/utils/formatTime";
import Scrollbar from "../scrollbar/Scrollbar";
import { sentenceCase } from "change-case";
import { fIndianCurrency } from "src/utils/formatNumber";
import Logo from "../logo/Logo";
import Label from "../label/Label";
import HandleClose from "./TrasactionModal";
function CustomTransactionSlip(newRow: any) {
  const { user } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(true);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleTextFieldChange = (event: any) => {
    setTextFieldValue(event.target.value);
  };
  const closeModal = () => setModalOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 720 },
    bgcolor: "#ffffff",
    borderRadius: 2,
  };
  const componentRef = useRef<any>();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      padding: 6,
    },
  }));

  return (
    <>
      <Grid sx={style}>
        <Stack flexDirection={"row"} justifyContent={"flex-end"} mx={1}>
          <Tooltip title="Close" onClick={HandleClose}>
            <IconButton>
              <Iconify icon="carbon:close-outline" />
              ss
            </IconButton>
          </Tooltip>
          <ReactToPrint
            trigger={() => (
              <Tooltip title="Print">
                <IconButton>
                  <Iconify icon="eva:printer-fill" />
                </IconButton>
              </Tooltip>
            )}
            content={() => componentRef.current}
            onAfterPrint={closeModal}
          />
        </Stack>
        <Grid ref={componentRef} sx={{ p: 3 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4}>
              <Stack flexDirection={"row"} gap={1}>
                <Typography variant="caption">Agent Name: </Typography>
                <Typography variant="caption">
                  {`${user?.firstName} ${user?.lastName}`}
                </Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <Typography variant="caption">User code: </Typography>
                <Typography variant="caption">{`${user?.userCode}`}</Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <Typography variant="caption"> Mobile Number: </Typography>
                <Typography variant="caption">{user?.contact_no}</Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <Typography variant="caption"> Shop Name: </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {user?.agentDetails?.id?.company_name
                    ? user?.agentDetails?.id?.company_name
                    : " No Shop Name "}
                </Typography>
              </Stack>
              {newRow?.newRow?.categoryName == "MONEY TRANSFER" && (
                <Stack flexDirection={"row"} gap={1} mt={4}>
                  <Typography variant="caption">Sender Name : </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.moneyTransferSenderId?.remitterFN}
                    {newRow?.newRow?.moneyTransferSenderId?.remitterLN}{" "}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "MONEY TRANSFER" && (
                <Stack flexDirection={"row"} gap={1}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.moneyTransferSenderId?.remitterMobile}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "MONEY TRANSFER" && (
                <Stack flexDirection={"row"} gap={1}>
                  <Typography variant="caption"> Service Type: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.productName}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "DMT2" && (
                <Stack flexDirection={"row"} gap={1} mt={4}>
                  <Typography variant="caption">Sender Name : </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.moneyTransferSenderId?.remitterFN}
                    {newRow?.newRow?.moneyTransferSenderId?.remitterLN}{" "}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "DMT2" && (
                <Stack flexDirection={"row"} gap={1}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.moneyTransferSenderId?.remitterMobile}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "DMT2" && (
                <Stack flexDirection={"row"} gap={1}>
                  <Typography variant="caption"> Service Type: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.categoryName}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "DMT1" && (
                <Stack flexDirection={"row"} gap={1} mt={4}>
                  <Typography variant="caption">Sender Name : </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.moneyTransferSenderId?.remitterFN}
                    {newRow?.newRow?.moneyTransferSenderId?.remitterLN}{" "}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "DMT1" && (
                <Stack flexDirection={"row"} gap={1}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.moneyTransferSenderId?.remitterMobile}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "DMT1" && (
                <Stack flexDirection={"row"} gap={1}>
                  <Typography variant="caption"> Service Type: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.productName}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "Aadhaar Pay" && (
                <Stack flexDirection={"row"} gap={1} mt={2}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.mobileNumber}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "AEPS" && (
                <Stack flexDirection={"row"} gap={1} mt={2}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.mobileNumber}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "BILL PAYMENT" && (
                <Stack flexDirection={"row"} gap={1} top={10}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.mobileNumber}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "LOAN" && (
                <Stack flexDirection={"row"} gap={1} top={10}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.mobileNumber}
                  </Typography>
                </Stack>
              )}

              {newRow?.newRow?.categoryName == "withdraw" && (
                <Stack flexDirection={"row"} gap={1} top={10}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.mobileNumber}
                  </Typography>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "Balance Inquiry" && (
                <Stack flexDirection={"row"} gap={1} top={10}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.newRow?.mobileNumber}
                  </Typography>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">PAYMENT RECEIPT</Typography>
            </Grid>
            <Grid item xs={10} sm={4}>
              <Logo />
              <Typography variant="body2">
                TRX Date : {fDateTime(newRow?.newRow?.createdAt)}
              </Typography>
              {newRow?.newRow?.categoryName == "MONEY TRANSFER" && (
                <Stack>
                  <Typography variant="subtitle1">
                    Benificary Details
                  </Typography>

                  <Stack flexDirection={"row"}>
                    <Typography variant="body2">
                      {" "}
                      Account Holder Name:{" "}
                    </Typography>
                    <Typography variant="body2">
                      {
                        newRow?.newRow?.moneyTransferBeneficiaryDetails
                          ?.beneName
                      }
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Bank Name: </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.operator?.key3}
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Account Number: </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.operator?.key1}
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> IFSC : </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.operator?.key2}
                    </Typography>
                  </Stack>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "DMT2" && (
                <Stack>
                  <Typography variant="subtitle1">
                    Benificary Details
                  </Typography>

                  <Stack flexDirection={"row"}>
                    <Typography variant="body2">
                      {" "}
                      Account Holder Name:{" "}
                    </Typography>
                    <Typography variant="body2">
                      {
                        newRow?.newRow?.moneyTransferBeneficiaryDetails
                          ?.beneName
                      }
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Bank Name: </Typography>
                    <Typography variant="body2">
                      {
                        newRow?.newRow?.moneyTransferBeneficiaryDetails
                          ?.bankName
                      }
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Account Number: </Typography>
                    <Typography variant="body2">
                      {
                        newRow?.newRow?.moneyTransferBeneficiaryDetails
                          ?.accountNumber
                      }
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> IFSC : </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.moneyTransferBeneficiaryDetails?.ifsc}
                    </Typography>
                  </Stack>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "RECHARGES" && (
                <Stack>
                  <Stack flexDirection={"row"}>
                    <Typography variant="body2"> Operator: </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.operator?.key1}
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Mobile Number: </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.operator?.key2}
                    </Typography>
                  </Stack>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "AADHAAR PAY" && (
                <Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Bank Name: </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.operator?.key1}
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Account Number: </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.operator?.key2}
                    </Typography>
                  </Stack>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "AEPS" && (
                <Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Bank Name: </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.operator?.key1}
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Account Number: </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.operator?.key2}
                    </Typography>
                  </Stack>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "withdraw" && (
                <Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Bank Name: </Typography>
                    <Typography variant="body2">
                      {
                        newRow?.newRow?.moneyTransferBeneficiaryDetails
                          ?.bankName
                      }
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Account Number: </Typography>
                    <Typography variant="body2">
                      {
                        newRow?.newRow?.moneyTransferBeneficiaryDetails
                          ?.accountNumber
                      }
                    </Typography>
                  </Stack>
                </Stack>
              )}
              {newRow?.newRow?.categoryName == "Mini Statement" && (
                <Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Bank Name: </Typography>
                    <Typography variant="body2">
                      {
                        newRow?.newRow?.moneyTransferBeneficiaryDetails
                          ?.bankName
                      }
                    </Typography>
                  </Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2"> Account Number: </Typography>
                    <Typography variant="body2">
                      {
                        newRow?.newRow?.moneyTransferBeneficiaryDetails
                          ?.accountNumber
                      }
                    </Typography>
                  </Stack>
                </Stack>
              )}

              {newRow?.newRow?.categoryName == "LOAN" && (
                <Stack>
                  <Stack flexDirection={"row"} gap={1}>
                    <Typography variant="body2">
                      {" "}
                      Loan Applied for :{" "}
                    </Typography>
                    <Typography variant="body2">
                      {newRow?.newRow?.productName}
                    </Typography>
                  </Stack>
                </Stack>
              )}
            </Grid>
          </Grid>
          <Grid>
            <Scrollbar sx={{ maxHeight: 600 }}>
              <Stack sx={{ pr: 2 }}>
                <TableContainer sx={{ overflow: "unset", border: "solid 1px" }}>
                  <Table>
                    <TableRow
                      sx={{
                        borderBottom: (theme) =>
                          `solid 1.5px ${theme.palette.divider}`,
                      }}
                    >
                      <StyledTableCell align="center">
                        <Typography variant="subtitle2">
                          Transaction Id
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="subtitle2">Service</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="subtitle2">UTR</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="subtitle2">Status</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="subtitle2">Amount</Typography>
                      </StyledTableCell>
                    </TableRow>

                    <TableBody>
                      <TableRow
                        sx={{
                          borderBottom: (theme) =>
                            `solid 1.5px ${theme.palette.divider}`,
                        }}
                      >
                        <TableCell align="left">
                          <Typography variant="body2" noWrap>
                            {newRow?.newRow?.clientRefId}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" noWrap>
                            {newRow?.newRow?.productName}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography variant="body2" noWrap>
                            {newRow?.newRow?.vendorUtrNumber || "-"}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Label
                            variant="soft"
                            color={
                              (newRow.newRow?.status === "failed" && "error") ||
                              ((newRow.newRow?.status === "pending" ||
                                newRow.newRow?.status === "in_process") &&
                                "warning") ||
                              "success"
                            }
                            sx={{ textTransform: "capitalize" }}
                          >
                            {newRow.newRow?.status
                              ? sentenceCase(newRow?.newRow?.status)
                              : ""}
                          </Label>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" noWrap>
                            Rs.{fIndianCurrency(newRow?.newRow?.amount)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack>
                  <Typography
                    align="left"
                    variant="body2"
                    whiteSpace={"nowrap"}
                  >
                    Transaction Amount :{" "}
                    {" " + fIndianCurrency(newRow?.newRow?.amount)}
                  </Typography>
                  <Typography
                    align="left"
                    variant="body2"
                    whiteSpace={"nowrap"}
                  >
                    Agent Convienience Fee:{" "}
                    <TextField
                      variant="standard"
                      size="small"
                      value={textFieldValue}
                      onChange={handleTextFieldChange}
                    />
                  </Typography>
                  <Grid item xs={12} md={9}>
                    <Typography variant="caption">
                      The convienience fee charged is the sole responsibility of
                      the Agent. Tramo assumes no libiility for the imposition
                      of this fee and any associated consequences or issues
                      arising from its application rest entirely with the Agent{" "}
                    </Typography>
                  </Grid>
                  <Typography
                    align="left"
                    variant="body1"
                    whiteSpace={"nowrap"}
                  >
                    Total Amount:
                    {`${+textFieldValue + +newRow?.newRow?.amount}`}
                  </Typography>
                </Stack>
                <Typography variant="subtitle2">NOTES</Typography>
                <Grid container>
                  <Grid item xs={12} md={9}>
                    <Typography variant="caption">
                      This transaction receipt is generated automatically and
                      dose not require a physical signature. It is not a tax
                      invoice but serves as a record of your transaction with
                      Tramo. Please retain it for your refrence, and if you have
                      any queries, fell free to contact our Customer Support
                      team.
                    </Typography>
                    <Typography>
                      <Stack
                        flexDirection={{ xs: "column", sm: "row" }}
                        sx={{
                          color: "white",
                          bgcolor: "darkblue",
                          pt: 1,
                          pb: 1,
                        }}
                        justifyContent="space-between"
                      >
                        <Typography variant="caption">
                          Helpline Numbers +
                          {process.env.REACT_APP_COMPANY_MOBILE} ,{" "}
                          {process.env.REACT_APP_COMPANY_MOBILEOTHER}
                        </Typography>
                        <Typography variant="caption">
                          Timings : 08:00AM to 10:00 PM (Mon-Sun)
                        </Typography>
                        <Typography variant="caption">
                          Email : {process.env.react_app_company_email}
                        </Typography>
                      </Stack>
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Scrollbar>
          </Grid>
          <Divider
            variant="fullWidth"
            style={{ borderWidth: "2px", borderStyle: "dashed " }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default CustomTransactionSlip;
