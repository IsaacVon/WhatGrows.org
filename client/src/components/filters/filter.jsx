import React from "react";
import styled from "styled-components";
import filterBox from "../../assets/filterBox.png";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import LeafColor from "../../components/filters/leafColor";
import FlowerColor from "../../components/filters/flowerColor";
import applyCircle from "../../assets/greenCircle.png";
import searchCircle from "../../assets/searchCircleButton.png";
import colors from "../../config/colors"

const useStyles = makeStyles({
  root: {
    ":-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px green inset",
      backgroundColor: "green",
    },
    fontWeight: 400,
    flexGrow: 1,
    paddingBottom: 60,

    "& .MuiCheckbox-root": {
      color: "white",
    },

    "& .MuiTypography-body1": {
      fontFamily: "Indie Flower",
      fontSize: "1.1rem",
      letterSpacing: "0.04em",
    },

    "& .MuiInputBase-input": {
      color: "white",
    },

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
      width: "170px",
    },

    "& .MuiInput-underline:before": {
      borderBottomColor: colors.yellow, // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: colors.yellow, // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: colors.yellow, // Solid underline on focus
    },

    "& .MuiButton-containedPrimary": {
      borderRadius: "20px",
      height: "60px",
      color: "white", // Solid underline on focus
      fontWeight: "400",
      boxShadow: "none",
      backgroundColor: colors.orange,
      "&:hover": {
        backgroundColor: colors.darkOrange,
      },
    },
  },
});

const FilterContainer = styled.section`
  display: grid;
  place-items: center;

  position: relative;
  text-align: center;
  background-image: url(${filterBox});
  background-repeat: no-repeat;
  background-size: 371px;
  background-position-x: center;
  height: 401px;
  color: white;
  margin-top: 23px;
`;

const ApplyButtonWrapper = styled.section`
  position: relative;
  left: 127px;
  bottom: 52px;
`;

const CheckBoxWrapper = styled.section`
  display: grid;
  position: relative;
  right: 35px;
  bottom: -10px;
`;

const ApplyButton = styled.button`
  color: white;
  font-family: "Indie Flower";
  font-size: 20px;
  letter-spacing: 2px;
  margin-bottom: 20px;

  cursor: pointer;

  border: none;
  background-color: transparent;
  background-image: url(${applyCircle});
  background-size: 74px;

  height: 74px;
  width: 74px;

  &:hover {
    /* background-color: palevioletred; */
    /* color: #1deff4; */
  }

  &:active {
    background-image: url(${searchCircle});
    transition: 0.1s all;

    color: #50ff00;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
  }
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
        <CheckBoxWrapper>
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
            label="Fruit Only"
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
            label="Vegetables Only"
          />
        </CheckBoxWrapper>
        <ApplyButtonWrapper>
          <ApplyButton
            onClick={handleSearch}
            // disabled={zipCode}
          >
            Apply
          </ApplyButton>
        </ApplyButtonWrapper>
      </FilterContainer>
    </div>
  );
}
