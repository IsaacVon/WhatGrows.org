import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { GlobalContextConsumer } from "../globalContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: "white",
      fontFamily: "Indie Flower",

    },

    "& .MuiOutlinedInput-inputMultiline": {
      color: "white",
      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
      letterSpacing: "1px",
      fontWeight: "300",
      fontSize: "15px",
    },
  



    "& .MuiFormLabel-root": {
      color: "white",
      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
      letterSpacing: "1px",
      fontWeight: "300",
      fontSize: "15px",

    },

    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      width: "100%",
      maxWidth: "500px",
    },


    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00FBFF",
      borderTopColor: "rgb(0, 251, 255)",
      borderRightColor: "rgb(0, 251, 255)",
      borderLottomColor: "rgb(0, 251, 255)",
      borderLeftColor: "rgb(0, 251, 255)",
      borderWidth: "3px",
      borderRadius: "20px"
    },
    
    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00FBFF",
      borderTopColor: "rgb(0, 251, 255)",
      borderRightColor: "rgb(0, 251, 255)",
      borderLottomColor: "rgb(0, 251, 255)",
      borderLeftColor: "rgb(0, 251, 255)",
      borderWidth: "2px",
    },

    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00FBFF",
      borderWidth: "4px",
    },


 
  },
}));

export default function NotesBox({favorite, id, notes, loggedIn}) {
  const classes = useStyles();


  // If not favorited return enter notes
  const label = favorite ? "Enter notes" : "";
  const displayNotes = notes ? notes : "";

  const renderPlaceholder = () => {
    if (loggedIn && favorite) {
      return "";
    }
    if (loggedIn && !favorite) {
      return "Save as favorite to add notes";
    }
    if (!loggedIn) {
      return "Log in to enter notes";
    }
  };


  return (
    <form className={classes.root} noValidate autoComplete="off">
      <GlobalContextConsumer>
        {(context) => (
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            label={label}
            placeholder={renderPlaceholder()}
            value={displayNotes}
            variant="outlined"
            disabled={!favorite}
            onChange={(event) =>
              context.handleNoteInput(id, event.target.value)
            } // need some type of force update
            onBlur={() => context.handleNoteSubmit()}
          ></TextField>
        )}
      </GlobalContextConsumer>
    </form>
  );
}
