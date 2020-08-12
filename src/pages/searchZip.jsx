import React, { Component } from "react";
import { zipCodeToPlants, requestPlantList } from "../utils/zipCodeToPlants";
import Button from "@material-ui/core/Button";
import SearchBox from "../components/searchBox";
import PlantTable from "../components/plantTable";

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
  };

  handleZipInput = (event) => {
    this.setState({
      zipCode: event.target.value,
    });
  };

  handleSearch = async () => {
    const data = await zipCodeToPlants(this.state.zipCode);
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

  handlePageChange = async (incrementSize) => {
    // send plant list request from page number and temp min
    const currentPage = this.state.currentPage + incrementSize;

    const dataForPlantRequest = {
      currentPage,
      tempMin: this.state.tempMin,
    };

    const data = await requestPlantList(dataForPlantRequest);
    console.log("page change data: ", data);

    this.setState({
      currentPage: currentPage,
      plantsOnPage: data.data,
    });
  };

  // renderPlantsOnPage = ()

  render() {
    return (
      <>
        <SearchBox
          displayText="Enter Zip Code"
          handleZipInput={this.handleZipInput}
        />
        <h1>Zip Code: {this.state.zipCode}</h1>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={this.handleSearch}
        >
          Search
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            this.handlePageChange(1);
          }}
          disabled={
            this.state.currentPage === this.state.totalPages ? true : false
          }
        >
          Next Page
        </Button>{" "}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            this.handlePageChange(this.state.totalPages - 1);
          }}
          disabled={
            this.state.currentPage === this.state.totalPages ? true : false
          }
        >
          Last
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            this.handlePageChange(-1);
          }}
          disabled={this.state.currentPage === 1 ? true : false}
        >
          Previous Page
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            this.handlePageChange(1 - this.state.currentPage);
          }}
          disabled={this.state.currentPage === 1 ? true : false}
        >
          First Page
        </Button>
        <PlantTable plantsOnPage={this.state.plantsOnPage} />
      </>
    );
  }
}

export default SearchZip;
