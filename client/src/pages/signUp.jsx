import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import config from "../config.json";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [form, updateForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitAllowed = form.name && form.email && form.password ? true : false;

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
    // event.preventDefault();

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
      console.log(
        "Email already exists and your password was right... so we logged you in"
      );

      return (window.location = "/");
    } catch (ex) {
      console.log("errors", errors);
      updateErrors({ errors: ex.response.data });
    }
  };

  const registerUser = async (event) => {
    let newUser = await axios({
      method: "post",
      url: config.apiEndpoint + "/users/register",
      data: form,
    });

    const jwt = newUser.headers["x-auth-token"];
    localStorage.setItem("token", jwt);
    console.log("New user created... and youre logged in ");
    return (window.location = "/");
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      await registerUser();
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        await signIn();
      } // Since user already exists, try to sign in
      if (ex.response && ex.response.status !== 409) {
        console.log(ex.response);
      }
    }
  };

  const displayError = errors.errors ? true : false;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={updateField}
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={updateField}
                  variant="outlined"
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
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={displayError}
                  helperText={errors.errors ? "Account already created using this email" : ""}
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Button component={Link} to="/signin">
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
