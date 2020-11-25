import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Gallery from "react-photo-gallery";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { GlobalContextConsumer } from "../globalContext";
import NotesBox from "./notesBox";

const useStyles = makeStyles({
  root: {
    maxWidth: 945,
  },
  media: {
    height: 140,
  },
});

const PlantName = styled.h1`
  font-size: 30px;
  text-align: center;
  letter-spacing: 2px;
`;

const TextContainer = styled.section`
  color: white;
  flex: 1 1 350px;
  margin-left: 20px;
  /* background-color: yellowgreen; */
`;

const GalleryContainer = styled.section`
  flex: 1 1 350px;
  display: grid;
  place-items: center;
  /* background-color: yellowgreen; */
`;

const BackButton = styled.button`
  padding: 10px;
  width: 100%;

  color: white;
  font-family: "Indie Flower";
  font-size: 20px;
  letter-spacing: 2px;

  cursor: pointer;

  border: none;
  background-color: transparent;

  &:hover {
    transition: background-color 0.2s ease-in-out;
    background-color: #ff7500;
    /* color: #1deff4; */
  }

  &:active {
    transition: 0.1s all;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
  }
`;

const CircularProgressContainer = styled.section`
  display: grid;
  place-items: center;
`;

const ButtonContainer = styled.section`
  background-color: #ffb400;
  width: 100%;
  text-align: center;
`;

const InfoWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #5cd700;
  overflow: hidden;
  margin: 45px;
  border-radius: 20px;
`;

const maxImageDisplay = 7;

export default function MoreInfo({ learnMore, handleExitLearnMore }) {
  const classes = useStyles();

  const [imagesLoaded, setimagesLoaded] = useState(false);
  const [imageArray, setImageArray] = useState([]);

  let imageUrlArrayUnextracted = learnMore.images;

  const calculateArrayLength = () => {
    let numberOfImages = 0;
    for (let key in imageUrlArrayUnextracted) {
      numberOfImages = numberOfImages + imageUrlArrayUnextracted[key].length;
    }
    return numberOfImages;
  };

  const calculatedArrayLength = calculateArrayLength();

  // Measure how many images are in url, then set it to max images -----------------------
  const calculateNumberOfImagesToDisplay = () => {
    if (calculatedArrayLength < maxImageDisplay) return calculatedArrayLength;
    else return maxImageDisplay;
  };

  const calculatedNumberOfImagesToDisplay = calculateNumberOfImagesToDisplay();

  let images = [];

  // If there are no pictures in images section of API, use main image
  if (calculatedNumberOfImagesToDisplay === 0) {
    imageUrlArrayUnextracted.flower = [{ image_url: learnMore.image_url }];
  }

  // Called by extractUrl function every time it iterates through a url
  const addToimageArray = async (imageUrl, lastUrl) => {
    var img = new Image();
    img.onload = function () {
      images = [
        ...images,
        {
          src: imageUrl,
          width: this.width, // Need to make them variable
          height: this.height,
        },
      ];
      // Stop at imageCountDisplay or when there no more images left
      if (images.length === calculatedNumberOfImagesToDisplay) {
        setimagesLoaded(true);
        setImageArray(images);
      }
    };

    img.src = imageUrl;
  };

  // pull urls from the api data and put them into one array of URLS
  const extractUrls = async () => {
    for (let key in imageUrlArrayUnextracted) {
      if (imageUrlArrayUnextracted.hasOwnProperty(key)) {
        const imageData = imageUrlArrayUnextracted[key];
        if (imageData.length > 0) {
          for (var i = 0; i < imageData.length; i++) {
            await addToimageArray(imageData[i].image_url);
            if (images.length === calculatedNumberOfImagesToDisplay) {
              break;
            }
          }
        }
      }
    }
  };

  // Runs main load of images
  if (!imagesLoaded) {
    extractUrls();
  }

  const renderContent = () => {
    if (!imagesLoaded) {
      return (
        <CircularProgressContainer>
          <CircularProgress style={{ color: "#FFE116" }} />
        </CircularProgressContainer>
      );
    }

    if (imagesLoaded) {
      return (
        <InfoWrapper>
          <ButtonContainer>
            <BackButton onClick={() => handleExitLearnMore()}>Exit</BackButton>
          </ButtonContainer>
          <GalleryContainer>
            <Gallery margin={0} photos={imageArray} />
          </GalleryContainer>
          <TextContainer>
            <PlantName>{learnMore.common_name}</PlantName>
            <p>Scientific Name: {learnMore.scientific_name}</p>
            <p>Family Common Name: {learnMore.family_common_name}</p>
            <p>Average Height: {learnMore.average_height_inches} Inches</p>
            <p>
              Maximum Precipitation:{" "}
              {learnMore.maximum_precipitation_annualInches} Inches
            </p>
            <p>
              Minimum Precipitation:
              {learnMore.minimum_precipitation_annualInches} Inches
            </p>
            <p>
              Minimum Root Depth: {learnMore.minimum_root_depth_inches} Inches
            </p>
            <p>Growth Rate: {learnMore.growth_rate}</p>
            <p>Bloom Months: {learnMore.bloom_months}</p>
            <p>Fruit Months: {learnMore.fruit_months}</p>
            <p>Growth Habit: {learnMore.growth_habit}</p>
            <p>Growth Months: {learnMore.growth_months}</p>

            {/* <GlobalContextConsumer>
            {(context) => (
                       
                <NotesBox
                  loggedIn={context.loggedIn}
                  id={row.plantId}
                  favorite={favorite.favorite}
                  notes={favorite.notes}
                />
     
            )}
          </GlobalContextConsumer> */}
          </TextContainer>
        </InfoWrapper>
      );
    }
  };

  return <>{renderContent()}</>;
}
