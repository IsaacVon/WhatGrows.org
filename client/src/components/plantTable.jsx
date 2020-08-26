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
import Like from "./likeButton";
import Save from "./saveButton";
import NotesBox from "./notesBox";
import { GlobalContextConsumer } from "../globalContext";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const Row = (props) => {
  const { row, favorites, addFavorite } = props;
  const classes = useRowStyles();

  const isFavorite = (id) => {
    const index = favorites.findIndex(function (favorite, index) {
      return favorite.plantId === id;
    });

    if (index !== -1) {
      const displayData = {
        favorite: true,
        notes: favorites[index].notes,
      };
      return displayData;
    }

    if (index === -1) {
      const displayData = {
        favorite: false,
        notes: "",
      };
      return displayData;
    }
  };

  const favorite = isFavorite(row.id);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <GlobalContextConsumer>
            {(context) => (
              <IconButton onClick={() => context.handleFavoriteClick(row, favorite.favorite)} size="small">
                <Like liked={favorite.favorite} />
              </IconButton>
            )}
          </GlobalContextConsumer>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.image_url}
        </TableCell>
        <TableCell align="right">{row.common_name}</TableCell>
        <TableCell align="right">{row.links.plant}</TableCell>
        <TableCell align="right">
          <NotesBox id={row.id} disabled={favorite.favorite} notes={favorite.notes} />
        </TableCell>
        <TableCell align="right">
          <Save disabled={favorite.favorite} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function PlantTable(props) {
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
            <TableCell align="right">Notes</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {importedRow.map((row) => (
            <Row key={row.id} row={row} favorites={props.favorites} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
