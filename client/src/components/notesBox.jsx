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
      fontFamily: "Indie Flower",
    },

    "& .MuiFormLabel-root": {
      color: "white",
      fontFamily: "Indie Flower",
    },

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },


    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00FBFF",
      borderTopColor: "rgb(0, 251, 255)",
      borderRightColor: "rgb(0, 251, 255)",
      borderLottomColor: "rgb(0, 251, 255)",
      borderLeftColor: "rgb(0, 251, 255)",
      borderWidth: "3px",
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

export default function NotesBox(props) {
  const classes = useStyles();

  // If not favorited return enter notes
  const label = props.favorite ? "Enter notes" : "";
  const notes = props.notes ? props.notes : "";

  const renderPlaceholder = () => {
    if (props.loggedIn && props.favorite) {
      return "";
    }
    if (props.loggedIn && !props.favorite) {
      return "Save as favorite to add notes";
    }
    if (!props.loggedIn) {
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
            value={notes}
            variant="outlined"
            disabled={!props.favorite}
            onChange={(event) =>
              context.handleNoteInput(props.id, event.target.value)
            } // need some type of force update
            onBlur={() => context.handleNoteSubmit()}
          ></TextField>
        )}
      </GlobalContextConsumer>
    </form>
  );
}
