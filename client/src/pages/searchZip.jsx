import React, { Component } from "react";
import { postcodeValidator, postcodeValidatorExists } from "postcode-validator";
import { zipCodeToPlants, requestPlantList } from "../utils/zipCodeToPlants";
import PlantTable from "../components/plantTable";
import PageButtons from "../components/pageButtons";
import Button from "@material-ui/core/Button";
import FlowerColor from "../components/filters/flowerColor";
import LeafColor from "../components/filters/leafColor";
import { GlobalContextConsumer } from "../globalContext";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SearchButton from "../components/searchButton";
import styled from "styled-components";

const SearchZipPositioner = styled.section`
  display: grid;
  place-items: center;
`;

class SearchZip extends Component {
  state = {
    displayFilters: false,
    displayZipSearch: true,
    displayLoading: false,
    displayTable: false,
    zipCodeValid: true,
    zipCode: 0,
    usdaHardinessZone: "",
    tempMin: 0,
    totalPlants: 0,
    totalPages: 0,
    currentPage: 1,
    plantsOnPage: [],
    // Filters
    filterString: "",
    fruitOnly: false,
    vegetableOnly: false,
    plantSearch: "",
    minHeight: 0,
    maxHeight: 0,
    leafColor: "",
    flowerColor: "",
  };

  // Inputs to set state
  handleZipInput = (event) => {
    this.setState({
      zipCode: event.target.value,
      zipCodeValid: postcodeValidator(event.target.value, "US"),
    });
  };

  handlePlantSearchInput = (event) => {
    this.setState({
      plantSearch: event.target.value,
    });
  };

  handleMinHeightInput = (event) => {
    const minHeightInches = event.target.value;
    const minHeightCentimeters = Math.ceil(minHeightInches * 2.54);
    this.setState({
      minHeight: minHeightCentimeters,
    });
  };

  handleMaxHeightInput = (event) => {
    const maxHeightInches = event.target.value;
    const maxHeightCentimeters = Math.ceil(maxHeightInches * 2.54);
    this.setState({
      maxHeight: maxHeightCentimeters,
    });
    this.buildFilterString();
  };

  handleFlowerColorInput = (color) => {
    const colorString = color.toString();
    const lowerCaseColorString = colorString.toLowerCase();
    this.setState({
      flowerColor: lowerCaseColorString,
    });
  };

  handleLeafColorInput = (color) => {
    const colorString = color.toString();
    const lowerCaseColorString = colorString.toLowerCase();
    this.setState({
      leafColor: lowerCaseColorString,
    });
  };

  handlePageChange = async (requestedPage) => {
    // send plant list request from page number and temp min

    this.setState({
      displayLoading: true,
      displayTable: false,
    });

    const dataForPlantRequest = {
      currentPage: requestedPage,
      tempMin: this.state.tempMin,
      filterString: this.state.filterString,
    };

    const data = await requestPlantList(dataForPlantRequest);

    this.setState({
      currentPage: requestedPage,
      plantsOnPage: data.data,
      totalPlants: data.meta.total,
      totalPages: Math.ceil(data.meta.total / 20),
    });

    this.setState({
      displayLoading: false,
      displayTable: true,
    });
  };

  buildFilterString = () => {
    let filterString = "";
    if (this.state.fruitOnly) {
      const fruitApiString = "&filter%5Bfruit_conspicuous%5D=true";
      filterString = filterString.concat(fruitApiString);
    }
    if (this.state.vegetableOnly) {
      const vegetableApiString = "&filter%5Bvegetable%5D=true";
      filterString = filterString.concat(vegetableApiString);
    }
    if (this.state.plantSearch) {
      const baseSearchApiString = "&filter%5Bcommon_name%5D=";
      const searchTerm = this.state.plantSearch;
      const plantSearchApiString = baseSearchApiString.concat(searchTerm);
      filterString = filterString.concat(plantSearchApiString);
    }
    if (this.state.minHeight || this.state.maxHeight) {
      const { minHeight, maxHeight } = this.state;
      const baseHeightApiString = "&range%5Baverage_height_cm%5D=";
      const minHeightAddon = minHeight ? minHeight : "";
      const maxHeightAddon = maxHeight ? "," + maxHeight : "";

      let heightApiString = baseHeightApiString.concat(
        minHeightAddon + maxHeightAddon
      );

      filterString = filterString.concat(heightApiString);
    }
    if (this.state.leafColor) {
      const baseSearchApiString = "&filter%5Bfoliage_color%5D=";
      const leafColorApiString = baseSearchApiString.concat(
        this.state.leafColor
      );
      filterString = filterString.concat(leafColorApiString);
    }
    if (this.state.flowerColor) {
      const baseSearchApiString = "&filter%5Bflower_color%5D=";
      const flowerColorApiString = baseSearchApiString.concat(
        this.state.flowerColor
      );
      filterString = filterString.concat(flowerColorApiString);
    }
    this.setState({
      filterString,
    });
  };

