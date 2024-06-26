// @mui
import { Typography, Stack, Box, Container, useTheme } from "@mui/material";
// components
import Logo from "../../components/logo";
import Image from "../../components/image";
import koneDashBoardImage from "../../assets/images/konedashboard.svg";
import nrupeeDashBoardImage from "../../assets/images/nrupeedashboard.svg";
import justpayDashBoardImage from "../../assets/images/payjustdashboard.svg";

//
import {
  StyledRoot,
  StyledSectionBg,
  StyledSection,
  StyledContent,
} from "./styles";
import Marquee from "react-fast-marquee";
import SvgColor from "src/components/svg-color";
import packageFile from "../../../package.json";

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  const theme = useTheme();
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: "absolute",
          mt: { xs: 1, md: 1 },
          ml: { xs: 1, md: 5 },
        }}
      />

      <StyledSection>
        <Typography
          variant="h5"
          sx={{ mb: 5, maxWidth: 580, textAlign: "center" }}
        >
          Join {process.env.REACT_APP_COMPANY_NAME} to drive the Financial
          Inclusion in the country!
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={
            process.env.REACT_APP_LOGO == "K1LOGO"
              ? koneDashBoardImage
              : process.env.REACT_APP_LOGO == "NRUPEELOGO"
              ? nrupeeDashBoardImage
              : justpayDashBoardImage
          }
          sx={{ maxWidth: 720 }}
        />
        <Typography
          variant="subtitle1"
          sx={{ mt: 5, mb: 10, maxWidth: 580, textAlign: "center" }}
        >
          Be part of India’s largest retail digital solution providers, offer
          solutions available on your finger tips and earn commissions on every
          transactions.
        </Typography>

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>

      <Box
        component="footer"
        sx={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          backgroundColor: "#375168",
        }}
      >
        {/* <Divider /> */}
        <Stack
          sx={{ bgcolor: "white" }}
          flexDirection={"row"}
          justifyContent={"space-between"}
          px={1}
        >
          <Typography variant="caption">
            v.
            {process.env.REACT_APP_ENV == "DEV"
              ? packageFile.versiondev
              : packageFile.versionprod}
          </Typography>
          <Typography variant="caption">
            Last Updated :- {packageFile.lastUpdated}
          </Typography>
        </Stack>
        <Marquee style={{ background: "white" }} pauseOnHover>
          <SvgColor
            src={"/assets/icons/marqueeimages/recharge.svg"}
            sx={{ width: 120, height: 70, bgcolor: theme.palette.primary.main }}
          />
          {/* <SvgColor
            src={"/assets/icons/marqueeimages/dmt.svg"}
            sx={{ width: 120, height: 70, bgcolor: theme.palette.primary.main }}
          /> */}
          {/* <SvgColor
            src={"/assets/icons/marqueeimages/dmt1.svg"}
            sx={{ width: 120, height: 70, bgcolor: theme.palette.primary.main }}
          /> */}
          {/* <SvgColor
            src={"/assets/icons/marqueeimages/dmt2.svg"}
            sx={{ width: 120, height: 70, bgcolor: theme.palette.primary.main }}
          /> */}
          <SvgColor
            src={"/assets/icons/marqueeimages/billpayment.svg"}
            sx={{ width: 120, height: 70, bgcolor: theme.palette.primary.main }}
          />
          {/* <SvgColor
            src={"/assets/icons/marqueeimages/indonepal.svg"}
            sx={{ width: 120, height: 70, bgcolor: theme.palette.primary.main }}
          /> */}
          <SvgColor
            src={"/assets/icons/marqueeimages/matm.svg"}
            sx={{ width: 120, height: 70, bgcolor: theme.palette.primary.main }}
          />
          <SvgColor
            src={"/assets/icons/marqueeimages/aeps.svg"}
            sx={{ width: 120, height: 70, bgcolor: theme.palette.primary.main }}
          />
          <SvgColor
            src={"/assets/icons/marqueeimages/aadhaarpay.svg"}
            sx={{ width: 120, height: 70, bgcolor: theme.palette.primary.main }}
          />
        </Marquee>
        <Container>
          <Stack
            flexDirection={{ xs: "column", sm: "row" }}
            sx={{ color: "white", pt: 1, pb: 1 }}
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">
              Helpline Numbers +{process.env.REACT_APP_COMPANY_MOBILE} ,{" "}
              {process.env.REACT_APP_COMPANY_MOBILEOTHER}
            </Typography>
            <Typography variant="subtitle2">
              Timings : 08:00AM to 10:00 PM (Mon-Sun)
            </Typography>
            <Typography variant="subtitle2">
              {process.env.REACT_APP_COMPANY_EMAIL}
            </Typography>
          </Stack>
        </Container>
      </Box>
    </StyledRoot>
  );
}
