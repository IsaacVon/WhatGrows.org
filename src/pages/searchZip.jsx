import React, { Component } from "react";
import { zipCodeToPlants, requestPlantList } from "../utils/zipCodeToPlants";
import SearchBox from "../components/searchBox";
import PlantTable from "../components/plantTable";
import PageButtons from "../components/pageButtons";
import Button from "@material-ui/core/Button";

class SearchZip extends Component {
  state = {
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
    flowerColor: "yellow"
  };

  // Inputs to set state
  handleZipInput = (event) => {
    this.setState({
      zipCode: event.target.value,
    });
  };

  handlePlantSearchInput = (event) => {
    this.setState({
      plantSearch: event.target.value,
    });
  };

  handleMinHeightInput = (event) => {
    this.setState({
      minHeight: event.target.value,
    });
  };

  handleMaxHeightInput = (event) => {
    this.setState({
      maxHeight: event.target.value,
    });
  };

  // Buttons to set state

  handlePageChange = async (requestedPage) => {
    // send plant list request from page number and temp min

    const dataForPlantRequest = {
      currentPage: requestedPage,
      tempMin: this.state.tempMin,
      filters: this.state.filterString,
    };

    const data = await requestPlantList(dataForPlantRequest);

    this.setState({
      currentPage: requestedPage,
      plantsOnPage: data.data,
      totalPlants: data.meta.total,
      totalPages: Math.ceil(data.meta.total / 20),
    });
  };

  buildFilterString = async () => {
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
      const leafColorApiString = baseSearchApiString.concat(this.state.leafColor);
      filterString = filterString.concat(leafColorApiString);
    }
    if (this.state.flowerColor) {
      const baseSearchApiString = "&filter%5Bflower_color%5D=";
      const flowerColorApiString = baseSearchApiString.concat(this.state.flowerColor);
      filterString = filterString.concat(flowerColorApiString);
    }


    this.setState({
      filterString,
    });

  };

  handleFilterChange = (event) => {
    // Need to make it able to toggle off
    if (event === "vegetableOnly" || event === "fruitOnly") {
      console.log("event", event);
      this.setState({
        [event]: true,
      });
    }
    // compile filter string and send it to RequestPlantList
  };

  // Final Search button
  handleSearch = async () => {
    await this.buildFilterString();

    const data = await zipCodeToPlants(
      this.state.zipCode,
      this.state.filterString
    );

    this.setState({
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
    return (
      <>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => this.handleFilterChange("fruitOnly")}
        >
          Click for fruit
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => this.handleFilterChange("vegetableOnly")}
        >
          Click for vegetable
        </Button>
        <SearchBox
          displayText="Search for a plant"
          handleZipInput={this.handlePlantSearchInput}
        />
        <SearchBox
          displayText="Min Height (centimeters)"
          handleZipInput={this.handleMinHeightInput}
        />
        <SearchBox
          displayText="Max Height (centimeters)"
          handleZipInput={this.handleMaxHeightInput}
        />

        <p>Zip Code: {this.state.zipCode}</p>
        <p>USDA Hardiness Zone: {this.state.usdaHardinessZone}</p>
        <p>Plant Results: {this.state.totalPlants}</p>
        <p>Current Page: {this.state.currentPage}</p>
        <p>Filters </p>

        <SearchBox
          displayText="Enter Zip Code"
          handleZipInput={this.handleZipInput}
        />
        <PageButtons
          handleSearch={this.handleSearch}
          handlePageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
          totalPages={this.state.totalPages}
          zipCode={this.state.zipCode}
        />
        <PlantTable plantsOnPage={this.state.plantsOnPage} />
      </>
    );
  }
}

export default SearchZip;
