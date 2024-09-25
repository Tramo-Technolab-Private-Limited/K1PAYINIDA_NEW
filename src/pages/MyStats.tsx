import { Stack } from "@mui/material";
import React from "react";
import AgentDashboard from "src/layouts/newDashboard/agentDashbord/AgentDashboard";
import { useAuthContext } from "src/auth/useAuthContext";
import DistributorDashboard from "src/layouts/newDashboard/DistribitorDashboard/DistributorDashboard";
import MaterDistributor from "src/layouts/newDashboard/M_Ddashboard/MasterDistributorDashboard";

function MyStats() {
  const { user, Api, UploadFileApi } = useAuthContext();
  return (
    <>
      {/* <Stack
        style={{
          overflowY: "auto",
          // maxHeight: "720px"
        }}
      > */}
      {user?.role === "agent" ? (
        <AgentDashboard />
      ) : user?.role === "distributor" ? (
        <DistributorDashboard />
      ) : user?.role === "m_distributor" ? (
        <MaterDistributor />
      ) : null}
      {/* </Stack> */}
    </>
  );
}

export default MyStats;
