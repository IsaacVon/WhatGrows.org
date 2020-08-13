import React, { Component } from "react";
import { zipCodeToPlants, requestPlantList } from "../utils/zipCodeToPlants";
import SearchBox from "../components/searchBox";
import PlantTable from "../components/plantTable";
import PageButtons from "../components/pageButtons"

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

  handlePageChange = async (requestedPage) => {
    // send plant list request from page number and temp min

    const dataForPlantRequest = {
      currentPage: requestedPage,
      tempMin: this.state.tempMin,
    };

    const data = await requestPlantList(dataForPlantRequest);
    console.log("page change data: ", data);

    this.setState({
      currentPage: requestedPage,
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
        <h1>USDA Hardiness Zone: {this.state.usdaHardinessZone}</h1>
        <h1>Plant Results: {this.state.totalPlants}</h1>
        <h1>Current Page: {this.state.currentPage}</h1>
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
