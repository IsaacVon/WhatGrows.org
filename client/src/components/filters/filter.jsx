import React from "react";
import styled from "styled-components";
import filterBox from "../../assets/filterBox.png";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import LeafColor from "../../components/filters/leafColor";
import FlowerColor from "../../components/filters/flowerColor";

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
  return (
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
        Apply Filters
      </Button>
    </FilterContainer>
  );
}
