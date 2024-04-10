import * as React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Image from "src/components/image/Image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import Failed from "src/assets/transactionIcons/Failed";
import Success from "src/assets/transactionIcons/Success";
import Pending from "src/assets/transactionIcons/Pending";
import Hold from "src/assets/transactionIcons/Hold";
import Inprocess from "src/assets/transactionIcons/Inprocess";
import Initiated from "src/assets/transactionIcons/Initiated";
import CustomTransactionSlip from "./CustomTransactionSlip";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 400 },
  bgcolor: "background.paper",
  border: "2px ",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

export default function TransactionModal({
  transactionDetail,
  errorMsg,
  successMsg,
  isTxnOpen,
  handleTxnModal,
}: any) {
  const [slip, setSlip] = React.useState(false);

  const HandleClose = () => setSlip(false);
  if (errorMsg) {
    return (
      <Modal
        open={isTxnOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack flexDirection={"row"} justifyContent={"center"}>
            <Failed />
          </Stack>
          <Typography variant="h4" textAlign={"center"}>
            Transaction Failed
          </Typography>
          <Typography
            variant="h6"
            textAlign={"center"}
            color={"#9e9e9ef0"}
            my={1}
          >
            {errorMsg}
          </Typography>
          <Stack flexDirection="row" gap={2}>
            <Button onClick={handleTxnModal} variant="contained">
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        open={isTxnOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack flexDirection={"row"} justifyContent={"center"}>
            {transactionDetail?.status == "success" ? (
              <>
                <Typography variant="h4" textAlign={"center"}>
                  <Success />
                  Transaction Successful
                </Typography>
              </>
            ) : transactionDetail?.status == "pending" ? (
              <>
                <Typography variant="h4" textAlign={"center"}>
                  <Pending />
                  Transaction Pending
                </Typography>
              </>
            ) : transactionDetail?.status == "hold" ? (
              <>
                <Typography variant="h4" textAlign={"center"}>
                  <Hold />
                  Transaction Hold
                </Typography>
              </>
            ) : transactionDetail?.status == "in_process" ? (
              <>
                <Typography variant="h4" textAlign={"center"}>
                  <Inprocess />
                  Transaction Inprocess
                </Typography>
              </>
            ) : (
              <Initiated />
            )}
          </Stack>
          <Typography
            variant="h4"
            textAlign={"center"}
            color={"#9e9e9ef0"}
            my={1}
          >
            {successMsg}
          </Typography>
          <Stack flexDirection="row" gap={1}>
            <Button onClick={handleTxnModal} variant="contained">
              Close
            </Button>
            <Button onClick={() => setSlip(true)} variant="contained">
              Export Slip
            </Button>
          </Stack>
          {slip && (
            <CustomTransactionSlip
              newRow={transactionDetail}
              handleClose={HandleClose}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
