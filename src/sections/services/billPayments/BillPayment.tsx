import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import Bbps_One from "./Bbps_One";
import Bbps_Two from "./Bbps_Two";
import { useSnackbar } from "notistack";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import ApiDataLoading from "src/components/customFunctions/ApiDataLoading";
import ServiceUnderUpdate from "src/pages/ServiceUnderUpdate";
import { useAuthContext } from "src/auth/useAuthContext";
// ----------------------------------------------------------------------

//--------------------------------------------------------------------

export default function BillPayment(props: any) {
  const { Api } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const [currentTab, setCurrentTab] = React.useState("bbps1");

  const navigate = useNavigate();

  const [isServiceEnable, setIsServiceEnable] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    Api(`category/get_CategoryList`, "GET", "", token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          Response?.data?.data?.map((item: any) => {
            if (item.category_name.toUpperCase() == "BILL PAYMENT") {
              setIsServiceEnable(item.isEnabled);
            }
          });
        }
      }
    });
  }, []);

  if (isServiceEnable == null) {
    return <ApiDataLoading />;
  }

  if (!isServiceEnable) {
    return <ServiceUnderUpdate />;
  }

  return (
    <>
      {/* <Box sx={{ width: '100%' }}>
        <Tabs
          value={currentTab}
          onChange={(event: React.SyntheticEvent, newValue: string) => setCurrentTab(newValue)}
          aria-label="basic tabs example"
        >
          <Tab value={'bbps1'} label={<Typography>BBPS 1</Typography>} />
          <Tab value={'bbps2'} label={<Typography>BBPS 2</Typography>} />
        </Tabs>
      </Box> */}
      <RoleBasedGuard hasContent roles={["agent"]}>
        <Stack flexDirection="row" alignItems={"center"} gap={1}>
          <ArrowBackIosNewOutlinedIcon
            onClick={() => navigate(-1)}
            sx={{
              height: "25px",
              width: "25px",
              cursor: "pointer",
            }}
          />
          <Typography variant="h4">Bill Payment</Typography>
        </Stack>
        <Bbps_One />
      </RoleBasedGuard>
      {/* {currentTab == 'bbps1' ?  : null} */}
    </>
  );
}

// ----------------------------------------------------------------------
