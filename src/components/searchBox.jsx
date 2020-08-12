import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import * as Yup from "yup";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 60,
  },
}));

// finish validation part
const validationSchema = Yup.object({
  zipCode: Yup.string("Enter Zip").required("Please enter your zip"),
});

export const ZipInput = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="zipCode"
              name="zipCode"
              
              // helperText={touched.zipCode ? errors.zipCode : ""}
              // error={touched.zipCode && Boolean(errors.zipCode)}
              label="Enter Zip Code"
              // value={zipCode}
              onChange={props.handleZipInput}
              autoFocus
              fullWidth
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
