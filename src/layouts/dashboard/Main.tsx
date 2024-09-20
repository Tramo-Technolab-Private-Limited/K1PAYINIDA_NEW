// @mui
import { Box, BoxProps } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// config
import { HEADER, NAV } from "../../config";
// components
import { useSettingsContext } from "../../components/settings";

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {
  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === "vertical";

  const isNavMini = themeLayout === "mini";

  const isDesktop = useResponsive("up", "lg");

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          height: `${window.innerHeight - HEADER.H_MOBILE + SPACING}px`,
          overflow: "hidden",
          pt: `${HEADER.H_MOBILE + SPACING}px`,
          px: 0,
          ...(isDesktop && {
            height: `${window.innerHeight - HEADER.H_DASHBOARD_DESKTOP + 80}px`,
            overflow: "hidden",
            px: 0,
            pt: `${HEADER.H_DASHBOARD_DESKTOP + 30}px`,
            // pb: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          }),
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: `${window.innerHeight - HEADER.H_MOBILE + SPACING}px`,
        overflow: "hidden",
        pt: `${HEADER.H_MOBILE + SPACING}px`,
        px: 1.5,
        ...(isDesktop && {
          height: `${window.innerHeight - 10 + SPACING}px`,
          overflow: "hidden",
          px: 1,
          pt: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
