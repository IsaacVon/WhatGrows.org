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

  const favorite = isFavorite(row.plantId);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <GlobalContextConsumer>
            {(context) => (
              <IconButton
                disabled={!context.loggedIn}
                onClick={() => {
                  let newRow = row;
                  newRow.id = row.plantId;
                  // console.log("row",newRow,"favorite.favorite",favorite.favorite)

                  context.handleFavoriteClick(newRow, favorite.favorite);
                }}
                size="small"
              >
                <Like liked={favorite.favorite} />
              </IconButton>
            )}
          </GlobalContextConsumer>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          <img
            style={{ height: "200px", borderRadius: "20px" }}
            src={row.image}
            alt="plant"
          />
        </TableCell>
        <TableCell align="right">{row.common_name}</TableCell>
        <TableCell align="right">{row.plantUrl}</TableCell>
        <TableCell align="right">
          <GlobalContextConsumer>
            {(context) => (
              <NotesBox
                loggedIn={context.loggedIn}
                id={row.id}
                favorite={favorite.favorite}
                notes={favorite.notes}
              />
            )}
          </GlobalContextConsumer>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function favoritesTable(props) {
  // put context here
  console.log("props", props);
  const importedRow = props.plantsOnPage;
  console.log("importedRow", importedRow);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Image</TableCell>
            <TableCell align="right">Plant Name</TableCell>
            <TableCell align="right">Learn More</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {importedRow.map(
            (row) => (
              console.log("row", row),
              console.log("row.id", row.plantId),
              console.log("props.favorites", importedRow),
              (<Row key={row.plantId} row={row} favorites={importedRow} />)
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
