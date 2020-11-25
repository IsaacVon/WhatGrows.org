import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Like from "./likeButton";
import NotesBox from "./notesBox";
import { GlobalContextConsumer } from "../globalContext";
import Button from "@material-ui/core/Button";
import MoreInfo from "../components/moreInfo";
import styled from "styled-components";

const useRowStyles = makeStyles({
  root: {
    "& .MuiButton-root ": {
      color: "white",
      fontSize: "20px",
      fontFamily: "Indie Flower",
      letterSpacing: "2px",
    },

    "& .MuiTable-root": {
      backgroundColor: "green",
    },

    "& .MuiIconButton-root": {
      color: "white",
    },

    "& > *": {
      borderBottom: "unset",
    },
  },
});

const ImageContainer = styled.section`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
`;

const PlantImage = styled.img`
  height: 100%;
  border-radius: 20px;
`;

const Row = (props) => {
  const { row, favorites, addFavorite, handleLearnMoreFavorites } = props;
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
        <TableCell align="right" component="th" scope="row">
          <GlobalContextConsumer>
            {(context) => (
              <Button
                onClick={() => context.handleLearnMoreFavorites(row.plantUrl)}
              >
                <ImageContainer>
                  <PlantImage src={row.image} alt="plant" />
                </ImageContainer>
              </Button>
            )}
          </GlobalContextConsumer>
        </TableCell>
        <TableCell align="left">
          <GlobalContextConsumer>
            {(context) => (
              <>
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
                <Button
                  onClick={() => context.handleLearnMoreFavorites(row.plantUrl)}
                >
                  {row.common_name}
                </Button>
                <NotesBox
                  loggedIn={context.loggedIn}
                  id={row.plantId}
                  favorite={favorite.favorite}
                  notes={favorite.notes}
                />
              </>
            )}
          </GlobalContextConsumer>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function favoritesTable({
  learnMore,
  displayLearnMoreFavorites,
  plantsOnPage,
  handleExitLearnMore,
}) {
  if (displayLearnMoreFavorites) {
    return (
      <MoreInfo
        learnMore={learnMore}
        handleExitLearnMore={handleExitLearnMore}
      />
    );
  }

  if (!displayLearnMoreFavorites) {
    return (
      <TableContainer style={{ backgroundColor: "#1DEFF4" }}>
        <Table aria-label="collapsible table">
          <TableBody>
            {plantsOnPage.map((row) => (
              <Row key={row.plantId} row={row} favorites={plantsOnPage} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
