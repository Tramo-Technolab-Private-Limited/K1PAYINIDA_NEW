import { useEffect, useState } from "react";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
// @mui
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputAdornment,
  Modal,
  Box,
  Button,
  Typography,
  Stack,
  FormHelperText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFTextField,
  RHFCodes,
  RHFSecureCodes,
} from "../../../components/hook-form";
import { useSnackbar } from "notistack";
import { Icon } from "@iconify/react";
import { convertToWords } from "src/components/customFunctions/ToWords";
import { useAuthContext } from "src/auth/useAuthContext";
import { fDate, fDateTime } from "src/utils/formatTime";
import { TextToSpeak } from "src/components/customFunctions/TextToSpeak";
import TransactionModal from "src/components/customFunctions/TrasactionModal";
import MotionModal from "src/components/animate/MotionModal";
import Label from "src/components/label/Label";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { sentenceCase } from "change-case";
import { fetchLocation } from "src/utils/fetchLocation";

// ----------------------------------------------------------------------

type FormValuesProps = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
  payAmount: string;
};

//--------------------------------------------------------------------

export default function Transferpay({
  remitter,
  beneficiary,
  isOpen,
  handleTxnClose,
}: any) {
  console.log("..............................beny", beneficiary, remitter);

  const { Api } = useAuthContext();
  const { availableLimitForUpiTransfer } = remitter;
  const { bankName, accountNumber, mobileNumber, beneName, upiAddress } =
    beneficiary;
  const { enqueueSnackbar } = useSnackbar();
  const { initialize } = useAuthContext();
  // const [mode, setMode] = useState("IMPS");
  const [errorMsg, setErrorMsg] = useState("");

  const [isTxnOpen, setIsTxnOpen] = useState(false);
  const [transactionDetail, setTransactionDetail] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  //success Modal
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#ffffff",
    boxShadow: 24,
    p: 4,
  };

  const TransferSchema = Yup.object().shape({
    otp1: Yup.string().required(),
    otp2: Yup.string().required(),
    otp3: Yup.string().required(),
    otp4: Yup.string().required(),
    otp5: Yup.string().required(),
    otp6: Yup.string().required(),
    payAmount: Yup.string()
      .required("Amount is required field")
      .test(
        "is-greater-than-100",
        "Amount should be greater than 100",
        (value: any) => +value > 99
      )
      .test(
        "is-multiple-of-100",
        "Amount must be a multiple of 100",
        (value: any) => (+value > 5000 ? Number(value) % 100 === 0 : value)
      )
      .test(
        "is-less-than-max",
        "Limit Exceed ! available limit is " + availableLimitForUpiTransfer,
        (value: any) => (+value > availableLimitForUpiTransfer ? false : true)
      ),
  });
  const defaultValues = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
    payAmount: "",
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(TransferSchema),
    defaultValues,
    mode: "all",
  });
  const {
    reset,
    setError,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const transaction = async (data: FormValuesProps) => {
    let token = localStorage.getItem("token");

    console.log(
      "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
      beneficiary
    );

    let body = {
      beneficiaryId: beneficiary._id,
      amount: data.payAmount,
      remitterId: remitter._id,
      // mode: mode,

      nPin:
        data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6,
    };
    await fetchLocation();
    await Api("app/transfer/transaction", "POST", body, token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            Response.data.response.map((element: any) => {
              enqueueSnackbar(element.message);
              TextToSpeak(sentenceCase(element.message));
            });

            handleClose();
            handleOpen1();
            setErrorMsg("");
            initialize();
            setTransactionDetail(
              Response.data.response.map((item: any) => item.data)
            );
          } else {
            enqueueSnackbar(Response.data.message, { variant: "error" });
            setErrorMsg(Response.data.message);
          }
          handleClose();
          setIsTxnOpen(true);
        } else {
          enqueueSnackbar(Response, { variant: "error" });
        }
      }
    );
  };

  const onsubmit = () => {};

  return (
    <>
      <MotionModal open={isOpen} width={{ xs: "95%", sm: 400 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onsubmit)}>
          <Stack justifyContent={"space-between"} mb={2}>
            <Stack gap={1}>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography variant="subtitle2">Beneficiary Name</Typography>
                <Typography variant="subtitle2">{beneName}</Typography>
              </Stack>

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography variant="subtitle2">UPI ID</Typography>
                <Typography variant="subtitle2">{upiAddress}</Typography>
              </Stack>
            </Stack>

            <RHFTextField
              sx={{ marginTop: "20px", maxWidth: "500px" }}
              aria-autocomplete="none"
              name="payAmount"
              type="number"
              label="Enter Amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />
            <Typography variant="caption">
              {convertToWords(+watch("payAmount"))}
            </Typography>

            <Stack flexDirection={"row"} gap={1}>
              <Button
                onClick={() => {
                  handleTxnClose();
                  handleOpen();
                }}
                variant="contained"
                sx={{ mt: 1 }}
                disabled={
                  !(+watch("payAmount") > 99 ? true : false) ||
                  !(+watch("payAmount") > availableLimitForUpiTransfer
                    ? false
                    : true)
                }
              >
                Pay Now
              </Button>
              <Button
                onClick={() => {
                  handleTxnClose();
                }}
                variant="contained"
                sx={{ mt: 1 }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </MotionModal>

      <MotionModal open={open} width={{ xs: "95%", sm: 500 }}>
        <Typography variant="h4" textAlign={"center"}>
          Confirm Details
        </Typography>
        <Stack flexDirection={"row"} justifyContent={"space-between"} mt={2}>
          <Typography variant="subtitle1">Beneficiary Name</Typography>
          <Typography variant="body1">{beneName}</Typography>
        </Stack>

        <Stack flexDirection={"row"} justifyContent={"space-between"} mt={2}>
          <Typography variant="subtitle1"> UPI ID</Typography>
          <Typography variant="body1">{upiAddress}</Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"} mt={2}>
          <Typography variant="subtitle1">Mobile Number</Typography>
          <Typography variant="body1">{mobileNumber || "-"}</Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"} mt={2}>
          <Typography variant="subtitle1">Transaction Amount</Typography>
          <Typography variant="body1">₹{getValues("payAmount")}</Typography>
        </Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(transaction)}>
          <Stack
            alignItems={"center"}
            justifyContent={"space-between"}
            mt={2}
            gap={2}
          >
            <Typography variant="h4">Confirm TPIN</Typography>
            <RHFSecureCodes
              keyName="otp"
              inputs={["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"]}
            />

            {(!!errors.otp1 ||
              !!errors.otp2 ||
              !!errors.otp3 ||
              !!errors.otp4 ||
              !!errors.otp5 ||
              !!errors.otp6) && (
              <FormHelperText error sx={{ px: 2 }}>
                Code is required
              </FormHelperText>
            )}
            <Stack flexDirection={"row"} gap={1} mt={2}>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isSubmitting}
              >
                Continue
              </LoadingButton>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </MotionModal>

      {/* <MotionModal open={open1} width={{ xs: "95%", md: 720 }}>
        <Scrollbar
          sx={{
            maxWidth: 720,
            border: "1.5px dashed #000000",
            borderRadius: 2,
          }}
        >
          <Stack p={1}>
            <Table
              stickyHeader
              aria-label="sticky table"
              style={{ borderBottom: "1px solid #dadada" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                    Client ref Id
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                    UTR
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                    Created At
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                    Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                    Mode
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, textAlign: "center" }}>
                    status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionDetail.map((item: any) => (
                  <TableRow key={item.data._id}>
                    <TableCell sx={{ fontWeight: 800 }}>
                      {item.data.clientRefId || "NA"}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      <Typography noWrap>
                        {item?.data?.vendorUtrNumber}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      <Typography width={100}>
                        {fDateTime(item?.data?.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      {item.data.amount && "₹"} {item.data.amount || "NA"}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      {item.data.modeOfPayment || "NA"}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>
                      <Label
                        color={
                          (item.data.status === "failed" && "error") ||
                          ((item.data.status === "pending" ||
                            item.data.status === "in_process" ||
                            item.data.status === "hold") &&
                            "warning") ||
                          "success"
                        }
                      >
                        {item.data.status || "NA"}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Stack>
        </Scrollbar>
        <Stack flexDirection={"row"} gap={1} mt={1} justifyContent={"center"}>
          <Button variant="contained" onClick={handleClose1}>
            Close
          </Button>
        </Stack>
      </MotionModal> */}

      <MotionModal open={open1} width={{ xs: "95%", md: 720 }}>
        <Stack flexDirection={"row"} gap={1} mt={1} justifyContent={"center"}>
          <TransactionModal
            isTxnOpen={open1}
            handleTxnModal={() => {
              setOpen1(false);
              setErrorMsg("");
            }}
            errorMsg={errorMsg}
            transactionDetail={transactionDetail}
          />
        </Stack>
      </MotionModal>
    </>
  );
}

// ----------------------------------------------------------------------
