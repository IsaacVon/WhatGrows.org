import React from "react";
import styled from "styled-components";
import filterBox from "../../assets/filterBox.png";

import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import LeafColor from "../../components/filters/leafColor";
import FlowerColor from "../../components/filters/flowerColor";
import applyCircle from "../../assets/greenCircle.png";

const useStyles = makeStyles({
  root: {
    ":-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px green inset",
      backgroundColor: "green",
    },
    fontWeight: 400,
    flexGrow: 1,
    paddingBottom: 60,

    "& .MuiFormLabel-root": {
      color: "white",
      padding: 0,
      fontSize: "1.1rem",
      fontFamily: "Indie Flower",
      fontWeight: 400,
      letterSpacing: "0.04em",
    },

    "& .MuiButton-root": {
      color: "white",
      padding: 0,
      fontSize: "3rem",
      fontFamily: "Indie Flower",
      fontWeight: 400,
      letterSpacing: "0.04em",
      textTransform: "capitalize",
    },

    "& .MuiFormControl-root": {
      width: "140px",
    },

    "& .MuiInput-underline:before": {
      borderBottomColor: "#FFE116", // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#FFE116", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFE116", // Solid underline on focus
    },


    "& .MuiButton-containedPrimary": {
      borderRadius: "20px",
      height: "60px",
      color: "white", // Solid underline on focus
      fontWeight: "400",
      boxShadow: "none",
      backgroundColor: "#F89143",
      "&:hover": {
        backgroundColor: "#E27725",
      },
    },
  },
});

const Background = styled.section`
  width: 100%;
  height: 95px;
  position: relative;
  text-align: center;
  color: #1deff4;
  margin-top: 23px;
`;

const Logo = styled.img`
  height: 95px;
  overflow: hidden;
`;

const Text = styled.h3`
  font-size: 20px;
  margin: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FilterContainer = styled.section`
  position: relative;
  text-align: center;
  background-image: url(${filterBox});
  background-repeat: no-repeat;
  background-size: 330px;
  background-position-x: center;
  height: 400px;
  color: white;
  margin-top: 23px;
`;

const Circle = styled.img`
  height: 95px;
  overflow: hidden;
`;
export default function Filter({
  vegetableOnly,
  fruitOnly,
  zipCode,
  handleFilterChange,
  handlePlantSearchInput,
  handleMinHeightInput,
  handleMaxHeightInput,
  handleFlowerColorInput,
  handleLeafColorInput,
  handleSearch,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FilterContainer>
        <FormControlLabel
          disabled={vegetableOnly}
          control={
            <Checkbox
              checked={fruitOnly}
              onChange={() => handleFilterChange("fruitOnly")}
              name="checkedB"
              color="primary"
            />
          }
          label="Show Fruit Only"
        />

        <FormControlLabel
          disabled={fruitOnly}
          control={
            <Checkbox
              checked={vegetableOnly}
              onChange={() => handleFilterChange("vegetableOnly")}
              name="checkedB"
              color="primary"
            />
          }
          label="Show Vegetables Only"
        />

        <TextField
          label="Search for a plant"
          onChange={handlePlantSearchInput}
          autoFocus
        />
        <TextField
          label="Min Height (Inches)"
          onChange={handleMinHeightInput}
          autoFocus
        />
        <TextField
          label="Max Height (Inches)"
          onChange={handleMaxHeightInput}
          autoFocus
        />
        <FlowerColor handleFlowerColorInput={handleFlowerColorInput} />
        <LeafColor handleLeafColorInput={handleLeafColorInput} />
       

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={zipCode}
        >
                  <Circle src={applyCircle}></Circle>

          Apply Filters
        </Button>
      </FilterContainer>
    </div>
  );
}
