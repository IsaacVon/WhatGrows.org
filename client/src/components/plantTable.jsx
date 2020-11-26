import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Like from "./likeButton";
import Save from "./saveButton";
import NotesBox from "./notesBox";
import { GlobalContextConsumer } from "../globalContext";
import Button from "@material-ui/core/Button";
import MoreInfo from "../components/moreInfo";
import styled from "styled-components";
import { device } from "../utils/device";

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

    "& .MuiTableCell-root": {
      padding: "0px",
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
  border-radius: 20px;
  overflow: hidden;

  @media ${device.mobileS} {
    width: 150px;
    height: 150px;
  }
  @media ${device.tablet} {
    width: 200px;
    height: 200px;
    margin: 15px;
  }
`;

const PlantImage = styled.img`
  height: 100%;
  border-radius: 20px;
`;

const TextContainer = styled.section`
  /* background-color: green; */

  @media ${device.mobileS} {
    margin-right: 20px;
  }
  @media ${device.tablet} {
    margin-right: 100px;
  }
`;

const TableWrapper = styled.section`
  background-color: green;

  @media ${device.mobileS} {
  }
  @media ${device.tablet} {
  }
`;

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
        <TableCell align="right" component="th" scope="row">
          <GlobalContextConsumer>
            {(context) => (
              <Button
                onClick={() =>
                  context.handleLearnMoreSearch(
                    row.links.plant,
                    row.id,
                    favorite.favorite,
                    favorite.notes
                  )
                }
              >
                <ImageContainer>
                  <PlantImage src={row.image_url} alt="plant" />
                </ImageContainer>
              </Button>
            )}
          </GlobalContextConsumer>
        </TableCell>

        <TableCell align="left">
          <TextContainer>
            <GlobalContextConsumer>
              {(context) => (
                <>
                  <IconButton
                    disabled={!context.loggedIn}
                    onClick={() =>
                      // console.log("row",row, "favorite.favorite",favorite.favorite)
                      context.handleFavoriteClick(row, favorite.favorite)
                    }
                    size="small"
                  >
                    <Like liked={favorite.favorite} />
                  </IconButton>
                  <Button
                    onClick={() =>
                      context.handleLearnMoreSearch(
                        row.links.plant,
                        row.id,
                        favorite.favorite,
                        favorite.notes
                      )
                    }
                  >
                    {row.common_name}
                  </Button>
                  <NotesBox
                    loggedIn={context.loggedIn}
                    id={row.id}
                    favorite={favorite.favorite}
                    notes={favorite.notes}
                  />
                </>
              )}
            </GlobalContextConsumer>
          </TextContainer>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function PlantTable(props) {
  const {
    learnMore,
    displayLearnMoreSearch,
    plantsOnPage,
    favorites,
    handleExitLearnMore,
  } = props;

  if (displayLearnMoreSearch) {
    return (
      <MoreInfo
        learnMore={learnMore}
        handleExitLearnMore={handleExitLearnMore}
      />
    );
  }
  if (!displayLearnMoreSearch) {
    return (
      <TableContainer style={{ backgroundColor: "#1DEFF4" }}>
        <Table aria-label="collapsible table">
          <TableBody>
            {plantsOnPage.map((row) => (
              <Row key={row.id} row={row} favorites={favorites} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
