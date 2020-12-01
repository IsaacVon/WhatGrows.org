import React, { useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import config from "../config.json";
import styled from "styled-components";

// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const SigninWrapper = styled.section`
  display: grid;
  place-items: center;
`;

const SigninContainer = styled.section`
  display: grid;
  place-items: center;
  max-width: 300px;
`;

const useStyles = makeStyles((theme) => ({
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #36D8F0 inset",
      WebkitTextFillColor: "white",
    },
  },

  root: {
    fontWeight: 400,
    flexGrow: 1,
    paddingBottom: 60,

    "& .MuiFormLabel-root": {
      color: "white",
      padding: 0,
      fontSize: "1.1rem",
      fontFamily: "Indie Flower",
      fontWeight: 400,
      letterSpacing: "0.04em",
    },

    "& .MuiTypography-h5": {
      marginTop: "25px",

      color: "white",
      fontSize: "2.5rem",
      fontFamily: "Indie Flower",
      fontWeight: 400,
      letterSpacing: "2px",
    },

    "& .MuiButton-root": {
      color: "white",
      padding: 0,
      fontSize: "1rem",
      fontFamily: "Indie Flower",
      fontWeight: 400,
      letterSpacing: "0.04em",
      textTransform: "capitalize",
    },

    "& .MuiFormControl-root": {},

    "& .MuiInput-underline:before": {
      borderBottomColor: "#FFE116", // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#FFE116", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFE116", // Solid underline on focus
    },

    "& .MuiSlider-root": {
      color: "#FFE116", // Solid underline on focus
    },

    "& .MuiFormLabel-root.Mui-focused": {
      color: "white", // Solid underline on focus
    },

    "& .MuiButton-containedPrimary": {
      fontSize: "2rem",

      borderRadius: "20px",
      height: "60px",
      color: "white", // Solid underline on focus
      fontWeight: "400",
      boxShadow: "none",
      backgroundColor: "#F89143",
      "&:hover": {
        backgroundColor: "#E27725",
      },
    },
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [form, updateForm] = useState({
    email: "",
    password: "",
  });

  const submitAllowed = form.email && form.password ? true : false;

  const [errors, updateErrors] = useState({
    errors: "",
  });

  const updateField = (event) => {
    updateForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const loginData = {
        email: form.email,
        password: form.password,
      };
      const jwt = await axios({
        method: "post",
        url: config.apiEndpoint + "/auth",
        data: loginData,
      });
      localStorage.setItem("token", jwt.data);
      console.log("Correct login... so we logged you in");

      return (window.location = "/");
    } catch (ex) {
      updateErrors({ errors: ex.response.data });
    }
  };

  const displayError = errors.errors ? true : false;

  return (
    <div className={classes.root}>
      <SigninWrapper>
        <SigninContainer>
          <CssBaseline />

          <CssBaseline />

          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <form className={classes.form} noValidate onSubmit={signIn}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={updateField}
                  
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={displayError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={updateField}
                  
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={displayError}
                  helperText={errors.errors}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!submitAllowed}
            >
              Sign In
            </Button>



            <Grid container>
              <Grid item>
                <Button component={Link} to="/Signup">
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>









          </form>
        </SigninContainer>
      </SigninWrapper>
    </div>
  );
}
