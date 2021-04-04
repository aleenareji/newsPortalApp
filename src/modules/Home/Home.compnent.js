import React from "react";

import AppBar from "../AppBar/AppBar.component";
import Box from "@material-ui/core/Box";

import { SectionListing } from "./SectionListing.component";

export const HomePage = () => {
  return (
    <>
      <AppBar />
      <Box pt={2} p={3}>
        <Box>
          <SectionListing />
        </Box>
      </Box>
    </>
  );
};
export default HomePage;
