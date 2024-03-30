import React from "react";
import { Stack, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import Image from "../image/Image";
import LocationErrorIlustrate from "src/assets/icons/LocationErrorIlustrate";

function LocationInstruction() {
  return (
    <React.Fragment>
      <Stack p={2}>
        <Logo />
      </Stack>
      <Stack
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent={"center"}
        alignItems={"center"}
        gap={5}
      >
        <Stack flexDirection={"row"} justifyContent={"center"}>
          <LocationErrorIlustrate />
        </Stack>

        <Stack>
          <Typography variant="h5" mb={3} textAlign={"center"}>
            Enable Your Location!
          </Typography>
          <Typography variant="body1">
            Here are the general steps to unblock location sharing in some
            commonly used browsers:
          </Typography>
          <br />
          <Typography variant="subtitle1">Google Chrome:</Typography>
          <Typography variant="body1">
            1. Click on the lock icon (or information icon) located to the left
            of the website URL in the address bar. <br />
            2. In the dropdown menu, find the "Location" option and change it to
            "Allow".
            <br />
            3. Refresh the webpage for the changes to take effect.
          </Typography>
          <br />
          <Typography variant="subtitle1">Safari:</Typography>
          <Typography variant="body1">
            1. Click on Safari in the top menu bar and select "Preferences".
            <br />
            2. Go to the "Websites" tab and select "Location" from the left
            sidebar.
            <br />
            3. Find the website in the right pane and set its permission to
            "Allow".
            <br />
            4. Close the preferences window and refresh the webpage.
          </Typography>
          <br />
          <Typography variant="subtitle1">Microsoft Edge:</Typography>
          <Typography variant="body1" mb={4}>
            1. Click on the padlock icon located to the left of the website URL
            in the address bar.
            <br />
            2. In the dropdown menu, find the "Permissions" section and click on
            "Manage permissions".
            <br />
            3. Set the location permission to "Allow" or "Ask" and then refresh
            the webpage.
          </Typography>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}

export default LocationInstruction;
