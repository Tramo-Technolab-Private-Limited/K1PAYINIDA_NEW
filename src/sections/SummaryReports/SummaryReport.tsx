import { useEffect, useState } from "react";
// @mui
import {
  Stack,
  Grid,
  TableHead,
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  tableCellClasses,
  Button,
  Typography,
  Pagination,
  styled,
  MenuItem,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { fDate, fDateFormatForApi, fDateTime } from "src/utils/formatTime";

import ApiDataLoading from "src/components/customFunctions/ApiDataLoading";

import CustomPagination from "src/components/customFunctions/CustomPagination";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { TableHeadCustom, TableNoData } from "src/components/table";
import { RHFSelect, RHFTextField } from "src/components/hook-form";
import FormProvider from "src/components/hook-form/FormProvider";
import { useDateRangePicker } from "src/components/date-range-picker";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useAuthContext } from "src/auth/useAuthContext";
import { CustomAvatar } from "src/components/custom-avatar";
// ----------------------------------------------------------------------

export default function (props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { Api } = useAuthContext();
  const [sdata, setSdata] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [tempData, setTempData] = useState<any>([]);
  const tableLabels = [
    { id: "agentName", label: "Agent Deatils" },
    { id: "agentID", label: "Agent Code/Mobile" },
    { id: "credit", label: "Credit Amount" },
    { id: "debit", label: "Debit Amount" },
    { id: "total", label: " Balance Amount" },
  ];

  type FormValuesProps = {
    transactionType: string;
    phoneNumber: string;
    utrNumber: string;
    amount: string;
    mobile: string;
    userCode: string;
    usersearchby: string;
    User: string;
    status: string;
    Paymentmode: string;
    request_type: string;
    fundRequestId: string;
    startDate: Date | null;
    endDate: Date | null;
  };

  const FilterSchema = Yup.object().shape({
    UserName: Yup.string(),
  });

  const defaultValues = {
    phoneNumber: "",

    amount: "",
    Paymentmode: "",
    status: "",
    request_type: "",
    fundRequestId: "",
    startDate: new Date(),
    endDate: new Date(),
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });

  const {
    resetField,
    reset,

    setValue,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(null, null);

  useEffect(() => {
    getFundReq();
  }, [currentPage]);

  const getFundReq = () => {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    let body = {
      userId: "all",
      page: currentPage,
      limit: pageSize,

      startDate: fDateFormatForApi(getValues("startDate")),
      endDate: fDateFormatForApi(getValues("endDate")),
    };
    Api(`transaction/downline_summary`, "POST", body, token).then(
      (Response: any) => {
        console.log("======FundsRequests All==response=====>", Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setPageCount(Response?.data?.data?.totalNumberOfRecords);
            setSdata(Response?.data?.data?.data);

            console.log(Response?.data?.data?.data);
            setIsLoading(false);
            console.log();
          } else {
            console.log("======getRaisedRequests=======>" + Response);
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
    if (getValues("User")?.length > 2) searchFromUser(getValues("User"));
  }, [watch("User")]);

  useEffect(() => {
    resetField("User");
  }, [watch("usersearchby")]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[300],
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const SearchData = (data: FormValuesProps) => {
    setSdata([]);
    setIsLoading(true);
    let token = localStorage.getItem("token");
    let body = {
      userId: tempData?.[0]?._id,
      page: currentPage,
      limit: pageSize,

      startDate: fDateFormatForApi(getValues("startDate")),
      endDate: fDateFormatForApi(getValues("endDate")),
    };
    Api(`transaction/downline_summary`, "POST", body, token).then(
      (Response: any) => {
        console.log("======Transaction==response=====>" + Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response?.data?.message);
            setPageCount(Response?.data?.data?.totalNumberOfRecords);
            setSdata(Response?.data?.data?.data);
            setIsLoading(false);
            console.log(Response?.data?.data?.data);
          } else {
            console.log("======getRaisedRequests=======>" + Response);
            enqueueSnackbar(Response.data.message, { variant: "error" });
            setIsLoading(false);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  const searchFromUser = (val: string) => {
    let body = {
      searchBy: watch("usersearchby"),
      role: "agent",
      searchInput: val,
      finalStatus: "approved",
    };
    {
      Api(`admin/search_user`, "POST", body, "").then((Response: any) => {
        console.log("======get_CategoryList==response=====>" + Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setUserList(Response.data.data);
          } else {
            console.log("======search_usert=======>" + Response);
          }
        }
      });
    }
  };

  const handdleClear = () => {
    getFundReq();
    onChangeEndDate(null);
    onChangeStartDate(null);
    reset(defaultValues);
  };

  return (
    <>
      <Helmet>
        <title> Transactions |{process.env.REACT_APP_COMPANY_NAME}</title>
      </Helmet>

      <Stack flexDirection={"row"} justifyContent={"end"}></Stack>
      {isLoading ? (
        <ApiDataLoading />
      ) : (
        <Grid item xs={16} md={12} lg={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(SearchData)}>
            <Stack direction="row" gap={1} mt={2} mb={2}>
              <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <DatePicker
                        label="Start date"
                        inputFormat="DD/MM/YYYY"
                        value={watch("startDate")}
                        maxDate={new Date()}
                        onChange={(newValue: any) =>
                          setValue("startDate", newValue)
                        }
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            size={"small"}
                            sx={{ width: 200 }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <DatePicker
                        label="End date"
                        inputFormat="DD/MM/YYYY"
                        value={watch("endDate")}
                        minDate={watch("startDate")}
                        onChange={(newValue: any) =>
                          setValue("endDate", newValue)
                        }
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            size={"small"}
                            sx={{ width: 200 }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
              </Stack>

              <Stack flexDirection={"row"}>
                <RHFSelect
                  fullWidth
                  name="usersearchby"
                  label="User Search By"
                  size="small"
                  placeholder="User Search By"
                  SelectProps={{
                    native: false,
                    sx: {
                      textTransform: "capitalize",
                      mb: "10px",
                      minWidth: 200,
                    },
                  }}
                >
                  <MenuItem value={"userCode"}>User Code</MenuItem>
                  <MenuItem value={"firstName"}>First Name</MenuItem>
                  <MenuItem value={"shopName"}>Shop Name</MenuItem>
                  <MenuItem value={"contact_no"}>Contact Number</MenuItem>
                  <MenuItem value={"email"}>Email</MenuItem>
                </RHFSelect>
                {watch("usersearchby") && (
                  <Stack
                    sx={{ position: "relative", minWidth: "200px", ml: 1 }}
                  >
                    <RHFTextField
                      fullWidth
                      autoComplete="off"
                      name="User"
                      placeholder={"Type here..."}
                    />
                    <Stack
                      sx={{
                        position: "absolute",
                        top: 40,
                        zIndex: 9,
                        width: "100%",
                        bgcolor: "white",
                      }}
                    >
                      <Scrollbar sx={{ maxHeight: 400 }}>
                        {userList.length > 0 &&
                          userList.map((item: any) => {
                            return (
                              <Typography
                                sx={{
                                  p: 1,
                                  cursor: "pointer",
                                  color: "grey",
                                  "&:hover": { color: "black" },
                                }}
                                onClick={() => {
                                  setUserList([]);
                                  setTempData([{ ...item }]);
                                  setValue(
                                    "User",
                                    `${item.firstName} ${item.lastName}`
                                  );
                                }}
                                variant="subtitle2"
                              >
                                {" "}
                                {item.userCode ? (
                                  <>
                                    <Stack flexDirection="row" gap={1}>
                                      <CustomAvatar
                                        name={item.firstName}
                                        alt={item.lastName}
                                        src={item?.selfie && item?.selfie[0]}
                                      />
                                      <Stack mt={1}>
                                        <Typography variant="body2">
                                          {item.firstName} {item.lastName} (
                                          {item.userCode})
                                        </Typography>{" "}
                                      </Stack>
                                    </Stack>
                                  </>
                                ) : (
                                  `${item.firstName} ${item.lastName}`
                                )}
                              </Typography>
                            );
                          })}
                      </Scrollbar>
                    </Stack>
                  </Stack>
                )}
              </Stack>

              <Button variant="contained" type="submit" size="small">
                Search
              </Button>
              <Button variant="contained" onClick={handdleClear} size="small">
                Clear
              </Button>
            </Stack>
          </FormProvider>

          <Scrollbar sx={{ maxHeight: window.innerHeight - 160 }}>
            <Table
              sx={{ minWidth: 720 }}
              aria-label="customized table"
              stickyHeader
            >
              <TableHeadCustom headLabel={tableLabels} />

              {!isLoading && sdata.length > 0 ? (
                <TableBody>
                  {sdata.map((row: any) => (
                    <StyledTableRow
                      key={row._id}
                      role="checkbox"
                      tabIndex={-1}
                      sx={{ borderBottom: "1px solid #dadada" }}
                    >
                      <StyledTableCell>
                        <Stack direction={"row"} gap={1}>
                          <CustomAvatar
                            name={row?.Name}
                            alt={row.Name}
                            src={row?.selfie && row?.selfie[0]}
                          />
                          <Stack>
                            <Typography variant="body1">{row?.Name}</Typography>

                            <Typography variant="subtitle1">
                              {row["Company Name"]}
                            </Typography>
                          </Stack>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction={"row"} gap={1}>
                          <Typography variant="subtitle2">
                            User Code:
                          </Typography>
                          <Typography variant="body2">
                            {row?.userCode}
                          </Typography>
                        </Stack>
                        <Stack direction={"row"} gap={1}>
                          <Typography variant="subtitle2">Mobile:</Typography>
                          <Typography variant="body2">{row?.Mobile}</Typography>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack flexDirection="row" gap={2}>
                          <Typography>Rs.</Typography>

                          <Typography variant="body2" color="error">
                            {row["Credit amount"]}
                          </Typography>
                        </Stack>
                      </StyledTableCell>

                      <StyledTableCell>
                        <Stack flexDirection="row" gap={2}>
                          <Typography>Rs.</Typography>

                          <Typography variant="body2" sx={{ color: "#008000" }}>
                            {row["Debit amount"]}
                          </Typography>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography variant="body2" textAlign={"center"}>
                          Rs. {row["Balance amount"]}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              ) : (
                <TableNoData isNotFound={!sdata.length} />
              )}
            </Table>
          </Scrollbar>

          <CustomPagination
            page={currentPage - 1}
            count={pageCount}
            onPageChange={(
              event: React.MouseEvent<HTMLButtonElement> | null,
              newPage: number
            ) => {
              setCurrentPage(newPage + 1);
            }}
            rowsPerPage={pageSize}
            onRowsPerPageChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setPageSize(parseInt(event.target.value));
              setCurrentPage(1);
            }}
          />
        </Grid>
      )}
    </>
  );
}
