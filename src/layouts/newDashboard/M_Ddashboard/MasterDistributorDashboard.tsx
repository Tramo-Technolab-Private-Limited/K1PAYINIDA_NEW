import React, { useState } from "react";
import AgentServices from "../AgentServices";
import {
  Box,
  Card,
  Divider,
  Grid,
  Modal,
  Stack,
  Tab,
  Typography,
  Tabs,
} from "@mui/material";
import CustomCard from "../CustomCard";
import AmountCustomCard from "../AmountCustomCard";
import SuccessNew from "../../../assets/dashboardIcon/Success.svg";
import FailedNew from "../../../assets/dashboardIcon/Failed.svg";
import Main from "../../../assets/dashboardIcon/Main.svg";
import AEPS from "../../../assets/dashboardIcon/AEPS.svg";
import DonutView from "../Charts/DonutView";
import LineView from "../Charts/LineView";
import MonochromePieChart from "../Charts/MonochromePie";
import TransactionDeatails from "../TransactionDeatails";
import Scrollbar from "src/components/scrollbar";
import useResponsive from "src/hooks/useResponsive";
import TodayData from "./TodayData";

function MaterDistributor() {
  const isMobile = useResponsive("up", "sm");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Scrollbar>
      <Stack>
        <Card sx={{ p: 1, bgcolor: "#F2F2F2DD" }}>
          {/* Tabs */}
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Today" />
            {/* <Tab label="7 Days" />
            <Tab label="30 Days" /> */}
          </Tabs>
        </Card>
        <Box sx={{ p: 2 }} bgcolor={"#F1D9FF"}>
          {selectedTab === 0 && <TodayData />}
          {selectedTab === 1 && (
            <Typography variant="body1">Comming Soon for 7 Days</Typography>
          )}
          {selectedTab === 2 && (
            <Typography variant="body1">Comming Soon for 30 Days</Typography>
          )}
        </Box>
      </Stack>
    </Scrollbar>
  );
}

export default MaterDistributor;
