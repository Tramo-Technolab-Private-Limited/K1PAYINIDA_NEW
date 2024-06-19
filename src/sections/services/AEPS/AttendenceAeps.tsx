import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import React from "react";

// @mui
import {
  Box,
  Button,
  Stack,
  Typography,
  MenuItem,
  Modal,
  useTheme,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFTextField,
  RHFSelect,
} from "../../../components/hook-form";
import { useSnackbar } from "notistack";
import Lottie from "lottie-react";
import fingerScan from "../../../components/JsonAnimations/fingerprint-scan.json";
import { useAuthContext } from "src/auth/useAuthContext";
import { Navigate, useNavigate } from "react-router";
import { fDateTime } from "src/utils/formatTime";
import { CaptureDevice } from "src/utils/CaptureDevice";
import { fetchLocation } from "src/utils/fetchLocation";
import MotionModal from "src/components/animate/MotionModal";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

type FormValuesProps = {
  deviceName: string;
  remark: string;
  AEPS: string;
  AP: string;
};

export default function AttendenceAeps(props: any) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user, Api, initialize } = useAuthContext();
  const [scanLoading, setScanLoading] = useState(false);
  const theme = useTheme();
  const [message, setMessage] = useState("");
  const [arrofObj, setarrofObj] = useState<any>([]);

  //Loading Screen
  const [openLoading, setOpenLoading] = React.useState(false);
  const handleOpenLoading = () => setOpenLoading(true);
  const handleCloseLoading = () => setOpenLoading(false);

  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setarrofObj([]);
    setMessage("");
  };

  const AEPSSchema = Yup.object().shape({
    deviceName: Yup.string().required("Please Select Device"),
    remark: Yup.string(),
  });

  const defaultValues = {
    adhaar: "",
    remark: `Daily Attendance`,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(AEPSSchema),
    defaultValues,
  });

  const {
    reset,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "#ffffff",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (arrofObj.length > 0) {
      // Attendence();
    }
  }, [arrofObj.length]);

  //   ********************************jquery start here for capture device ***************************

  const attendance = async (data: FormValuesProps) => {
    handleOpen();
    const { error, success }: any = await CaptureDevice(data.deviceName);
    console.log("capture response", error, success);
    handleClose();
    if (!success) {
      enqueueSnackbar(error);
      setMessage(error);
      handleOpen();
      return;
    }
    try {
      let token = localStorage.getItem("token");
      let body = {
        attendanceType: "DAILY",
        serviceType: props.attendance,
        latitude: localStorage.getItem("lat"),
        longitude: localStorage.getItem("long"),
        requestRemarks: getValues("remark"),
        nationalBankIdentificationNumber: "",
        captureResponse: success,
      };
      await fetchLocation();
      await Api("aeps/presence", "POST", body, token).then((Response: any) => {
        console.log("==============>>>fatch beneficiary Response", Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.data.message);
            initialize();

            setMessage(Response.data.message);
          } else if (Response.data.responseCode == 410) {
            enqueueSnackbar(Response.data.err.message, { variant: "error" });
            setMessage(Response.data.responseMessage);
            handleOpen();
          } else {
            enqueueSnackbar(Response.data.data.message, { variant: "error" });
            setMessage(Response.data.data.message);
            handleOpen();
          }
        } else {
          setMessage("Failed");
        }
      });
    } catch (error) {
      if (error.code == 1) {
        enqueueSnackbar(`${error.message} !`, { variant: "error" });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>AEPS Attendance | {process.env.REACT_APP_COMPANY_NAME}</title>
      </Helmet>
      <FormProvider methods={methods} onSubmit={handleSubmit(attendance)}>
        <Stack
          width={{ xs: "100%", sm: 450 }}
          margin={"auto"}
          bgcolor={"#fff"}
          border={"1px solid #dadada"}
          borderRadius={"10px"}
          textAlign={"center"}
          boxShadow={`0.1px 0.2px 22px ${theme.palette.primary.main}36`}
          py={5}
          gap={2}
          justifyContent={"center"}
        >
          <Typography variant="h4">
            {" "}
            Plaese mark the attendance to use{" "}
            {props.attendance == "AEPS" ? "AEPS" : "Aadhar Pay"}{" "}
          </Typography>
          <RHFSelect
            name="deviceName"
            label="Select Device"
            placeholder="Select Device"
            SelectProps={{ native: false, sx: { textTransform: "capitalize" } }}
            sx={{ width: "90%", margin: "auto" }}
          >
            <MenuItem value={"MORPHO"}>MORPHO</MenuItem>
            <MenuItem value={"MORPHO L1"}>MORPHO L1</MenuItem>
            <MenuItem value={"STARTEK"}>STARTEK</MenuItem>
            <MenuItem value={"MANTRA"}>MANTRA</MenuItem>
            <MenuItem value={"SECUGEN"}>SECUGEN</MenuItem>
          </RHFSelect>

          <Stack>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isSubmitting}
              sx={{ width: "fit-content", margin: "auto" }}
            >
              Scan fingure to continue
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>

      <MotionModal open={open} width={{ xs: "95%", md: 500 }}>
        {isSubmitting && <Lottie animationData={fingerScan} />}
        {message && (
          <>
            <Stack flexDirection={"column"} alignItems={"center"}>
              <Typography variant="h4">Attendance Status</Typography>
            </Stack>
            <Typography variant="h4" textAlign={"center"} color={"#9e9e9ef0"}>
              {message}
            </Typography>
            <Stack flexDirection={"row"} justifyContent={"center"}>
              <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </Stack>
          </>
        )}
      </MotionModal>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!message ? (
          <Box
            sx={style}
            style={{ borderRadius: "20px" }}
            width={"fit-content"}
          >
            <Lottie animationData={fingerScan} />
          </Box>
        ) : (
          <Box
            sx={style}
            style={{ borderRadius: "20px" }}
            width={{ xs: "100%", sm: 400 }}
          >
            <Stack flexDirection={"column"} alignItems={"center"}>
              <Typography variant="h3">Attendence Status</Typography>
            </Stack>
            <Typography variant="h4" textAlign={"center"} color={"#9e9e9ef0"}>
              {message}
            </Typography>
            <Stack flexDirection={"row"} justifyContent={"center"}>
              <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </Stack>
          </Box>
        )}
      </Modal> */}

      {/* Loading Modal */}
      {/* <Modal
        open={openLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ borderRadius: "20px" }} width={"fit-content"}>
          <Stack justifyContent={"center"} flexDirection={"row"}>
            <Icon
              icon="eos-icons:three-dots-loading"
              fontSize={100}
              color={theme.palette.primary.main}
            />
          </Stack>
        </Box>
      </Modal> */}
    </>
  );
}

// ----------------------------------------------------------------------
