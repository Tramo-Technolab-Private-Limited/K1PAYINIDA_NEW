// @mui
import {
  Typography,
  Stack,
  styled,
  alpha,
  Modal,
  Grid,
  FormHelperText,
} from "@mui/material";
//form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFSecureCodes,
  RHFTextField,
} from "../../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "src/auth/useAuthContext";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { bgGradient } from "src/utils/cssStyles";
import MotionModal from "src/components/animate/MotionModal";
import CustomTransactionSlip from "src/components/customFunctions/CustomTransactionSlip";
import { fIndianCurrency } from "src/utils/formatNumber";

type FormValuesProps = {
  binNumber: string;
  creditCardNumber: string;
  cardHolderName: string;
  customer_email: string;
  customer_mobile: string;
  cardBrand: string;
  amount: string;
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

const HEIGHT = 276;

const StyledRoot = styled("div")(({ theme }) => ({
  position: "relative",
  height: HEIGHT,
  "& .slick-list": {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const StyledCard = styled("div")(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.9),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
  position: "relative",
  height: HEIGHT - 16,
  maxWidth: 450,
  top: 20,
  mt: 2,
  borderRadius: 10,
  padding: theme.spacing(3),
  backgroundRepeat: "no-repeat",
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export default function CreditCardPayment() {
  const { Api } = useAuthContext();
  const [transactionDetail, setTransactionDetail] = useState<any>([]);
  const [errorMsg, setErrorMsg] = useState("");

  //transaction detail modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //confirm modal
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenDetails = () => setOpenConfirm(true);
  const handleCloseDetails = () => {
    setOpenConfirm(false);
    resetField("code1");
    resetField("code2");
    resetField("code3");
    resetField("code4");
    resetField("code5");
    resetField("code6");
  };

  const CreditCardSchema = Yup.object().shape({
    binNumber: Yup.string()
      .typeError("That doesn't look like a Credit Card number")
      .min(6, "Please enter first 6 digit Credit card number")
      .max(6, "Please enter first 6 digit Credit card number")
      .required("A phone number is required"),
    creditCardNumber: Yup.string(),
    cardHolderName: Yup.string(),
    customer_email: Yup.string().email("Please enter valid email"),
    customer_mobile: Yup.string(),
    amount: Yup.string(),
  });

  const CreditCardConfirmPin = Yup.object().shape({
    code1: Yup.string().required(),
    code2: Yup.string().required(),
    code3: Yup.string().required(),
    code4: Yup.string().required(),
    code5: Yup.string().required(),
    code6: Yup.string().required(),
  });

  const { enqueueSnackbar } = useSnackbar();
  const [response, setResponse] = useState({
    _id: "",
    bin: "",
    brand: "",
    country: "",
    countryA2: "",
    bank: "",
    cardType: "",
    level: "",
    issuerPhone: "",
    issuerWebsite: "",
    cardTransfer: null,
    createdAt: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    binNumber: "",
    creditCardNumber: "",
    cardHolderName: "",
    customer_email: "",
    customer_mobile: "",
    amount: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(
      openConfirm ? CreditCardConfirmPin : CreditCardSchema
    ),
    defaultValues,
    mode: "all",
  });

  const {
    reset,
    resetField,
    watch,
    trigger,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    setValue("binNumber", getValues("binNumber").slice(0, 6));
    getValues("binNumber").length > 0 && trigger("binNumber");
    getValues("binNumber").length == 6 && searchCardDetail();
  }, [watch("binNumber")]);

  const searchCardDetail = async () => {
    setIsLoading(true);
    setResponse({
      _id: "",
      bin: "",
      brand: "",
      country: "",
      countryA2: "",
      bank: "",
      cardType: "",
      level: "",
      issuerPhone: "",
      issuerWebsite: "",
      cardTransfer: null,
      createdAt: "",
    });
    let token = localStorage.getItem("token");
    await Api(
      `app/payments/get_bin_data/${getValues("binNumber")}`,
      "GET",
      "",
      token
    ).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setResponse(Response.data.data);
          setValue("cardBrand", Response.data.data.cardBrand);
          enqueueSnackbar(Response.data.message);
        } else {
          enqueueSnackbar(Response.data.message, { variant: "error" });
        }
      }
      enqueueSnackbar("Failed to fetch", { variant: "error" });
      setIsLoading(false);
    });
  };
  const onSubmit = async (data: FormValuesProps) => {
    handleOpenDetails();
  };

  const FinalSubmit = async () => {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    let body = {
      amount: getValues("amount"),
      cardBrand: response.brand,
      creditCardNumber: getValues("creditCardNumber"),
      cardHolderName: getValues("cardHolderName"),
      customer_email: getValues("customer_email"),
      customer_mobile: getValues("customer_mobile"),
      nPin:
        getValues("code1") +
        getValues("code2") +
        getValues("code3") +
        getValues("code4") +
        getValues("code5") +
        getValues("code6"),
    };
    (await trigger(["code1", "code2", "code3", "code4", "code5", "code6"]))
      ? await Api(`app/payments/transaction`, "POST", body, token).then(
          (Response: any) => {
            if (Response.status == 200) {
              if (Response.data.code == 200) {
                enqueueSnackbar(Response.data.message);
                setTransactionDetail([{ ...Response.data.data }]);
                handleOpen();
              } else {
                enqueueSnackbar(Response.data.message, { variant: "error" });
              }
            }
            enqueueSnackbar("Failed", { variant: "error" });
            setIsLoading(false);
          }
        )
      : setIsLoading(false);
  };

  const CustomStack = (key: string, value: string) => {
    return (
      <Stack flexDirection={"row"} justifyContent={"space-between"} mt={2}>
        <Typography variant="subtitle1">{key}</Typography>
        <Typography variant="body1">{value}</Typography>
      </Stack>
    );
  };

  return (
    <Stack sx={{ maxWidth: 500, mt: 2 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          flexDirection={"row"}
          gap={1}
          sx={{ position: "relative", mt: 1 }}
        >
          <RHFTextField
            name="binNumber"
            label="Enter first 6 digit of your Credit Card"
            type="number"
            disabled={!!response.bank}
          />
          {response.bank ? (
            <LoadingButton
              variant="contained"
              onClick={() => {
                reset(defaultValues);
                setResponse({
                  _id: "",
                  bin: "",
                  brand: "",
                  country: "",
                  countryA2: "",
                  bank: "",
                  cardType: "",
                  level: "",
                  issuerPhone: "",
                  issuerWebsite: "",
                  cardTransfer: null,
                  createdAt: "",
                });
              }}
              sx={{ alignSelf: "start" }}
            >
              Clear
            </LoadingButton>
          ) : (
            <LoadingButton
              variant="contained"
              onClick={searchCardDetail}
              loading={isLoading}
              disabled={watch("binNumber").length != 6}
              sx={{ alignSelf: "start" }}
            >
              fetch
            </LoadingButton>
          )}
        </Stack>
        {response?.bank && (
          <React.Fragment>
            <StyledRoot>
              <StyledCard>
                <Stack
                  justifyContent={"space-between"}
                  sx={{
                    maxWidth: 500,
                    height: 300,
                  }}
                >
                  <Stack
                    flexDirection={"row"}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Typography sx={{ typography: "h5" }}>
                      {response?.bank}
                    </Typography>
                    <Typography variant="h6">{response?.brand}</Typography>
                  </Stack>

                  <Stack>
                    <Typography
                      sx={{ typography: "subtitle1", textAlign: "left" }}
                    >
                      {response?.bin}
                    </Typography>
                    <Typography variant="caption" fontStyle={"italic"}>
                      <Typography variant="subtitle1" component={"span"}>
                        {response?.cardType}{" "}
                      </Typography>
                      {response.level && response.level}
                    </Typography>
                  </Stack>
                </Stack>
              </StyledCard>
            </StyledRoot>
            <Stack gap={1} mt={2}>
              <RHFTextField
                name="creditCardNumber"
                label="Credit Card Number"
                type="number"
              />
              <RHFTextField name="cardHolderName" label="Card Holder Name" />
              <RHFTextField
                name="customer_email"
                label="Customer Email"
                type="email"
              />
              <RHFTextField
                name="customer_mobile"
                label="Customer Mobile"
                type="number"
              />
              <RHFTextField name="amount" label="Amount" type="number" />
              <LoadingButton
                variant="contained"
                loading={isSubmitting}
                type="submit"
              >
                {" "}
                Submit
              </LoadingButton>
            </Stack>
          </React.Fragment>
        )}

        <MotionModal open={openConfirm} width={{ md: 500 }}>
          {CustomStack("Card Holder Name", getValues("cardHolderName"))}
          {CustomStack("Card Number", getValues("creditCardNumber"))}
          {CustomStack("Email", getValues("customer_email"))}
          {CustomStack("Number", getValues("customer_mobile"))}
          {CustomStack("Amount", fIndianCurrency(getValues("amount")))}
          <Stack
            alignItems={"center"}
            justifyContent={"space-between"}
            mt={2}
            gap={2}
          >
            <Typography variant="h4">Confirm TPIN</Typography>
            <RHFSecureCodes
              keyName="code"
              inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
            />

            {(!!errors.code1 ||
              !!errors.code2 ||
              !!errors.code3 ||
              !!errors.code4 ||
              !!errors.code5 ||
              !!errors.code6) && (
              <FormHelperText error sx={{ px: 2 }}>
                Code is required
              </FormHelperText>
            )}
          </Stack>
          <Stack flexDirection={"row"} gap={1} mt={2}>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={FinalSubmit}
            >
              Pay Now
            </LoadingButton>
            {!isLoading && (
              <LoadingButton variant="outlined" onClick={handleCloseDetails}>
                Close
              </LoadingButton>
            )}
          </Stack>
        </MotionModal>
      </FormProvider>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Grid
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#ffffff",
              boxShadow: 4,
              p: 2,
              borderRadius: "20px",
              minWidth: { xs: "95%", md: 720 },
            }}
          >
            <Stack>
              <CustomTransactionSlip
                newRow={transactionDetail}
                handleCloseRecipt={handleClose}
              />
            </Stack>
          </Grid>
        </>
      </Modal>
    </Stack>
  );
}
