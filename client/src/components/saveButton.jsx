import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function SaveButton(props) {
  const classes = useStyles();

  return (
    <Button
      disabled={!props.disabled}
      variant="outlined"
      size="small"
      color="primary"
      className={classes.margin}
    >
      Save Notes
    </Button>
  );
}
