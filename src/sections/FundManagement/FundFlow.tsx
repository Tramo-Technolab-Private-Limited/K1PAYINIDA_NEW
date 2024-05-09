import { useEffect, useState } from "react";
import {
  Stack,
  MenuItem,
  Grid,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Card,
  Button,
} from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";

import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "src/auth/useAuthContext";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import ConfirmDialog from "src/components/confirm-dialog/ConfirmDialog";
import TransactionModal from "src/components/customFunctions/TrasactionModal";
import { CustomAvatar } from "src/components/custom-avatar";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { TableHeadCustom, TableNoData } from "src/components/table";
import useCopyToClipboard from "src/hooks/useCopyToClipboard";
import { fDateTime } from "src/utils/formatTime";
import Iconify from "src/components/iconify";
import Label from "src/components/label/Label";
import { sentenceCase } from "change-case";
import { useNavigate } from "react-router";
import { fCurrency, fIndianCurrency } from "src/utils/formatNumber";
import { fetchLocation } from "src/utils/fetchLocation";

type FormValuesProps = {
  transactionType: string;
  User: string;
  searchby: string;
  userDetail: {
    firstName: string;
    lastName: string;
    _id: string;
  };
  reason: string;
  amount: string;
  remarks: string;
};

type childProps = {
  userDetail?: any;
  from?: string;
  parentHandleClose?: any;
};

