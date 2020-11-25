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
import SearchButton from "../components/searchButton";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Filter from "../components/filters/filter.jsx";
import filterBox from "../assets/filterBox.png";

const useStyles = (theme) => ({
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #36D8F0 inset",
      WebkitTextFillColor: "white",    
      // fontFamily: "Indie Flower",
      // fontSpacing: "2px",
    },
  },

  root: {
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

    "& .MuiSlider-root": {
      color: "#FFE116", // Solid underline on focus
    },

    "& .MuiFormLabel-root.Mui-focused": {
      color: "white", // Solid underline on focus
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

const FilterSearchContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SearchZipWrapper = styled.section`
  display: grid;
  place-items: center;
`;

const SearchZipContainer = styled.section`
  display: grid;
  place-items: center;
  flex: 0 1 500px;
  margin: 20px;
  height: 200px;
`;

const FilterContainer = styled.section`
  flex: 0 1 500px;
  margin: 20px;
`;

const CircularProgressContainer = styled.section`
  display: grid;
  place-items: center;
`;

class SearchZip extends Component {
  state = {
    displayFilters: false,
    displayZipSearch: true,
    displayLoading: false,
    displayTable: false,
    zipCodeValid: false,
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
    console.log("search button pressed");
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
    const { classes } = this.props;

    const renderLoading = () => {
      if (this.state.displayLoading)
        return (
          <CircularProgressContainer>
            <CircularProgress style={{ color: "#FFE116" }} />
          </CircularProgressContainer>
        );
    };

    const renderSearchZip = () => {
      if (this.state.displayZipSearch)
        return (
          <SearchZipWrapper>
            <div className={classes.root}>
              <SearchZipContainer>
                <TextField
                  inputProps={{ className: classes.input }}
                  label="Enter Zip Code"
                  id="zip"
                  // helperText={this.zipHelperText()}
                  onChange={this.handleZipInput}
                  autoFocus
                />

                <SearchButton
                  handleSearch={this.handleSearch}
                  zipCodeValid={this.state.zipCodeValid}
                />
              </SearchZipContainer>
            </div>
          </SearchZipWrapper>
        );
    };

    const renderPageNavigationButtons = () => {
      if (this.state.displayTable)
        return (
          <>
            <PageButtons
              handlePageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
            />
          </>
        );
    };

    const renderFilters = () => {
      if (this.state.displayFilters)
        return (
          <FilterContainer>
            <Filter
              vegetableOnly={this.state.vegetableOnly}
              fruitOnly={this.state.fruitOnly}
              zipCode={!this.state.zipCode}
              handleFilterChange={this.handleFilterChange}
              handlePlantSearchInput={this.handlePlantSearchInput}
              handleMinHeightInput={this.handleMinHeightInput}
              handleMaxHeightInput={this.handleMaxHeightInput}
              handleFlowerColorInput={this.handleFlowerColorInput}
              handleLeafColorInput={this.handleLeafColorInput}
              ha
              ndleSearch={this.handleSearch}
            />
          </FilterContainer>
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
        <FilterSearchContainer>
          {renderFilters()}
          {renderSearchZip()}
        </FilterSearchContainer>
        {renderLoading()}
        {renderTable()}
        {renderPageNavigationButtons()}
      </>
    );
  }
}

export default withStyles(useStyles)(SearchZip);
