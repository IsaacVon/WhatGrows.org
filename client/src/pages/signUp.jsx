import React, { useState } from "react";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
  
  const submitAllowed = form.name && form.email && form.password ? true : false


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
    try {
      const loginData = {
        email: form.email,
        password: form.password,
      };
      const jwt = await axios({
        method: "post",
        url: "http://localhost:3000/api/auth",
        data: loginData,
      });
      return jwt.data
    } catch {
      console.log("user alredy created using this email");
      updateErrors("User alredy created using this email");
    }
  };

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      let newUser = await axios({
        method: "post",
        url: "http://localhost:3000/api/users/register",
        data: form,
      });
      
      const jwt = newUser.headers['x-auth-token']
      
      localStorage.setItem('token', jwt)
      console.log("New user created... and youre logged in ");
      //store in local storage 


    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        // Since user already exists, try to sign in
        const jwt = await signIn()
        localStorage.setItem('token', jwt)

        // this.props.history.push('/')
        console.log("Email already exists and your password was right... so we logged you in");
      }
      if(ex.response && ex.response.status !== 409) {
        console.log(ex.response);

      }
    }
  };

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
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={registerUser}>
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
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
