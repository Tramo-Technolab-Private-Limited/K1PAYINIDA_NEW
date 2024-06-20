import React, { Fragment, useContext, useState } from "react";
import Scrollbar from "../../../components/scrollbar";
// @mui
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  TableCell,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { RemitterContext } from "./Transfer";

// ----------------------------------------------------------------------

export default function DMTRemitterDetail() {
  const remitterContext: any = useContext(RemitterContext);

  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Remitter details fetch succesfully.
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ border: "1px Solid #00000026", mt: 2 }}
      >
        <Scrollbar sx={{ scrollbarWidth: "thin" }}>
          <Table sx={{ minWidth: 350 }} size="small" aria-label="simple table">
            <TableBody>
              <TableRow sx={{ borderBottom: "1px Solid #00000026" }}>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    px: 2,
                    width: "120px",
                    border: "1px Solid #00000026",
                  }}
                  component="th"
                  scope="row"
                >
                  Full Name
                </TableCell>
                <TableCell>
                  {remitterContext?.remitterFN +
                    " " +
                    remitterContext?.remitterLN || ""}
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: "1px Solid #00000026" }}>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    px: 2,
                    width: "120px",
                    border: "1px Solid #00000026",
                  }}
                  component="th"
                  scope="row"
                >
                  Mobile
                </TableCell>
                <TableCell>{remitterContext?.remitterMobile || ""}</TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: "1px Solid #00000026" }}>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    px: 2,
                    width: "120px",
                    border: "1px Solid #00000026",
                  }}
                  component="th"
                  scope="row"
                >
                  Occupation
                </TableCell>
                <TableCell>
                  {remitterContext?.remitterOccupation || ""}
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: "1px Solid #00000026" }}>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    px: 2,
                    width: "120px",
                    border: "1px Solid #00000026",
                  }}
                  component="th"
                  scope="row"
                >
                  Monthly Limit
                </TableCell>
                <TableCell>
                  {remitterContext?.availableLimitForUpiTransfer}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </React.Fragment>
  );
}

// ----------------------------------------------------------------------
