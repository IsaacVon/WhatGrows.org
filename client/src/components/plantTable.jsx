import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Like from "../components/like"

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const isFavorite = (id) => {
  console.log("isFavorite.. row.id", id)
  return true
}


const Row = (props) => {
  const { row } = props;
  // const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {/* <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton> */}
          <IconButton size="small">
            <Like liked={isFavorite(row.id)}/>
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.image_url}
        </TableCell>
        <TableCell align="right">{row.common_name}</TableCell>
        <TableCell align="right">{row.links.plant}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const importedRow = props.plantsOnPage;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Image</TableCell>
            <TableCell align="right">Plant Name</TableCell>
            <TableCell align="right">Learn More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {importedRow.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