function FundFlow({ userDetail, from, parentHandleClose }: childProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, initialize, Api } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUser, setFilteredUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [isTxnOpen, setIsTxnOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sdata, setSdata] = useState([]);
  const [pageSize, setPageSize] = useState<any>(10000);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageCount, setPageCount] = useState<any>(0);
  const [Loading, setLoading] = useState(false);
  const [transactionDetail, setTransactionDetail] = useState([
    {
      status: "",
      createdAt: "",
      amount: "",
    },
  ]);

  //confirm modal
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenDetails = () => setOpenConfirm(true);
  const handleCloseDetails = () => {
    setOpenConfirm(false);
    parentHandleClose();
    reset(defaultValues);
  };

  const FilterSchema = Yup.object().shape({
    transactionType: Yup.string().required("Transaction Type is required"),
    User: Yup.string().required("Please Select User"),
    userDetail: Yup.object().shape({
      firstName: Yup.string(),
      lastName: Yup.string(),
      _id: Yup.string().required("Please select user"),
    }),
    reason: Yup.string().required("Reason is required"),
    amount: Yup.string().required("Reason is required"),
    remarks: Yup.string().required("Reason is required"),
  });

  const defaultValues = {
    transactionType: "",
    User: "",
    searchby: "",
    userDetail: {
      firstName: "",
      lastName: "",
      _id: "",
    },
    reason: "",
    amount: "",
    remarks: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FilterSchema),
    defaultValues,
    mode: "all",
  });

  const {
    reset,
    resetField,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  useEffect(() => {
    searchUsers();
    getTransaction();
  }, []);

  useEffect(() => {
    setValue("userDetail", userDetail);
    setValue("User", `${userDetail?.firstName} ${userDetail?.lastName}`);
  }, [userDetail]);

  useEffect(() => {
    setFilteredUser(
      users.filter((item: any) => {
        if (
          item.firstName
            .toLowerCase()
            .startsWith(getValues("User").toLowerCase()) ||
          item.email
            .toLowerCase()
            .startsWith(getValues("User").toLowerCase()) ||
          item.userCode
            .toLowerCase()
            .startsWith(getValues("User").toLowerCase())
        ) {
          return item;
        }
      })
    );
  }, [watch("User")]);

  useEffect(() => {
    !from && resetField("User");
    resetField("searchby");
    !from && resetField("userDetail");
    resetField("amount");
    resetField("reason");
    resetField("remarks");
  }, [watch("transactionType")]);

  const searchUsers = () => {
    let token = localStorage.getItem("token");
    let body = {
      filter: {
        userName: "",
        userCode: "",
        email: "",
        mobile: "",
      },
    };
    Api(
      `agent/get_All_${
        user?.role == "m_distributor" ? "Distributor" : "Agents"
      }?page=${currentPage}&limit=${pageSize}`,
      "POST",
      body,
      token
    ).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setUsers(Response.data.data);
        }
      }
    });
  };

  const getTransaction = () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    let body = {
      pageInitData: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
    };
    Api(`transaction/fund_flow_transaction`, "POST", body, token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setSdata(Response.data.data.data);
            setPageCount(Response.data.data.totalNumberOfRecords);
          } else {
            enqueueSnackbar(Response.data.message, { variant: "error" });
          }
          setLoading(false);
        } else {
          enqueueSnackbar("Failed", { variant: "error" });
          setLoading(false);
        }
      }
    );
  };

  const onSubmit = (data: FormValuesProps) => {
    console.log(data);
    handleOpenDetails();
  };

  const confirmTransaction = async () => {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    try {
      let body = {
        transaction_type: getValues("transactionType"),
        userId: getValues("userDetail._id"),
        amount: getValues("amount"),
        reason: getValues("reason"),
        remarks: getValues("remarks"),
      };

      await fetchLocation();
      await Api(`agent/v2/downline_fund_flow`, "POST", body, token).then(
        (Response: any) => {
          console.log(Response);
          if (Response.status == 200) {
            if (Response.data.code == 200) {
              enqueueSnackbar(Response.data.message);
              initialize();
              setTransactionDetail([
                {
                  status: "success",
                  createdAt: Response.data.data.createdAt,
                  amount: Response.data.data.from.amount,
                },
              ]);
              setIsLoading(false);
              setIsTxnOpen(true);
              handleCloseDetails();
            } else {
              enqueueSnackbar(Response.data.message, { variant: "error" });
              setErrorMsg(Response.data.message);
              setIsTxnOpen(true);
              handleCloseDetails();
              setIsLoading(false);
            }
            setIsTxnOpen(true);
            handleCloseDetails();
            setIsLoading(false);
          } else {
            setTransactionDetail([
              {
                status: "failed",
                createdAt: Response.data.data.createdAt,
                amount: Response.data.data.from.amount,
              },
            ]);
            setIsLoading(false);
            setErrorMsg("Failed");
            enqueueSnackbar("failed", { variant: "error" });
          }
        }
      );
    } catch (error) {
      if (error.code == 1) {
        enqueueSnackbar(`${error.message} !`, { variant: "error" });
      }
    }
  };
  return (
    <>
      <RoleBasedGuard hasContent roles={["distributor", "m_distributor"]}>
        <Grid display={"grid"} m={1}>
          <Typography variant="h3">Fund Flow</Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid
              display={"grid"}
              gridTemplateColumns={{
                md: "repeat(1, 1fr)",
                sm: "repeat(1, 0.5fr)",
                xs: "repeat(1, 1fr,)",
              }}
              gap={1}
            >
              <RHFSelect
                name="transactionType"
                label="Transaction Type"
                placeholder="transaction Type"
                SelectProps={{
                  native: false,
                  sx: { textTransform: "capitalize" },
                }}
              >
                <MenuItem value={"Credit"}>Credit</MenuItem>
                <MenuItem value={"Debit"}>Debit</MenuItem>
              </RHFSelect>
              {/* <RHFSelect
                name="searchby"
                label="search by"
                placeholder="search by"
                SelectProps={{
                  native: false,
                  sx: { textTransform: "capitalize" },
                }}
              >
                <MenuItem value={"Email"}>Email</MenuItem>
                <MenuItem value={"Username"}>User name</MenuItem>
                <MenuItem value={"Usercode"}>User code</MenuItem>
              </RHFSelect> */}

              <Stack sx={{ position: "relative", minWidth: "200px" }}>
                <RHFTextField
                  fullWidth
                  name="User"
                  disabled={!!from}
                  variant={!!from ? "filled" : "outlined"}
                  placeholder={"Search user by Email, User Code & First Name"}
                />
                {filteredUser.length > 0 && watch("User").length > 0 && (
                  <Stack
                    sx={{
                      position: "absolute",
                      top: 40,
                      zIndex: 9999,
                      width: "100%",
                      bgcolor: "white",
                      border: "1px solid grey",
                      borderRadius: 2,
                    }}
                  >
                    <Scrollbar sx={{ maxHeight: 200 }}>
                      {filteredUser.map((item: any) => {
                        return (
                          <Stack
                            flexDirection={"row"}
                            gap={1}
                            sx={{
                              p: 1,
                              cursor: "pointer",
                              color: "grey",
                              "&:hover": { color: "black" },
                            }}
                            onClick={() => {
                              setValue("userDetail", item);
                              setValue(
                                "User",
                                `${item?.firstName} ${item?.lastName}`
                              );
                              setFilteredUser([]);
                            }}
                          >
                            <CustomAvatar
                              src={item?.selfie[0]}
                              alt={item?.firstName}
                              name={item?.firstName}
                            />
                            <Stack>
                              <Typography variant="body2">
                                {item.firstName} {item.lastName} (
                                {item.userCode})
                              </Typography>{" "}
                              <Typography variant="body2">
                                {item.email}
                              </Typography>{" "}
                              <Typography variant="body2">
                                Main :{" "}
                                {fIndianCurrency(item.main_wallet_amount) || 0}{" "}
                                / AEPS :{" "}
                                {fIndianCurrency(item.AEPS_wallet_amount) || 0}
                              </Typography>{" "}
                            </Stack>
                          </Stack>
                        );
                      })}
                    </Scrollbar>
                  </Stack>
                )}
              </Stack>

              <RHFTextField
                name="reason"
                label="Reasons"
                placeholder="Reasons"
              />
              <RHFTextField
                name="remarks"
                label="Remarks"
                placeholder="Remarks"
              />
              <RHFTextField
                type="number"
                name="amount"
                label="Amount"
                placeholder="Amount"
              />
            </Grid>
            <LoadingButton
              variant="contained"
              sx={{ my: 2 }}
              type="submit"
              disabled={!isValid}
            >
              Proceed
            </LoadingButton>
            <ConfirmDialog
              open={openConfirm}
              onClose={handleCloseDetails}
              title="Fund Transfer Confirmation"
              content={`Are you sure to Transfer Rs.${getValues("amount")} ${
                getValues("transactionType") == "Debit"
                  ? `from ${getValues("userDetail.firstName")} ${getValues(
                      "userDetail.lastName"
                    )} to ${user?.firstName} ${user?.lastName}`
                  : `from ${user?.firstName} ${user?.lastName} to ${getValues(
                      "userDetail.firstName"
                    )} ${getValues("userDetail.lastName")}`
              } `}
              action={
                <LoadingButton
                  variant="contained"
                  color="error"
                  loading={isLoading}
                  onClick={confirmTransaction}
                >
                  Sure
                </LoadingButton>
              }
            />
          </FormProvider>
        </Grid>

        <TransactionModal
          isTxnOpen={isTxnOpen}
          handleTxnModal={() => {
            setIsTxnOpen(false);
            parentHandleClose();
            setErrorMsg("");
          }}
          errorMsg={errorMsg}
          transactionDetail={transactionDetail}
        />
      </RoleBasedGuard>
    </>
  );
}

export default FundFlow;
