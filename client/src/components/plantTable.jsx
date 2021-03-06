import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import { GlobalContextConsumer } from "../globalContext";
import colors from "../config/colors";
import Like from "./likeButton";
import NotesBox from "./notesBox";
import MoreInfo from "../components/moreInfo";
import { device } from "../utils/device";

const useRowStyles = makeStyles({
  root: {
    "& .MuiButton-root ": {
      color: colors.white,
      fontSize: "20px",
      fontFamily: "Indie Flower",
      letterSpacing: "2px",
    },

    "& .MuiTableCell-root": {
      padding: "0px",
    },

    "& .MuiIconButton-root": {
      color: colors.yellow,
    },

    "& > *": {
      borderBottom: "unset",
    },
  },
});

const TableWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
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

  const favorite = isFavorite(row.id);

  if (row.image_url) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell align="center" component="th" scope="row">
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
                    <HeartTextContainer>
                      <HeartContainer>
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
                      </HeartContainer>

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
                    </HeartTextContainer>

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
  }

  if (!row.image_url) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell align="right" component="th" scope="row">
            <GlobalContextConsumer>
              {(context) => (
                <Button disabled>
                  <ImageContainer></ImageContainer>
                </Button>
              )}
            </GlobalContextConsumer>
          </TableCell>

          <TableCell align="left">
            <TextContainer>
              <GlobalContextConsumer>
                {(context) => (
                  <>
                    <IconButton disabled>
                      <Like liked={favorite.favorite} />
                    </IconButton>
                    <Button disabled>{row.common_name}</Button>
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
  }
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
      <TableWrapper>
        <TableContainer
          style={{ backgroundColor: colors.blue, maxWidth: "1000px" }}
        >
          <Table aria-label="collapsible table">
            <TableBody>
              {plantsOnPage.map((row) => (
                <Row key={row.id} row={row} favorites={favorites} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    );
  }
}
