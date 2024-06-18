import React, { useContext, useEffect, useReducer } from "react";
import { useState } from "react";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

// @mui
import {
  Grid,
  Modal,
  Card,
  Box,
  Table,
  Button,
  TableBody,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  MenuItem,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
// _mock_
import FormProvider, {
  RHFTextField,
  RHFSelect,
  RHFAutocomplete,
} from "../../../components/hook-form";
import { useSnackbar } from "notistack";
import { RemitterContext } from "./Transfer";
import Transferpay from "./Transferpay";
import ApiDataLoading from "../../../components/customFunctions/ApiDataLoading";
import { useAuthContext } from "src/auth/useAuthContext";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import useResponsive from "src/hooks/useResponsive";
import { fetchLocation } from "src/utils/fetchLocation";
// ----------------------------------------------------------------------

type FormValuesProps = {
  bankName: string;
  beneName: string;
  accountNumber: string;
  ifsc: string;
  mobileNumber: string;
  email: string;
  remitterRelation: string;
  isBeneVerified: boolean;
  bankId: string;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
};

//--------------------------------------------------------------------

const initialgetBene = {
  isLoading: true,
  data: [],
};

const initialRemitterVerify = {
  isLoading: false,
  data: {},
  beneVerified: false,
};

const initialAddBene = {
  isLoading: false,
  data: {},
};

const initialgetBank = {
  isLoading: false,
  data: {},
};

const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case "VERIFY_FETCH_REQUEST":
      return { ...state, isLoading: true };
    case "VERIFY_FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        beneVerified: true,
      };
    case "VERIFY_FETCH_FAILURE":
      return { ...state, isLoading: false, data: {}, beneVerified: false };
    case "GET_BENE_REQUEST":
      return { ...state, isLoading: true };
    case "GET_BENE_SUCCESS":
      return { ...state, data: action.payload, isLoading: false };
    case "GET_BENE_FAILURE":
      return { ...state, isLoading: false, data: [] };
    case "ADD_BENE_REQUEST":
      return { ...state, isLoading: true };
    case "ADD_BENE_SUCCESS":
      return { ...state, data: action.payload, isLoading: false };
    case "ADD_BENE_FAILURE":
      return { ...state, isLoading: false, data: [] };
    case "ADD_BANK_REQUEST":
      return { ...state, isLoading: true };
    case "ADD_BANK_SUCCESS":
      return { ...state, data: action.payload, isLoading: false };
    case "ADD_BANK_FAILURE":
      return { ...state, isLoading: false, data: [] };
    default:
      return state;
  }
};

