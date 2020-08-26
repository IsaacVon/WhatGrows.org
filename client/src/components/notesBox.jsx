import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { GlobalContextConsumer } from "../globalContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function NotesBox(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");


  // If not favorited return enter notes
  const label = props.disabled ? "Enter notes" : "";
  const placeholder = props.disabled ? "" : "Save as favorite to add notes";
  const notes = props.notes ? props.notes : "";

  

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <GlobalContextConsumer>
        {(context) => (
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            label={label}
            placeholder={placeholder}
            value={notes}
            variant="outlined"
            disabled={!props.disabled}
            onChange={(event) => context.handleNoteInput(props.id, event.target.value)} // need some type of force update
          ></TextField>
        )}
      </GlobalContextConsumer>
    </form>
  );
}
