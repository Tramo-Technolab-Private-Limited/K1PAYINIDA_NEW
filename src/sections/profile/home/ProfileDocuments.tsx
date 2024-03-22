import { Card, Grid, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import Image from "src/components/image/Image";

export default function ProfileDocuments() {
  const { user } = useAuthContext();

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {user?.image_on_aadhaar && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.image_on_aadhaar}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                Aadhaar Image
              </Typography>
            </Card>
          </Grid>
        )}
        {user?.aadharFileUrl && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.aadharFileUrl}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                Aadhaar Front
              </Typography>
            </Card>
          </Grid>
        )}
        {user?.aadharBackUrl && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.aadharBackUrl}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                Aadhaar Back
              </Typography>
            </Card>
          </Grid>
        )}
        {user?.PANFile && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.PANFile}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                PAN Card
              </Typography>
            </Card>
          </Grid>
        )}
        {user?.PANFile_Company && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.PANFile_Company}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                Company Pan
              </Typography>
            </Card>
          </Grid>
        )}
        {user?.GSTFile && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.GSTFile}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                GST
              </Typography>
            </Card>
          </Grid>
        )}
        {user?.Cancelled_Cheque_File && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.Cancelled_Cheque_File}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                Cancelled Cheque
              </Typography>
            </Card>
          </Grid>
        )}
        {user?.Consent_Letter_File && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.Consent_Letter_File}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                Consent Letter
              </Typography>
            </Card>
          </Grid>
        )}
        {user?.Board_Resolution_File && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.Board_Resolution_File}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                Board Resolution
              </Typography>
            </Card>
          </Grid>
        )}
        {user?.Partnership_deed_File && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Image
                src={user?.Partnership_deed_File}
                alt="Aadhaar Front"
                sx={{ height: 200 }}
              />
              <Typography variant="h6" m={1} textAlign={"center"}>
                Partnership Deed
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