export default function Transferbeneficiary() {
  const { user, UpdateUserDetail, Api } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useResponsive("up", "sm");
  const remitterContext: any = useContext(RemitterContext);
  const [tempData, setTempData] = useState<any>();
  const [filteredData, setFilteredData] = useState([]);

  const [addNewBeneLoading, setAddNewBeneLoading] = useState(false);

  const [remitterVerify, remitterVerifyDispatch] = useReducer(
    Reducer,
    initialRemitterVerify
  );
  const [addBene, addbeneDispatch] = useReducer(Reducer, initialAddBene);
  const [getBene, getbeneDispatch] = useReducer(Reducer, initialgetBene);
  const [getBank, getBankDispatch] = useReducer(Reducer, initialgetBank);
  useEffect(() => {
    const data = getBene?.data?.filter((row: any) => {
      const searchTerm = tempData?.toLowerCase();
      return (
        row?.beneName?.toLowerCase()?.includes(searchTerm) ||
        row?.mobilenumber?.toLowerCase()?.includes(searchTerm) ||
        row?.accountnumber?.toLowerCase()?.includes(searchTerm) ||
        row?.ifsc?.toLowerCase()?.includes(searchTerm) ||
        row?.bankName?.toLowerCase()?.includes(searchTerm)
      );
    });
    setFilteredData(data);
  }, [tempData]);

  const handleSearch = (e: any) => {
    setTempData(e);
  };

  //modal for add Beneficiary
  const [open, setModalEdit] = React.useState(false);
  const openEditModal = () => setModalEdit(true);
  const handleClose = () => {
    remitterVerifyDispatch({ type: "VERIFY_FETCH_FAILURE" });
    setModalEdit(false);
    reset(defaultValues);
  };

  const [isOpen, setIsOpen] = useState(false);

  const [payoutData, setPayoutData] = React.useState({
    bankName: "",
    accountNumber: "",
    mobileNumber: "",
    rayzorpayBeneId: "",
    tramoBeneId: "",
    _id: "",
  });

  const DMTSchema = Yup.object().shape({
    ifsc: Yup.string().required("IFSC code is required"),
    // accountNumber: Yup.string().required("Account Number is required"),
    // bankName: Yup.string().required("Bank Name is required"),
    beneName: Yup.string().required("Beneficiary Name is required"),
    remitterRelation: Yup.string().required("Relation is required"),
  });
  const defaultValues = {
    bankName: "",
    beneName: "",
    accountNumber: "",
    ifsc: "",
    mobileNumber: "",
    email: "",
    remitterRelation: "",
    isBeneVerified: false,
    bankId: "",
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(DMTSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const {
    reset,
    watch,
    setValue,
    getValues,
    trigger,
    handleSubmit,
    formState: {},
  } = methods;

  useEffect(() => {
    fatchBeneficiary(remitterContext.remitterMobile);
  }, [remitterContext]);

  useEffect(() => {
    setValue("mobileNumber", getValues("mobileNumber").slice(0, 10));
    getValues("mobileNumber").length > 0 && trigger("mobileNumber");
  }, [watch("mobileNumber")]);

  const fatchBeneficiary = (val: any) => {
    let token = localStorage.getItem("token");
    getbeneDispatch({ type: "GET_BENE_REQUEST" });
    Api("app/transfer/beneficiary/" + val, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            getbeneDispatch({
              type: "GET_BENE_SUCCESS",
              payload: Response.data.data,
            });
          } else {
            getbeneDispatch({ type: "GET_BENE_FAILURE" });
            enqueueSnackbar(Response.data.message, { variant: "error" });
          }
        } else {
          getbeneDispatch({ type: "GET_BENE_FAILURE" });
        }
      }
    );
  };

  const getBankList = () => {
    getBankDispatch({ type: "ADD_BANK_REQUEST" });
    let token = localStorage.getItem("token");
    Api("bankManagement/get_bank", "GET", "", token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          getBankDispatch({
            type: "ADD_BANK_SUCCESS",
            payload: Response.data.data.filter((item: any) => {
              if (item.ekoBankId) {
                return item;
              }
            }),
          });
          openEditModal();
          // enqueueSnackbar(Response.data.message);
        } else {
          getbeneDispatch({ type: "GET_BANK_FAILURE" });
        }
      }
    });
  };

  const verifyBene = async () => {
    remitterVerifyDispatch({ type: "VERIFY_FETCH_REQUEST" });
    let token = localStorage.getItem("token");
    let body = {
      upiAddress: getValues("ifsc"),
      // accountNumber: getValues("accountNumber"),
      // bankName: getValues("bankName"),

      remitterMobile: remitterContext.remitterMobile,
    };
    await fetchLocation();
    (await trigger(["ifsc", "accountNumber", "bankName"]))
      ? await Api("app/transfer/beneficiary/verify", "POST", body, token).then(
          (Response: any) => {
            if (Response.status == 200) {
              if (Response.data.code == 200) {
                remitterVerifyDispatch({
                  type: "VERIFY_FETCH_SUCCESS",
                  payload: Response.data.data,
                });
                enqueueSnackbar(Response.data.message);
                setValue("beneName", Response.data.name);
                setValue("isBeneVerified", true);
                UpdateUserDetail({
                  main_wallet_amount: user?.main_wallet_amount - 3,
                });
              } else {
                remitterVerifyDispatch({ type: "VERIFY_FETCH_FAILURE" });
                enqueueSnackbar(Response.data.message, { variant: "error" });
              }
            } else {
              remitterVerifyDispatch({ type: "VERIFY_FETCH_FAILURE" });
              enqueueSnackbar("Failed", { variant: "error" });
            }
          }
        )
      : remitterVerifyDispatch({ type: "VERIFY_FETCH_FAILURE" });
  };

  const addBeneficiary = async (data: FormValuesProps) => {
    addbeneDispatch({ type: "ADD_BENE_REQUEST" });
    try {
      let token = localStorage.getItem("token");
      let body = {
        remitterMobile: remitterContext.remitterMobile,
        beneficiaryName: data.beneName,
        upiAddress: data.ifsc,
        // accountNumber: data.accountNumber,
        beneficiaryMobile: data.mobileNumber,
        beneficiaryEmail: data.email,
        relationship: data.remitterRelation,
        // bankName: data.bankName,
        isBeneVerified: data.isBeneVerified,
        bankId: data.bankId,
      };
      await fetchLocation();
      await Api("app/transfer/beneficiary", "POST", body, token).then(
        (Response: any) => {
          if (Response.status == 200) {
            if (Response.data.code == 200) {
              enqueueSnackbar(Response.data.message);

              console.log(
                ",,,,,,,,,,,,,,,,,,,,,,,,,,vvvvvvvvvvvvvvvvvvvvvv",
                Response
              );

              getbeneDispatch({
                type: "GET_BENE_SUCCESS",
                payload: [...getBene.data, Response.data.data],
              });
              addbeneDispatch({
                type: "ADD_BENE_SUCCESS",
                payload: Response.data.data,
              });
              remitterVerifyDispatch({
                type: "VERIFY_FETCH_FAILURE",
              });
              enqueueSnackbar(Response.data.message);
              handleClose();
            } else {
              addbeneDispatch({ type: "ADD_BENE_FAILURE" });
              enqueueSnackbar(Response.data.message, { variant: "error" });
            }
          } else {
            enqueueSnackbar("Internal server error", { variant: "error" });
            addbeneDispatch({ type: "ADD_BENE_FAILURE" });
          }
        }
      );
    } catch (error) {
      if (error.code == 1) {
        enqueueSnackbar(`${error.message} !`, { variant: "error" });
      }
    }
  };

  function deleteBene(val: any) {
    getbeneDispatch({
      type: "GET_BENE_SUCCESS",
      payload: getBene.data.filter((item: any) => {
        return item._id !== val;
      }),
    });
  }

  function setBankDetail(event: any, value: any) {
    setValue("bankName", value?.bankName);
    setValue("ifsc", value?.masterIFSC);
    setValue("bankId", value?.ekoBankId);
  }
  return (
    <>
      <Grid>
        {getBene.isLoading ? (
          <ApiDataLoading />
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              mb={1}
              mt={1}
            >
              <TextField
                value={tempData}
                onChange={(e) => handleSearch(e.target.value)}
                label="Search by"
              />
              <LoadingButton
                variant="contained"
                size="medium"
                onClick={getBankList}
                loading={getBank.isLoading}
              >
                <span style={{ paddingRight: "5px", fontSize: "14px" }}>
                  +{" "}
                </span>{" "}
                Add New Beneficiary
              </LoadingButton>
            </Stack>
            <TableContainer component={Paper}>
              <Scrollbar
                sx={
                  isMobile
                    ? { maxHeight: window.innerHeight - 170 }
                    : { maxHeight: window.innerHeight - 470 }
                }
              >
                <Table
                  size="small"
                  stickyHeader
                  aria-label="sticky table"
                  style={{ borderBottom: "1px solid #dadada" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800 }}>
                        Beneficiary Name
                      </TableCell>

                      <TableCell sx={{ fontWeight: 800 }}>UPI ID</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>
                        Mobile Number
                      </TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>
                        Verification
                      </TableCell>
                      <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(tempData?.length ? filteredData : getBene?.data).map(
                      (row: any) => (
                        <BeneList
                          key={row._id}
                          row={row}
                          callback={setPayoutData}
                          remitterNumber={remitterContext.remitterMobile}
                          deleteBene={deleteBene}
                          pay={() => setIsOpen(true)}
                        />
                      )
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </Paper>
        )}
      </Grid>
      <Transferpay
        isOpen={isOpen}
        handleTxnClose={() => setIsOpen(false)}
        remitter={remitterContext}
        beneficiary={payoutData}
      />

      {/* modal for add beneficiary */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          item
          xs={12}
          md={8}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          width={{ xs: "95%", md: 500 }}
        >
          <Card sx={{ p: 3 }}>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(addBeneficiary)}
            >
              <Box
                rowGap={{ xs: 2, sm: 3 }}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                {/* <RHFAutocomplete
                  name="bank"
                  disabled={remitterVerify?.beneVerified}
                  onChange={setBankDetail}
                  options={getBank?.data}
                  noOptionsText="No Bank Account"
                  getOptionLabel={(option: any) => option?.bankName}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option?.bankName}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <RHFTextField
                      name="bankName"
                      label="Bank Name"
                      {...params}
                      variant={
                        remitterVerify?.beneVerified ? "filled" : "outlined"
                      }
                    />
                  )}
                /> */}

                <RHFTextField
                  name="ifsc"
                  label="UPI ID"
                  placeholder="UPI ID"
                  disabled={remitterVerify?.beneVerified}
                  variant={remitterVerify?.beneVerified ? "filled" : "outlined"}
                  InputLabelProps={{ shrink: true }}
                />
                {/* <RHFTextField
                  name="accountNumber"
                  label="Account Number"
                  placeholder="Account Number"
                  disabled={remitterVerify?.beneVerified}
                  variant={remitterVerify?.beneVerified ? "filled" : "outlined"}
                  InputLabelProps={{ shrink: true }}
                /> */}
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"row"}
                >
                  <LoadingButton
                    variant="contained"
                    size="small"
                    onClick={verifyBene}
                    disabled={remitterVerify?.beneVerified}
                    loading={remitterVerify?.isLoading}
                  >
                    verify UPI Detail
                  </LoadingButton>
                </Stack>
                <RHFTextField
                  name="beneName"
                  label="Beneficiary Name"
                  placeholder="Beneficiary Name"
                  disabled={remitterVerify?.beneVerified}
                  variant={remitterVerify?.beneVerified ? "filled" : "outlined"}
                />
                <RHFSelect
                  name="remitterRelation"
                  label="Relation"
                  placeholder="Relation"
                  SelectProps={{
                    native: false,
                    sx: { textTransform: "capitalize" },
                  }}
                >
                  <MenuItem value="Husband/Wife">Husband/Wife</MenuItem>
                  <MenuItem value="Brother/Sister">Brother/Sister</MenuItem>
                  <MenuItem value="Mother/Father">Mother/Father</MenuItem>
                  <MenuItem value="Son/Daughter">Son/Daughter</MenuItem>
                  <MenuItem value="Aunt/Uncle">Aunt/Uncle</MenuItem>
                  <MenuItem value="Niece/Nephew">Niece/Nephew</MenuItem>
                  <MenuItem value="Friends">Friends</MenuItem>
                  <MenuItem value="Self">Self</MenuItem>
                  <MenuItem value="Other">other</MenuItem>
                </RHFSelect>
                <Divider />
                <Divider />
                <RHFTextField
                  name="mobileNumber"
                  label="Mobile Number (Optional)"
                  type="number"
                />
                <RHFTextField
                  name="email"
                  type="email"
                  label="Email (Optional)"
                />
              </Box>
              <Stack flexDirection={"row"} gap={2} mt={2}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={addBene.isLoading}
                >
                  Add Beneficiary
                </LoadingButton>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Stack>
            </FormProvider>
          </Card>
        </Grid>
      </Modal>
    </>
  );
}

