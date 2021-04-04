import React, { useEffect, useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ArticleList from "./ArticleList.component";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const SectionListing = () => {
  const [sectionName, setSectionName] = useState({ section: [] });
  const classes = useStyles();
  const [selectedSection, setSelectedSection] = useState({
    section: "",
  });

  const onSectionChange = (event) => {
    setSelectedSection((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(async () => {
    const result = await axios(
      "https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7 "
    );

    setSectionName(result?.data?.results);
  }, []);
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            {selectedSection ? (
              <ArticleList selectedSection={selectedSection} />
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={3}>
            <FormControl
              style={{ minWidth: 120 }}
              className={classes.formControl}
            >
              <InputLabel shrink>Section Name</InputLabel>
              <Select
                value={selectedSection.section}
                displayEmpty
                onChange={onSectionChange}
                inputProps={{
                  name: "section",
                }}
              >
                {sectionName.length > 0
                  ? sectionName.map((item) => (
                      <MenuItem value={item?.display_name}>
                        {item?.display_name}
                      </MenuItem>
                    ))
                  : []}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default SectionListing;
