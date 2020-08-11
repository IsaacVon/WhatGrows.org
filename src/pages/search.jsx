import React, { Component } from "react";
import { zipCodeToPlants, requestPlantList } from "../utils/zipCodeToPlants";

class Search extends Component {
  state = {
    zipCodeValid: true,
    zipCode: 92618, // This will be an input or something
    tempMin: 0,
    currentPage: 1,
    totalPages: 0,
    plantsOnPage: {},
  };

  onPlacesChanged = async () => {
    const data = await zipCodeToPlants(this.state.zipCode);
    console.log("Results", data);

    this.setState({
      zipCodeValid: true,
      tempMin: data.tempMin,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      plantsOnPage: data.plantsOnPage,
    });
  };

  render() {
    this.onPlacesChanged();

    return (
      <>
        <h1>Linked</h1>
      </>
    );
  }
}

export default Search;
