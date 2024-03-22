// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Tooltip, Typography } from "@mui/material";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import { CustomAvatar } from "../../../components/custom-avatar";
import { AwsDocSign } from "src/components/customFunctions/AwsDocSign";
import { sentenceCase } from "change-case";
import { useNavigate } from "react-router";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 1.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Tooltip title={"View Profile"} placement="top">
      <StyledRoot onClick={() => navigate("/auth/userprofilepage")}>
        <CustomAvatar
          src={user?.selfie[0]}
          alt={user?.firstName + " " + user?.lastName}
          name={user?.firstName}
        />

        <Box>
          <Typography variant="subtitle2" sx={{ textOverflow: "ellipsis" }}>
            {sentenceCase(user?.firstName + " " + user?.lastName)}
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {sentenceCase(user?.role)}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {user?.userCode}
          </Typography>{" "}
        </Box>
      </StyledRoot>
    </Tooltip>
  );
}