  handleFilterChange = (filterType) => {
    // Need to make it able to toggle off
    if (filterType === "vegetableOnly") {
      const toggle = this.state.vegetableOnly ? false : true;
      this.setState({
        vegetableOnly: toggle,
      });
    }

    if (filterType === "fruitOnly") {
      const toggle = this.state.fruitOnly ? false : true;
      this.setState({
        fruitOnly: toggle,
      });
    }

    // || filterType === "fruitOnly") {
    //   this.setState({
    //     [filterType]: true,
    //   });
    // }
    // compile filter string and send it to RequestPlantList
  };

  zipHelperText = () => {
    if (!this.state.zipCodeValid && this.state.zipCode !== "") {
      return "Please enter valid zip";
    }
  };

  // Final Search button
  handleSearch = async () => {
    this.setState({
      displayLoading: true,
      displayTable: false,
    });
    const filterString = await this.buildFilterString();
    const data = await zipCodeToPlants(
      this.state.zipCode,
      this.state.filterString
    );

    this.setState({
      displayFilters: true,
      displayZipSearch: true,
      displayLoading: false,
      displayTable: true,
      zipCodeValid: true,
      usdaHardinessZone: data.usdaHardinessZone,
      tempMin: data.tempMin,
      totalPlants: data.totalPlants,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      plantsOnPage: data.plantsOnPage,
    });
  };

  render() {
    const renderLoading = () => {
      if (this.state.displayLoading) return <CircularProgress />;
    };

    const renderSearchZip = () => {
      if (this.state.displayZipSearch)
        return (
          <>
            <TextField
              label="Enter Zip Code"
              id="zip"
              helperText={this.zipHelperText()}
              onChange={this.handleZipInput}
              autoFocus
            />
            <Button
              color="primary"
              onClick={this.handleSearch}
              disabled={!this.state.zipCodeValid}
            >
              <SearchButton />
            </Button>
          </>
        );
    };

    const renderPageNavigationButtons = () => {
      if (this.state.displayTable)
        return (
          <>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                this.handlePageChange(1);
              }}
              disabled={this.state.currentPage === 1 ? true : false}
            >
              First
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                this.handlePageChange(this.state.currentPage - 1);
              }}
              disabled={this.state.currentPage === 1 ? true : false}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                this.handlePageChange(this.state.currentPage + 1);
              }}
              disabled={
                this.state.currentPage === this.state.totalPages ? true : false
              }
            >
              Next
            </Button>{" "}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                this.handlePageChange(this.state.totalPages);
              }}
              disabled={
                this.state.currentPage === this.state.totalPages ? true : false
              }
            >
              Last
            </Button>
          </>
        );
    };

    const renderFilters = () => {
      if (this.state.displayFilters)
        return (
          <>
            <FormControlLabel
              disabled={this.state.vegetableOnly}
              control={
                <Checkbox
                  checked={this.state.fruitOnly}
                  onChange={() => this.handleFilterChange("fruitOnly")}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Show Fruit Only"
            />

            <FormControlLabel
              disabled={this.state.fruitOnly}
              control={
                <Checkbox
                  checked={this.state.vegetableOnly}
                  onChange={() => this.handleFilterChange("vegetableOnly")}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Show Vegetables Only"
            />

            <TextField
              label="Search for a plant"
              onChange={this.handlePlantSearchInput}
              autoFocus
            />
            <TextField
              label="Min Height (Inches)"
              onChange={this.handleMinHeightInput}
              autoFocus
            />
            <TextField
              label="Max Height (Inches)"
              onChange={this.handleMaxHeightInput}
              autoFocus
            />
            <FlowerColor handleFlowerColorInput={this.handleFlowerColorInput} />
            <LeafColor handleLeafColorInput={this.handleLeafColorInput} />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSearch}
              disabled={!this.state.zipCode}
            >
              Apply Filters
            </Button>
          </>
        );
    };

    const renderTable = () => {
      if (this.state.displayTable)
        return (
          <>
            <GlobalContextConsumer>
              {(context) => (
                <PlantTable
                  plantsOnPage={this.state.plantsOnPage}
                  favorites={context.favorites}
                  addFavorite={context.addFavorite}
                  displayLearnMoreSearch={context.displayLearnMoreSearch}
                  handleExitLearnMore={context.handleExitLearnMore}
                  learnMore={context.learnMore}
                />
              )}
            </GlobalContextConsumer>
          </>
        );
    };

    return (
      <>
        {renderFilters()}
        <SearchZipPositioner>{renderSearchZip()}</SearchZipPositioner>
        {renderPageNavigationButtons()}
        {renderLoading()}
        {renderTable()}
      </>
    );
  }
}

export default SearchZip;