// ----------------------------------------------------------------------

const BeneList = React.memo(
  ({ row, callback, remitterNumber, deleteBene, pay }: any) => {
    const { user, UpdateUserDetail, Api } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [cell, setCell] = useState(row);
    const [deleteOtp, setDeleteOtp] = useState("");
    const [varifyStatus, setVarifyStatus] = useState(true);
    const [count, setCount] = useState(0);
    const [toPay, setToPay] = useState("");

    const [open2, setModalEdit2] = React.useState(false);
    const openEditModal2 = (val: any) => {
      setModalEdit2(true);
      deleteBeneficiary(remitterNumber);
    };
    const handleClose2 = () => {
      setModalEdit2(false);
      setDeleteOtp("");
    };

    const verifyBene = async (val: string) => {
      let token = localStorage.getItem("token");
      try {
        let body = {
          beneficiaryId: val,
          remitterMobile: remitterNumber,
        };
        await fetchLocation();
        await Api("app/transfer/beneficiary/verify", "POST", body, token).then(
          (Response: any) => {
            if (Response.status == 200) {
              if (Response.data.code == 200) {
                enqueueSnackbar(Response.data.message);
                setCell({
                  ...cell,
                  isVerified: true,
                  beneName: Response.data.name,
                });
                UpdateUserDetail({
                  main_wallet_amount: user?.main_wallet_amount - 3,
                });
              } else {
                enqueueSnackbar(Response.data.message, { variant: "error" });
              }
              setVarifyStatus(true);
            } else {
              enqueueSnackbar("Internal server error", { variant: "error" });
              setVarifyStatus(true);
            }
          }
        );
      } catch (error) {
        if (error.code == 1) {
          enqueueSnackbar(`${error.message} !`, { variant: "error" });
        }
      }
    };

    const deleteBeneficiary = (val: string) => {
      let token = localStorage.getItem("token");
      Api(
        "app/transfer/beneficiary/delete/sendOtp/" + val,
        "GET",
        "",
        token
      ).then((Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
          } else {
            enqueueSnackbar(Response.data.message, { variant: "error" });
          }
        }
      });
    };
    const confirmDeleteBene = () => {
      setIsLoading(true);
      let token = localStorage.getItem("token");
      let body = {
        remitterMobile: remitterNumber,
        beneficiaryId: row._id,
        otp: deleteOtp,
      };
      Api("app/transfer/beneficiary/delete", "POST", body, token).then(
        (Response: any) => {
          if (Response.status == 200) {
            if (Response.data.code == 200) {
              enqueueSnackbar(Response.data.message);
              handleClose2();
              setDeleteOtp("");
              deleteBene(row._id);
            } else {
              enqueueSnackbar(Response.data.message, { variant: "error" });
            }
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }
      );
    };

    useEffect(() => {
      if (count > 0) {
        const timer = setInterval(() => {
          setCount((prevCount) => prevCount - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [count]);

    function ResendOtp() {
      deleteBeneficiary(remitterNumber);
      setCount(30);
    }

    return (
      <>
        <TableRow hover key={cell._id}>
          <TableCell>{cell.beneName}</TableCell>

          <TableCell>{cell.upiAddress}</TableCell>
          <TableCell>{cell.mobileNumber}</TableCell>

          <TableCell>
            {!cell.isVerified ? (
              <LoadingButton
                sx={{ display: "flex", alignItems: "center", width: "105px" }}
                variant="contained"
                color="warning"
                loading={!varifyStatus}
                onClick={() => {
                  setVarifyStatus(false);
                  verifyBene(cell._id);
                }}
              >
                Verify Now
              </LoadingButton>
            ) : (
              <TableCell style={{ color: "#00AB55" }}>
                <Icon icon="material-symbols:verified" /> Verified
              </TableCell>
            )}
          </TableCell>
          <TableCell>
            <Stack justifyContent={"center"} flexDirection={"row"}>
              <Button
                variant="contained"
                onClick={() => {
                  callback(cell);
                  setToPay(cell._id);
                  pay();
                }}
              >
                Pay
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid
            item
            xs={12}
            md={8}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Card sx={{ p: 3 }}>
              <Stack>
                <TextField
                  type="number"
                  name="deleteotp"
                  label="OTP"
                  value={deleteOtp}
                  onChange={(e) => setDeleteOtp(e.target.value)}
                />
              </Stack>
              {count === 0 ? (
                <Typography
                  variant="subtitle2"
                  onClick={ResendOtp}
                  sx={{
                    width: "fit-content",
                    mt: 2,
                    cursor: "pointer",
                    color: theme.palette.primary.main,
                  }}
                >
                  Resend OTP
                </Typography>
              ) : (
                <Typography
                  variant="subtitle2"
                  sx={{ width: "fit-content", mt: 2 }}
                >
                  Wait {count} sec to resend OTP
                </Typography>
              )}

              <LoadingButton
                variant="contained"
                sx={{ mt: 2 }}
                onClick={confirmDeleteBene}
                loading={isLoading}
              >
                Delete Beneficiary
              </LoadingButton>
              <Button
                variant="contained"
                onClick={handleClose2}
                sx={{ mt: 2, ml: 1 }}
              >
                Close
              </Button>
            </Card>
          </Grid>
        </Modal>
      </>
    );
  }
);