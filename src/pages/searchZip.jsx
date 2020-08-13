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
  };

  handleZipInput = (event) => {
    this.setState({
      zipCode: event.target.value,
    });
  };

  handleSearch = async () => {
    const data = await zipCodeToPlants(
      this.state.zipCode,
      this.state.filterString
    );
    console.log("Results", data);

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

  handlePageChange = async (requestedPage) => {
    // send plant list request from page number and temp min

    const dataForPlantRequest = {
      currentPage: requestedPage,
      tempMin: this.state.tempMin,
      filters: this.state.filterString,
    };

    const data = await requestPlantList(dataForPlantRequest);
    console.log("page change data: ", data);

    this.setState({
      currentPage: requestedPage,
      plantsOnPage: data.data,
      totalPlants: data.meta.total,
      totalPages: Math.ceil(data.meta.total / 20),
    });
  };

  buildFilterString = () => {
    let filterString = "";
    if (this.state.fruitOnly) {
      const fruitApiString = "&filter%5Bfruit_conspicuous%5D=true";
      filterString = filterString.concat(fruitApiString);
      console.log("filterString", filterString);
    }
    if (this.state.vegetableOnly) {
      console.log("vegetableOnly", this.state.vegetableOnly);
      const fruitApiString = "&filter%5Bvegetable%5D=true";
      filterString = filterString.concat(fruitApiString);
      console.log("filterString", filterString);
    }

    this.setState(
      {
        filterString,
      },
      this.handleSearch
    );
  };

  handleFilterChange = (event) => {
    const toggle = this.state.event;
    console.log("toggle", toggle);
    this.setState({
      [event]: true,
    });
    // compile filter string and send it to RequestPlantList
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={this.buildFilterString}
        >
          buildFilterString / Apply Filters
        </Button>

        <p>Zip Code: {this.state.zipCode}</p>
        <p>USDA Hardiness Zone: {this.state.usdaHardinessZone}</p>
        <p>Plant Results: {this.state.totalPlants}</p>
        <p>Current Page: {this.state.currentPage}</p>

        <SearchBox
          displayText="Enter Zip Code"
          handleZipInput={this.handleZipInput}
        />
        <PageButtons
          handleSearch={this.handleSearch}
          handlePageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
          totalPages={this.state.totalPages}
        />
        <PlantTable plantsOnPage={this.state.plantsOnPage} />
      </>
    );
  }
}

export default SearchZip;
