import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

function CustomCard(props: any) {
  return (
    <>
      <Card sx={{ background: props.color }}>
        <CardContent>
          <Stack flexDirection="row" gap={1}>
            <Stack>{props.icon}</Stack>
            <Typography gutterBottom variant="h6" color="000000" mt={1}>
              {props?.Status}
            </Typography>
          </Stack>
          <Typography variant="caption">Transaction Vol.</Typography>
          <Typography variant="h6" color="000000">
            ₹{props.amount}
          </Typography>
          <Stack
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              backgroundColor: props?.footerColor,
              padding: "4px",
              color: "white",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ paddingLeft: 2, paddingRight: 2 }}
            >
              <Typography variant="caption">Transaction Count</Typography>
              <Typography variant="overline">
                {props.noOfTransaction}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default CustomCard;
