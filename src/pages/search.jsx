import React, { Component } from "react";
import { zipCodeToPlants } from "../utils/zipCodeToPlants";

class Search extends Component {
  state = {};

  render() {
    zipCodeToPlants();
    return (
      <>
        <h1>Linked</h1>
      </>
    );
  }
}

export default Search;
