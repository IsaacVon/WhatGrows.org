import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Gallery from "react-photo-gallery";

const useStyles = makeStyles({
  root: {
    maxWidth: 945,
  },
  media: {
    height: 140,
  },
});

export default function MoreInfo({ learnMore, handleExitLearnMore }) {
  const classes = useStyles();


  const [imagesLoaded, setimagesLoaded] = useState(false);
  const [imageArray, setImageArray] = useState([]);


  let imageUrlArrayUnextracted = learnMore.images;

  // let images = [{ src: learnMore.image_url, width: 1, height: 1 }];

  let images = [];

  const maxImageDisplay = 7
 
  // Called by extractUrl function every time it iterates through a url
  const addToimageArray = async (imageUrl) => {
    var img = new Image();
    img.onload = function () {
      console.log("image added", imageUrl)
      images = [
        ...images,
        {
          src: imageUrl,
          width: this.width, // Need to make them variable
          height: this.height,
        },
      ];

      // Stop at imageCountDisplay or when there no more images left
      if (images.length === maxImageDisplay ) {
        console.log("images insideaddToimageArray", images);
        setImageArray(images)
        setimagesLoaded(true)
      }
    };

    img.src = imageUrl;
  };

  // Adds thumbnail image to array
  addToimageArray(learnMore.image_url)

  
  // pull urls from the api data and put them into one array of URLS
  const extractUrls = async () => {
    if (images.length === 0) {
      for (var key in imageUrlArrayUnextracted) {
        if (imageUrlArrayUnextracted.hasOwnProperty(key)) {
          const imageData = imageUrlArrayUnextracted[key];
          if (imageData.length > 0) {
            for (var i = 0; i < imageData.length; i++) {
              
              await addToimageArray(imageData[i].image_url)
            }
          }
        }
      } 
    }
  }

// Runs main load of images
console.log("imagesLoaded", imagesLoaded)
if(!imagesLoaded) {
  extractUrls()

}



  // No magic 7
  // array of URLs
  // array of promises that you wait for all of them to resolve

  return (
    <Card className={classes.root}>
      <Button onClick={() => handleExitLearnMore()}>Exit</Button>
      <Gallery margin={2} photos={imageArray} />;
      <CardContent>
        {learnMore.common_name}

        <p>Scientific Name: {learnMore.scientific_name}</p>
        <p>Family Common Name: {learnMore.family_common_name}</p>
        <p>Average Height: {learnMore.average_height_inches} Inches</p>
        <p>
          Maximum Precipitation: {learnMore.maximum_precipitation_annualInches}{" "}
          Inches
        </p>
        <p>
          Minimum Precipitation:
          {learnMore.minimum_precipitation_annualInches} Inches
        </p>
        <p>Minimum Root Depth: {learnMore.minimum_root_depth_inches} Inches</p>
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
