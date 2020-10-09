import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Gallery from "react-photo-gallery";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: 945,
  },
  media: {
    height: 140,
  },
});

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
      return <CircularProgress />;
    }

    if (imagesLoaded) {
      return (
        <Card className={classes.root}>
          <Button onClick={() => handleExitLearnMore()}>Exit</Button>
          <Gallery margin={2} photos={imageArray} />
          <CardContent>
            {learnMore.common_name}

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

            {/* {learnMore.images} */}
          </CardContent>
        </Card>
      );
    }
  };

  return <>{renderContent()}</>;
}
