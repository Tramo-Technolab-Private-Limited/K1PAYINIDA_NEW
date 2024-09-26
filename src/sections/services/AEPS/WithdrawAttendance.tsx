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
import { fDateTime } from "src/utils/formatTime";
import { fetchLocation } from "src/utils/fetchLocation";
import { CaptureDevice } from "src/utils/CaptureDevice";
import MotionModal from "src/components/animate/MotionModal";

// ----------------------------------------------------------------------

type FormValuesProps = {
  deviceName: string;
  remark: string;
  AEPS: string;
  AP: string;
};

export default function WithdrawAttendance(props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, UpdateUserDetail, initialize, Api } = useAuthContext();
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
    deviceName: "",
    remark: `Attendance, ${fDateTime(new Date())}`,
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

  //   ********************************jquery start here for capture device ***************************

  const Attendence = async () => {
    handleOpen();
    let { error, success }: any = await CaptureDevice(getValues("deviceName"));
    if (!success) {
      enqueueSnackbar(error);
      setMessage(error);
      handleClose();
      return;
    }
    try {
      let token = localStorage.getItem("token");
      let body = {
        attendanceType: "TRANSACTIONAL",
        serviceType: props.attendance,
        latitude: localStorage.getItem("lat"),
        longitude: localStorage.getItem("long"),
        requestRemarks: getValues("remark"),
        nationalBankIdentificationNumber: "",
        captureResponse: success,
      };
      await Api("aeps/presence", "POST", body, token).then((Response: any) => {
        console.log("==============>>>fatch beneficiary Response", Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.data.message);
            props.handleCloseAttendance();
            setMessage(Response.data.message);
          } else if (Response.data.responseCode == 410) {
            enqueueSnackbar(Response.data.err.message, { variant: "error" });
            setMessage(Response.data.responseMessage);
          } else {
            enqueueSnackbar(Response.data.data.message, { variant: "error" });
            setMessage(Response.data.data.message);
          }
          handleClose();
        } else {
          handleClose();
        }
      });
    } catch (error) {
      if (error.code == 1) {
        enqueueSnackbar(`${error.message} !`, { variant: "error" });
      }
      handleClose();
    }
  };

  return (
    <>
      <Helmet>
        <title>AEPS Attendance | {process.env.REACT_APP_COMPANY_NAME}</title>
      </Helmet>
      <FormProvider methods={methods} onSubmit={handleSubmit(Attendence)}>
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
            Please mark the attendance to use{" "}
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
          <RHFTextField
            name="remark"
            label="Remark"
            placeholder="Remark"
            disabled
            variant="filled"
            sx={{ width: "90%", margin: "auto" }}
          />
          <Stack
            flexDirection={"row"}
            gap={1}
            sx={{ width: "90%", margin: "auto" }}
          >
            <Button variant="contained" type="submit">
              Scan fingure to continue
            </Button>
            <Button
              variant="contained"
              onClick={() => props.handleCloseAttendance()}
            >
              Cancel
            </Button>
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
    </>
  );
}

// ----------------------------------------------------------------------
