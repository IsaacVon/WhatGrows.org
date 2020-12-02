import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Gallery from "react-photo-gallery";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { device } from "../utils/device";

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

const PlantDetails = styled.p`
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  letter-spacing: 1px;
`;

const NoteBoxContainer = styled.section`
  /* background-color: green; */
  display: grid;
  place-items: center;
  height: 150px;
  margin: 30px 30px 30px 0px;
`;

const Test = styled.section`
  width: 100%;
`;

const TextContainer = styled.section`
  color: white;
  flex: 1 1 100px;
  margin-left: 20px;
  margin-bottom: 20px;

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
  flex-wrap: wrap-reverse;
  justify-content: center;
  overflow: hidden;
  border-radius: 20px;
  /* background-color: #5cd700; */

  @media ${device.mobileS} {
    background-color: #5cd700;
    margin: 10px 10px;

  }
  @media ${device.tablet} {
    background-color: purple;
    margin: 45px;

  }
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

  const checkForNullData = (data) => {
    return data ? data : "-";
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
            <PlantDetails>
              <p>
                <b>Scientific Name:</b>{" "}
                {checkForNullData(learnMore.scientific_name)}
              </p>
              <p>
                <b>Family Common Name:</b>{" "}
                {checkForNullData(learnMore.family_common_name)}
              </p>
              <p>
                <b>Average Height:</b>{" "}
                {checkForNullData(learnMore.average_height_inches)} Inches
              </p>
              <p>
                <b>Maximum Precipitation: </b>
                {checkForNullData(learnMore.maximum_precipitation_annualInches)}
                Inches
              </p>
              <p>
                <b>Minimum Precipitation: </b>
                {checkForNullData(
                  learnMore.minimum_precipitation_annualInches
                )}{" "}
                Inches
              </p>
              <p>
                <b>Minimum Root Depth: </b>
                {checkForNullData(learnMore.minimum_root_depth_inches)}
                Inches
              </p>
              <p>
                <b>Growth Rate: </b> {checkForNullData(learnMore.growth_rate)}
              </p>
              <p>
                <b>Bloom Months: </b> {checkForNullData(learnMore.bloom_months)}
              </p>
              <p>
                <b>Fruit Months:</b> {checkForNullData(learnMore.fruit_months)}
              </p>
              <p>
                <b>Growth Habit:</b> {checkForNullData(learnMore.growth_habit)}
              </p>
              <p>
                <b>Growth Months:</b>{" "}
                {checkForNullData(learnMore.growth_months)}
              </p>
            </PlantDetails>

            {/* <NoteBoxContainer>
              <Test>
                <GlobalContextConsumer>
                  {(context) => (
                    <NotesBox
                      loggedIn={context.loggedIn}
                      id={context.learnMore.plantId}
                      favorite={context.learnMore.favorite}
                      notes={context.learnMore.notes}
                    />
                  )}
                </GlobalContextConsumer>
              </Test>
            </NoteBoxContainer> */}
          </TextContainer>
        </InfoWrapper>
      );
    }
  };

  return <>{renderContent()}</>;
}
