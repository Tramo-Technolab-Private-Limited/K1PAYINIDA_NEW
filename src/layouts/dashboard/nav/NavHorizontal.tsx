import { memo } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { AppBar, Box, BoxProps, Toolbar } from "@mui/material";
// config
import { HEADER } from "../../../config";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import { NavSectionHorizontal } from "../../../components/nav-section";
//
import agentNavConfig from "./agentconfig";
import distributorNavConfig from "./distributorconfig";
import { useAuthContext } from "src/auth/useAuthContext";

// ----------------------------------------------------------------------

function NavHorizontal() {
  const { user } = useAuthContext();

  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
        top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        // sx={{
        //    ...bgBlur({
        //     color: '#052542',
        //   }),
        // }}
        sx={{
          ...bgBlur({
            color: "#052542",
          }),
        }}
      >
        <NavSectionHorizontal
          data={user?.role == "agent" ? agentNavConfig : distributorNavConfig}
        />
      </Toolbar>

      <Shadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: "auto",
        borderRadius: "50%",
        position: "absolute",
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}