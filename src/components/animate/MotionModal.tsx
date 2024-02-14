import { m, AnimatePresence } from "framer-motion";
// @mui
import { Dialog, Box, Paper, DialogProps, Modal, Stack } from "@mui/material";
//
import {
  varBgColor,
  varBgKenburns,
  varBgPan,
  varBounce,
  varFade,
} from "./variants";
import MotionContainer from "./MotionContainer";
import React from "react";

// ----------------------------------------------------------------------

export interface Props extends DialogProps {
  onClose?: VoidFunction;
  width?: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default React.memo(function MotionModal({
  open,
  onClose,
  children,
  width = { xs: "100%", sm: 500 },
  sx,
  ...other
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <Modal
          fullWidth
          open={open}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          {...other}
        >
          <Box sx={{ ...style, width }} component={MotionContainer}>
            <m.div variants={varBounce().inUp}>
              <Stack
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                }}
              >
                {children}
              </Stack>
            </m.div>
          </Box>
        </Modal>
      )}
    </AnimatePresence>
  );
});
