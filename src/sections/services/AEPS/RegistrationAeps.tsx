import { useEffect, useState } from "react";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import React from "react";
import { Icon } from "@iconify/react";

// @mui
import {
  Box,
  Button,
  Stack,
  Typography,
  MenuItem,
  Modal,
  FormHelperText,
  useTheme,
  Card,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, {
  RHFTextField,
  RHFCodes,
  RHFSelect,
} from "../../../components/hook-form";
import { useSnackbar } from "notistack";
import Lottie from "lottie-react";
import fingerScan from "../../../components/JsonAnimations/fingerprint-scan.json";
import { useAuthContext } from "src/auth/useAuthContext";
import { fetchLocation } from "src/utils/fetchLocation";

// ----------------------------------------------------------------------

type FormValuesProps = {
  otp: string;
  state: string;
  bankName: string;
  deviceName: string;
  remark: string;
  alternateMobileNumber: string;
  aadharCityName: string;
  aadharDistrictName: string;
  shopCityName: string;
  shopDistrict: string;
  shopAddress: string;
  merchantAddress2: string;
  merchantAddress1: string;
};

export default function RegistrationAeps(props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, UpdateUserDetail, Api } = useAuthContext();
  const theme = useTheme();
  const [otpVerify, setOtpVerify] = useState(false);
  const [encodeFPTxnId, setEncodeFPTxnId] = useState("");
  const [primaryKey, setPrimaryKey] = useState("");
  const [indState, setIndState] = useState([]);
  const [arrofObj, setarrofObj] = useState<any>([]);

  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Loading Screen
  const [openLoading, setOpenLoading] = React.useState(false);
  const handleOpenLoading = () => setOpenLoading(true);
  const handleCloseLoading = () => {
    setOpenLoading(false);
    setarrofObj([]);
  };

  //registration Validation
  const registrationSchema = Yup.object().shape({
    merchantAddress1: Yup.string()
      .required("Merchant address 1 is required")
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Only alphabets, numbers, and spaces are allowed"
      ),
    merchantAddress2: Yup.string()
      .required("Merchant address 2 is required")
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Only alphabets, numbers, and spaces are allowed"
      ),
    shopAddress: Yup.string()
      .required("Shop address is required")
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Only alphabets, numbers, and spaces are allowed"
      ),
    alternateMobileNumber: Yup.string()
      .required("Alternate Mobile Number is required")
      .matches(
        /^[0-9]{10}$/,
        "Alternate Mobile Number must be exactly 10 digits"
      ),
    aadharCityName: Yup.string()
      .required("Aadhar City Name is required")
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Only alphabets, numbers, and spaces are allowed"
      ),
    aadharDistrictName: Yup.string()
      .required("Aadhar District Name is required")
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Only alphabets, numbers, and spaces are allowed"
      ),
    shopCityName: Yup.string()
      .required("Shop City Name is required")
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Only alphabets, numbers, and spaces are allowed"
      ),
    shopDistrict: Yup.string()
      .required("Shop District Name is required")
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Only alphabets, numbers, and spaces are allowed"
      ),
  });
  const defaultValues = {
    merchantAddress1: "",
    merchantAddress2: "",
    state: "",
    alternateMobileNumber: "",
    aadharCityName: "",
    aadharDistrictName: "",
    shopAddress: "",
    shopCityName: "",
    shopDistrict: "",
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(registrationSchema),
    defaultValues,
    mode: "all",
  });
  const {
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  //sendotp Validation
  const sendOtpSchema = Yup.object().shape({
    deviceName: Yup.string().required("Please Select Device"),
  });
  const defaultValuesOtp = {
    deviceName: "",
  };
  const methodsOtp = useForm<FormValuesProps>({
    resolver: yupResolver(sendOtpSchema),
    defaultValues: defaultValuesOtp,
  });
  const {
    getValues: getValuesOtp,
    handleSubmit: handleSubmitOtp,
    formState: { isSubmitting: isSubmittingOtp },
  } = methodsOtp;

  const alternateMobileNumber = watch("alternateMobileNumber");
  const isAlternateMobileNumberValid =
    !errors.alternateMobileNumber && alternateMobileNumber?.length === 10;

  const aadharCityName = watch("aadharCityName");
  const aadharDistrictName = watch("aadharDistrictName");
  const shopCityName = watch("shopCityName");
  const shopDistrict = watch("shopDistrict");

  //VerifyOtp Validation
  const VerifyOtpSchema = Yup.object().shape({
    otp: Yup.string().required("code is required"),
  });
  const VerifyOtpDefaultValues = {
    otp: "",
    remark: "",
  };
  const VerifyOtpmethods = useForm<FormValuesProps>({
    resolver: yupResolver(VerifyOtpSchema),
    defaultValues: VerifyOtpDefaultValues,
  });
  const {
    reset: resetOtpVerify,
    handleSubmit: VerifyOtpHandleSubmit,
    formState: { errors: VerifyOtpErrors, isSubmitting: VerifyOtpIsSubmitting },
  } = VerifyOtpmethods;

  useEffect(() => {
    fetchLocation();
    getState();
  }, []);

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

  const getState = () => {
    let token = localStorage.getItem("token");
    Api("indoNepal/get/Statelist", "GET", "", token).then((Response: any) => {
      console.log("==============>>>fatch beneficiary Response", Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          let sortState: any = Response.data.data.sort((a: any, b: any) => {
            if (a.state < b.state) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });
          setIndState(sortState);
          console.log(
            "==============>>> fatch beneficiary data 200",
            Response.data.data
          );
        } else {
          enqueueSnackbar(Response.data.message, { variant: "error" });
          console.log(
            "==============>>> fatch beneficiary message",
            Response.data.message
          );
        }
      }
    });
  };

  const registerMerchant = async (data: FormValuesProps) => {
    try {
      let token = localStorage.getItem("token");
      let body = {
        merchantAddress1: data.merchantAddress1,
        merchantAddress2: data.merchantAddress2,
        shopState: data.state,
        merchantState: data.state,
        alternateMobileNumber: data.alternateMobileNumber,
        merchantCityName: data.aadharCityName,
        merchantDistrictName: data.aadharDistrictName,
        shopCity: data.shopCityName,
        shopAddress: data.shopAddress,
        shopDistrict: data.shopDistrict,
        Latitude: localStorage.getItem("lat"),
        Longitude: localStorage.getItem("long"),
      };
      await Api("aeps/aeps_acc", "POST", body, token).then((Response: any) => {
        console.log("==============>>>fatch beneficiary Response", Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            UpdateUserDetail({
              fingPayAPESRegistrationStatus: true,
              main_wallet_amount: user?.main_wallet_amount - 0,
            });
          } else {
            enqueueSnackbar(Response.data.message, { variant: "error" });
          }
        }
      });
    } catch (error) {
      if (error.code == 1) {
        enqueueSnackbar(`${error.message} !`, { variant: "error" });
      }
    }
  };

  const sendOtp = async () => {
    try {
      let token = localStorage.getItem("token");
      let location: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      let body = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      await Api("aeps/aeps_otp", "POST", body, token).then((Response: any) => {
        if (Response.data.code == 200) {
          if (Response.data.data.status == true) {
            enqueueSnackbar(Response.data.data.message);
            setPrimaryKey(Response.data.data.data.primaryKeyId);
            setEncodeFPTxnId(Response.data.data.data.encodeFPTxnId);
            handleOpen();
          }
        } else {
          enqueueSnackbar(Response.data.data.message, { variant: "error" });
          console.log(
            "==============>>> fatch beneficiary message",
            Response.data.message
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const resendOtp = () => {
    let token = localStorage.getItem("token");
    let id = user?._id;
    let body = {
      merchantLoginId: id,
      primaryKeyId: primaryKey,
      encodeFPTxnId: encodeFPTxnId,
    };
    Api("aeps/aeps_resend_otp", "POST", body, token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          enqueueSnackbar(Response.data.message);
        } else {
          enqueueSnackbar(Response.data.message, { variant: "error" });
        }
      }
    });
  };

  const verifyOtpToMerchant = async (data: FormValuesProps) => {
    let token = localStorage.getItem("token");
    let id = user?._id;
    try {
      let body = {
        merchantLoginId: id,
        otp: data.otp,
        primaryKeyId: primaryKey,
        encodeFPTxnId: encodeFPTxnId,
      };
      await Api("aeps/aeps_otp_verify", "POST", body, token).then(
        (Response: any) => {
          console.log("==============>>>fatch beneficiary Response", Response);
          if (Response.data.code == 200) {
            if (Response.data.data.status) {
              enqueueSnackbar(Response.data.message);
              reset(defaultValues);
              merchantKYC();
            }
          } else {
            enqueueSnackbar(Response.data.message, { variant: "error" });
          }
        }
      );
    } catch (error) {
      if (error.code == 1) {
        enqueueSnackbar(`${error.message} !`, { variant: "error" });
      }
    }
  };

  const merchantKYC = async () => {
    handleOpenLoading();
    let { error, success }: any = await CaptureDevice(
      getValuesOtp("deviceName")
    );
    if (!success) {
      enqueueSnackbar(error);
      handleClose();
      handleCloseLoading();
    }

    try {
      let token = localStorage.getItem("token");
      let body = {
        merchantLoginId: user?._id,
        nationalBankIdentificationNumber: "",
        requestRemarks: getValues("remark"),
        primaryKeyId: primaryKey,
        encodeFPTxnId: encodeFPTxnId,
        captureResponse: success,
      };
      await fetchLocation();
      await Api("aeps/bio_ekyc", "POST", body, token).then((Response: any) => {
        console.log("==============>>>fatch beneficiary Response", Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.data.message);
            if (Response.data.data.status == true) {
              UpdateUserDetail({ fingPayAEPSKycStatus: true });
            }
            handleClose();
            handleCloseLoading();
          } else {
            resetOtpVerify(VerifyOtpDefaultValues);
            handleClose();
            handleCloseLoading();
            console.log(
              "==============>>> fatch beneficiary message",
              Response.data.message
            );
          }
        }
      });
    } catch (error) {
      if (error.code == 1) {
        enqueueSnackbar(`${error.message} !`, { variant: "error" });
      }
    }
  };

  function getRDServiceUrl(deviceName: any) {
    var rdUrl = "";
    if (deviceName == "MANTRA") {
      rdUrl = "http://127.0.0.1:11100/rd/capture";
    } else if (deviceName == "MORPHO") {
      rdUrl = "http://127.0.0.1:11100/capture";
    } else if (deviceName == "MORPHO L1") {
      rdUrl = "http://127.0.0.1:11101/capture";
    } else if (deviceName == "STARTEK") {
      rdUrl = "http://127.0.0.1:11100/rd/capture";
    } else if (deviceName == "SECUGEN") {
      rdUrl = "http://127.0.0.1:11100/rd/capture";
    }
    return rdUrl;
  }

  function xmlToJson(xml: any): any {
    var obj: any = {};

    if (xml.nodeType === 1) {
      // Element node
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      // Text node
      obj = xml.nodeValue.trim();
    }

    // Children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item: any = xml.childNodes.item(i);
        var nodeName: any = item.nodeName;

        if (typeof obj[nodeName] === "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push === "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  }

  const CaptureDevice = async (val: any) => {
    return new Promise((resolve, reject) => {
      try {
        const rdUrl = getRDServiceUrl(val);
        if (rdUrl == "") {
          resolve({ error: "Device Not Set!", success: false });
        }

        var xhr: any;
        var ActiveXObject: any;
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
          xhr = new XMLHttpRequest();
        }

        xhr.open("CAPTURE", rdUrl, true);
        xhr.setRequestHeader("Content-Type", "text/xml");
        xhr.setRequestHeader("Accept", "text/xml");

        xhr.open("CAPTURE", rdUrl, true);
        xhr.setRequestHeader("Content-Type", "text/xml");
        // xhr.setRequestHeader('Accept', 'text/xml');
        if (!xhr) {
          resolve({ error: "CORS not supported!!", success: false });
        }

        xhr.onreadystatechange = async function () {
          if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status == 200) {
              console.log("status", status);
              let xhrR = xhr.response;
              let parser = new DOMParser();
              var xmlDoc = parser.parseFromString(xhrR, "text/xml");
              let xml = parser.parseFromString(xhrR, "application/xml");
              var pidContent = xml.getElementsByTagName("PidData")[0];
              var responseCode: any = pidContent
                .getElementsByTagName("Resp")[0]
                .getAttribute("errCode");
              var errInfo: any = pidContent
                .getElementsByTagName("Resp")[0]
                .getAttribute("errInfo");

              if (responseCode == 0) {
                var jsonResult = xmlToJson(xmlDoc);
                console.log(jsonResult);
                resolve({
                  error: false,
                  success: {
                    errCode:
                      jsonResult.PidData.Resp["@attributes"].errCode || "",
                    errInfo:
                      jsonResult?.PidData.Resp["@attributes"].errInfo || "",
                    fCount:
                      jsonResult?.PidData.Resp["@attributes"].fCount || "",
                    fType: jsonResult?.PidData.Resp["@attributes"].fType || "",
                    iCount:
                      jsonResult?.PidData.Resp["@attributes"].iCount || "0",
                    iType: null,
                    pCount:
                      jsonResult?.PidData.Resp["@attributes"].pCount || "0",
                    pType: "0",
                    nmPoints:
                      jsonResult?.PidData.Resp["@attributes"].nmPoints || "",
                    qScore:
                      jsonResult?.PidData.Resp["@attributes"].qScore || "",
                    dpID:
                      jsonResult?.PidData.DeviceInfo["@attributes"].dpId || "",
                    rdsID:
                      jsonResult?.PidData.DeviceInfo["@attributes"].rdsId || "",
                    rdsVer:
                      jsonResult?.PidData.DeviceInfo["@attributes"].rdsVer ||
                      "",
                    dc: jsonResult?.PidData.DeviceInfo["@attributes"].dc || "",
                    mi: jsonResult?.PidData.DeviceInfo["@attributes"].mi || "",
                    mc: jsonResult?.PidData.DeviceInfo["@attributes"].mc || "",
                    ci: jsonResult?.PidData.Skey["@attributes"].ci || "",
                    sessionKey: jsonResult?.PidData.Skey["#text"] || "",
                    hmac: jsonResult?.PidData.Hmac["#text"] || "",
                    PidDatatype:
                      jsonResult?.PidData.Data["@attributes"].type || "",
                    Piddata: jsonResult?.PidData.Data["#text"] || "",
                    srno:
                      val == "MORPHO"
                        ? jsonResult?.PidData?.DeviceInfo?.additional_info
                            ?.Param["@attributes"]?.value
                        : val == "MANTRA"
                        ? jsonResult?.PidData?.DeviceInfo?.additional_info
                            ?.Param[0]["@attributes"]?.value
                        : jsonResult?.PidData?.additional_info?.Param[0][
                            "@attributes"
                          ]?.value || "",
                    sysid:
                      val == "MORPHO"
                        ? ""
                        : val == "MANTRA"
                        ? jsonResult?.PidData?.DeviceInfo?.additional_info
                            ?.Param[1]["@attributes"]?.value
                        : jsonResult?.PidData?.additional_info?.Param[1][
                            "@attributes"
                          ]?.value,
                  },
                });
              } else {
                resolve({ error: errInfo, success: false });
              }
            }
          }
        };
        xhr.onerror = function () {
          resolve({ error: "Check If Morpho Service/Utility is Running" });
        };
        xhr.send(
          '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="20000" posh="UNKNOWN" env="P" wadh="E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc="/> <CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>'
        );
      } catch (err) {
        resolve({ error: err.message, success: false });
      }
    });
  };

  return (
    <>
      {!user?.fingPayAPESRegistrationStatus && !user?.fingPayAEPSKycStatus ? (
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(registerMerchant)}
        >
          <Stack
            width={{ sm: "90%", md: "60%" }}
            margin={"auto"}
            border={"1px solid #dadada"}
            borderRadius={"10px"}
            textAlign={"center"}
            boxShadow={`0.1px 0.2px 22px ${theme.palette.primary.main}36`}
            py={5}
            gap={2}
            justifyContent={"center"}
          >
            <Typography variant="h4">
              Hi wait, Please register yourself first.
            </Typography>
            <Card sx={{ p: 1, margin: "auto" }}>
              <Typography variant="subtitle1">Aadhaar Detail</Typography>
              <Stack gap={1}>
                <RHFTextField
                  name="merchantAddress1"
                  label="Merchant Address 1"
                  placeholder="Merchant Address 1"
                  sx={{ width: "250px", margin: "auto" }}
                />
                <RHFTextField
                  name="merchantAddress2"
                  label="Merchant Address 2"
                  placeholder="Merchant Address 2"
                  sx={{ width: "250px", margin: "auto" }}
                />
                <RHFTextField
                  name="aadharCityName"
                  label="Aadhar City Name"
                  placeholder="Aadhar City Name"
                  sx={{ width: "250px", margin: "auto" }}
                />
                <RHFTextField
                  name="aadharDistrictName"
                  label="Aadhar District Name"
                  placeholder="Aadhar District Name"
                  sx={{ width: "250px", margin: "auto" }}
                />
              </Stack>
            </Card>
            <Card sx={{ p: 1, margin: "auto" }}>
              <Typography variant="subtitle1">Shop Detail</Typography>
              <Stack gap={1}>
                {" "}
                <RHFTextField
                  name="shopAddress"
                  label="Shop Address "
                  placeholder="Shop Address "
                  sx={{ width: "250px", margin: "auto" }}
                />
                <RHFTextField
                  name="alternateMobileNumber"
                  label="Alternate Mobile Number"
                  placeholder="Alternate Mobile Number"
                  type="number"
                  sx={{ width: "250px", margin: "auto" }}
                />
                <RHFTextField
                  name="shopCityName"
                  label="Shop City "
                  placeholder="Shop City "
                  sx={{ width: "250px", margin: "auto" }}
                />
                <RHFTextField
                  name="shopDistrict"
                  label="Shop District"
                  placeholder="Shop District"
                  sx={{ width: "250px", margin: "auto" }}
                />
                <RHFSelect
                  name="state"
                  label="Select State"
                  placeholder="Select State"
                  SelectProps={{
                    native: false,
                    sx: { textTransform: "capitalize" },
                  }}
                  sx={{ width: "250px", margin: "auto" }}
                >
                  {indState.map((item: any) => {
                    return (
                      <MenuItem key={item._id} value={item.stateId}>
                        {item.state}
                      </MenuItem>
                    );
                  })}
                </RHFSelect>
              </Stack>
            </Card>

            {watch("state") && isAlternateMobileNumberValid && (
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{ width: "fit-content", margin: "auto" }}
                loading={isSubmitting}
              >
                Register Now
              </LoadingButton>
            )}
          </Stack>
        </FormProvider>
      ) : user?.fingPayAPESRegistrationStatus && !user?.fingPayAEPSKycStatus ? (
        <FormProvider methods={methodsOtp} onSubmit={handleSubmitOtp(sendOtp)}>
          <Stack
            width={{ sm: "90%", md: "60%" }}
            margin={"auto"}
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
              Plaese submit documents for KYC{" "}
            </Typography>
            <RHFSelect
              name="deviceName"
              label="Select Device"
              placeholder="Select Device"
              SelectProps={{
                native: false,
                sx: { textTransform: "capitalize" },
              }}
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
              sx={{ width: "90%", margin: "auto" }}
            />
            <Stack>
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{ width: "fit-content", margin: "auto" }}
                loading={isSubmittingOtp}
              >
                Send OTP & Fetch Document
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      ) : null}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormProvider
          methods={VerifyOtpmethods}
          onSubmit={VerifyOtpHandleSubmit(verifyOtpToMerchant)}
        >
          <Box
            sx={style}
            style={{ borderRadius: "20px" }}
            width={{ xs: "100%", md: 370 }}
          >
            <Stack spacing={3}>
              <Typography variant="subtitle2" textAlign={"center"}>
                Mobile Verification Code &nbsp;
              </Typography>
              <RHFTextField name="otp" label="OTP" placeholder="OTP" />

              <Stack>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={VerifyOtpIsSubmitting}
                  sx={{ width: "fit-content", margin: "auto" }}
                >
                  Submit
                </LoadingButton>
              </Stack>
              <Stack justifyContent={"end"} flexDirection={"row"}>
                <Button size="small" onClick={resendOtp}>
                  Resend OTP?
                </Button>
              </Stack>
            </Stack>
          </Box>
        </FormProvider>
      </Modal>
      {/* Loading Modal */}
      <Modal
        open={openLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ borderRadius: "20px" }} width={"fit-content"}>
          <Lottie animationData={fingerScan} />
        </Box>
      </Modal>
    </>
  );
}

// ----------------------------------------------------------------------
