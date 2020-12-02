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
      color: "#FFE116",
      // color: "#00FBFF",
    },

    "& > *": {
      borderBottom: "unset",
    },
  },
});

const ImageContainer = styled.section`
  position: relative;

  border-radius: 20px;
  overflow: hidden;
  margin: 40px 0px;

  @media ${device.mobileS} {
    width: 150px;
    height: 230px;
  }
  @media ${device.tablet} {
    width: auto;
  }
`;

const HeartTextContainer = styled.section`
  @media ${device.mobileS} {
    display: grid;
    place-items: center;
    margin-bottom: 10px;
  }
  @media ${device.tablet} {
    display: flex;
    margin-bottom: 10px;
  }
`;

const HeartContainer = styled.section`
  @media ${device.mobileS} {
    margin-bottom: 0px;
  }
  @media ${device.tablet} {
    margin-bottom: 5px;
  }
`;

const PlantImage = styled.img`
  height: 100%;
  border-radius: 20px;
`;

const TextContainer = styled.section`
  @media ${device.mobileS} {
    margin-right: 20px;
  }
  @media ${device.tablet} {
    margin-right: 100px;
  }
`;

const Row = (props) => {
  const { row, favorites } = props;
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

  if (row.image) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell align="center" component="th" scope="row">
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

          <TableCell align="center">
            <TextContainer>
              <GlobalContextConsumer>
                {(context) => (
                  <>
                    <HeartTextContainer>
                      <HeartContainer>
                        <IconButton
                          disabled={!context.loggedIn}
                          onClick={() => {
                            let newRow = row;
                            newRow.id = row.plantId;
                            // console.log("row",newRow,"favorite.favorite",favorite.favorite)

                            context.handleFavoriteClick(
                              newRow,
                              favorite.favorite
                            );
                          }}
                          size="small"
                        >
                          <Like liked={favorite.favorite} />
                        </IconButton>
                      </HeartContainer>




                      <Button
                        onClick={() =>
                          context.handleLearnMoreFavorites(
                            row.plantUrl,
                            row.plantId,
                            favorite.favorite,
                            favorite.notes
                          )
                        }
                      >
                        {row.common_name}
                      </Button>

                      
                    </HeartTextContainer>






                    <NotesBox
                      loggedIn={context.loggedIn}
                      id={row.plantId}
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
  }

  if (!row.image) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell align="right" component="th" scope="row">
            <GlobalContextConsumer>
              {(context) => (
                <Button
                  onClick={() => context.handleLearnMoreFavorites(row.plantUrl)}
                >
                  <ImageContainer></ImageContainer>
                </Button>
              )}
            </GlobalContextConsumer>
          </TableCell>

          <TableCell align="center">
            <TextContainer>
              <GlobalContextConsumer>
                {(context) => (
                  <>
                    <Button
                      onClick={() =>
                        context.handleLearnMoreFavorites(
                          row.plantUrl,
                          row.plantId,
                          favorite.favorite,
                          favorite.notes
                        )
                      }
                    >
                      {row.common_name}
                    </Button>
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
                    <NotesBox
                      loggedIn={context.loggedIn}
                      id={row.plantId}
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
  }
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
