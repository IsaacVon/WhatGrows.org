import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 60,
  },
}));

export default function PageButtons(props) {
  const classes = useStyles();

  const { handleZipInput, displayText } = props;

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={props.handleSearch}
            >
              Search
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                props.handlePageChange(props.currentPage + 1);
              }}
              disabled={props.currentPage === props.totalPages ? true : false}
            >
              Next Page
            </Button>{" "}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                props.handlePageChange(props.totalPages);
              }}
              disabled={props.currentPage === props.totalPages ? true : false}
            >
              Last
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                props.handlePageChange(props.currentPage - 1);
              }}
              disabled={props.currentPage === 1 ? true : false}
            >
              Previous Page
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                props.handlePageChange(1);
              }}
              disabled={props.currentPage === 1 ? true : false}
            >
              First Page
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
