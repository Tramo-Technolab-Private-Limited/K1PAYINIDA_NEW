// @mui
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  Modal,
  Pagination,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

// components
import { Api } from "src/webservices";
import Scrollbar from "../../components/scrollbar";
import { TableHeadCustom } from "../../components/table";
import React, { useEffect, useState, useCallback } from "react";
import { fDateTime } from "src/utils/formatTime";
import useResponsive from "src/hooks/useResponsive";
import { CustomAvatar } from "src/components/custom-avatar";
import { fIndianCurrency } from "src/utils/formatNumber";
import CustomPagination from "src/components/customFunctions/CustomPagination";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateRangePicker, {
  useDateRangePicker,
} from "src/components/date-range-picker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ----------------------------------------------------------------------

type RowProps = {
  schemeId: number;
  main_wallet_amount: number;
  id: string;
  name: string;
  firstName: string;
  email: string;
  city: string;
  mobileVerify: boolean;
  emailVerify: boolean;
  _id: any;
  verificationStatus: string;
  avatar: string;
  category: string;
  flag: string;
  total: number;
  rank: string;
  finalStatus: string;
  userCode: string;
  contact_no: string;
  role: string;
  createdAt: string;
  selfie: any;
  AEPS_wallet_amount: any;
};

export default function AllDistributor() {
  const [appdata, setAppdata] = useState([]);
  const isMobile = useResponsive("up", "sm");
  const [open, setModalEdit] = React.useState(false);
  const [pageSize, setPageSize] = useState<any>(25);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [TotalCount, setTotalCount] = useState<any>(0);
  const [pageSizeAgent, setPageSizeAgent] = useState<any>(25);
  const [currentPageAgent, setCurrentPageAgent] = useState<any>(1);
  const [TotalCountAgnet, setTotalCountAgnet] = useState<any>(0);
  const [selectedRow, setSelectedRow] = useState<RowProps | null>(null);

  const [SelectAgent, setSelectAgent] = useState([]);
  console.log("========== SelectAgent==============", SelectAgent);

  type FormValuesProps = {
    status: string;
    clientRefId: string;
    startDate: Date | null;
    endDate: Date | null;
  };

  const txnSchema = Yup.object().shape({
    status: Yup.string(),
    clientRefId: Yup.string(),
  });
  const defaultValues = {
    category: "",
    status: "",
    clientRefId: "",
    startDate: null,
    endDate: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(txnSchema),
    defaultValues,
  });

  const {
    reset,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
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

  const openEditModal = (val: any) => {
    setSelectedRow(val);
    setModalEdit(true);
    let body = {
      filter: {
        userName: "",
        userCode: "",
        email: "",
        mobile: "",
      },
    };

    let token = localStorage.getItem("token");
    Api(
      `agent/get_Distributors_All_Agents?distId=${val._id}&page=${currentPageAgent}&limit=${pageSizeAgent}`,
      "POST",
      body,
      token
    ).then((Response: any) => {
      console.log("==============Agent Details=====>", Response.data.data);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setTotalCountAgnet(Response?.data?.count);
          setSelectAgent(Response.data.data);
          console.log("=========Agent====>", Response.data.data);
        } else {
          console.log("======Agent List=======>" + Response);
        }
      }
    });
  };

  const handleClose = () => setModalEdit(false);

  const tableLabels: any = [
    { id: "product", label: "Name" },
    { id: "due", label: "User Code" },
    { id: "mobileNumber", label: "Mobile Number & email" },
    { id: "main_wallet_amount", label: "Current Balance" },
    { id: "maxComm", label: "Member Since" },
    { id: "schemeId", label: "Scheme Id" },
    { id: "status", label: "Status" },
    { id: "fundtrans", label: "Fund Transfer" },
  ];

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFF",
    boxShadow: 10,
    overflow: "auto",
    borderRadius: "20px",
  };

  useEffect(() => {
    allDistributor();
  }, [pageSize, currentPage]);

  const allDistributor = () => {
    let body = {
      filter: {
        userName: "",
        userCode: "",
        email: "",
        mobile: "",
      },
    };

    let token = localStorage.getItem("token");
    Api(
      `agent/get_All_Distributor?page=${currentPage}&limit=${pageSize}`,
      "POST",
      body,
      token
    ).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          let arr: any = [];
          setTotalCount(Response?.data?.count);
          arr = Response.data.data.filter((item: any) => {
            return (
              (item.role == "agent" && item.referralCode != "") ||
              item.role == "distributor" ||
              item.role == "m_distributor"
            );
          });
          setAppdata(arr);
          console.log(
            "======ApprovedList===data.data udata====>",
            Response.data.data
          );
        } else {
          console.log("======ApprovedList=Error======>" + Response);
        }
      }
    });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(allDistributor)}>
          <Stack flexDirection={"row"} justifyContent={"end"}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              style={{ padding: "0 25px", marginBottom: "10px" }}
            >
              <RHFTextField name="clientRefId" label="Client Ref Id" />
              <Stack flexDirection={"row"} gap={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                        sx={{ width: 150 }}
                      />
                    )}
                  />
                  <DatePicker
                    label="End date"
                    inputFormat="DD/MM/YYYY"
                    value={watch("endDate")}
                    minDate={watch("startDate")}
                    maxDate={new Date()}
                    onChange={(newValue: any) => setValue("endDate", newValue)}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        size={"small"}
                        sx={{ width: 150 }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Stack>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isSubmitting}
              >
                Search
              </LoadingButton>
              <LoadingButton
                variant="contained"
                onClick={() => {
                  reset(defaultValues);
                  onChangeEndDate(null);
                  onChangeStartDate(null);
                  allDistributor();
                }}
              >
                Clear
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Stack>
      <Card>
        <TableContainer>
          <Scrollbar
            sx={{ maxHeight: window.innerHeight - (isMobile ? 140 : 50) }}
          >
            <Table sx={{ minWidth: 720, mb: 8 }}>
              <TableHeadCustom headLabel={tableLabels} />

              <TableBody>
                {appdata.map((row) => (
                  <EcommerceBestSalesmanRow
                    key={row}
                    row={row}
                    openEditModal={openEditModal}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <CustomPagination
          page={currentPage - 1}
          count={TotalCount}
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
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {selectedRow && (
            <Card sx={{ width: "90vw" }}>
              <TableContainer>
                <Scrollbar sx={{ height: "70vh", overflowY: "scroll" }}>
                  <Table sx={{ minWidth: 720, mb: 8 }}>
                    <TableHeadCustom headLabel={tableLabels} />

                    <TableBody>
                      {SelectAgent.map((row) => (
                        <EcommerceBestSalesmanRow
                          key={row}
                          row={row}
                          openEditModal={openEditModal}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
              <CustomPagination
                page={currentPageAgent - 1}
                count={TotalCountAgnet}
                onPageChange={(
                  event: React.MouseEvent<HTMLButtonElement> | null,
                  newPage: number
                ) => {
                  setCurrentPageAgent(newPage + 1);
                }}
                rowsPerPage={pageSizeAgent}
                onRowsPerPageChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => {
                  setPageSizeAgent(parseInt(event.target.value));
                  setCurrentPageAgent(1);
                }}
              />
            </Card>
          )}
        </Box>
      </Modal>
    </>
  );
}

type EcommerceBestSalesmanRowProps = {
  row: RowProps;
  openEditModal: (row: RowProps) => void;
};

function EcommerceBestSalesmanRow({
  row,
  openEditModal,
}: EcommerceBestSalesmanRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <CustomAvatar
            alt={row.firstName}
            src={row.selfie[0]}
            name={row.firstName}
          />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2"> {row.firstName} </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {row.email}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {new Date(row.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell onClick={() => openEditModal(row)}>
        {row.userCode != "" ? row.userCode : "NA"}
      </TableCell>
      <TableCell>
        {row.email}
        <br />
        {row.contact_no}
      </TableCell>
      <TableCell sx={{ color: "#0D571C" }}>
        <Typography>
          {" "}
          Rs.{fIndianCurrency(row?.main_wallet_amount || "0")}
        </Typography>
      </TableCell>
      <TableCell>{fDateTime(row.createdAt)}</TableCell>
      <TableCell>{row.schemeId}</TableCell>
      <TableCell align="right">{row.verificationStatus}</TableCell>
      <TableCell align="right">
        <Button variant="contained">Transfer</Button>
      </TableCell>
    </TableRow>
  );
}
