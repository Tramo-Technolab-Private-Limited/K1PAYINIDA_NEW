import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

function AmountCustomCard(props: any) {
  return (
    <>
      <Card sx={{ background: "#F4F1F8" }}>
        <Stack m={2.5} flexDirection="row" justifyContent="space-between">
          <Stack>
            <Typography color="000000">{props?.amountType}</Typography>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "200",
                fontStyle: "Public Sans",
                lineHeight: "23.5px",
                marginBottom: "10px",
              }}
              color="#5C2B78"
            >
              {props.Amount}
            </Typography>
          </Stack>
          <Stack>{props?.icon}</Stack>
          {/* <Stack>
            <Button variant="contained" onClick={props.onClick}>
              Hi
            </Button>
          </Stack> */}
        </Stack>
      </Card>
    </>
  );
}

export default AmountCustomCard;
