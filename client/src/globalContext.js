import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import config from "./config.json";
import { requestMorePlantInfo } from "./utils/zipCodeToPlants";

const _ = require("lodash");
const { Provider, Consumer } = React.createContext();

class GlobalContextProvider extends Component {
  state = {
    loggedIn: false,
    jwt: "",
    name: "",
    favorites: [],
    displayLearnMoreSearch: false,
    displayLearnMoreFavorites: false,
    learnMore: {},
  };

  handleExitLearnMore = async () => {
    this.setState({
      displayLearnMoreFavorites: false,
      displayLearnMoreSearch: false,
    });
  };



  handleLearnMoreFavorites = async (plantLink, plantId, favorite) => {



    console.log("plant id ", plantId, favorite)


    const { data } = await requestMorePlantInfo(plantLink);
    const learnMore = {
      common_name: data.common_name,
      image_url: data.image_url,
      scientific_name: data.scientific_name,
      family_common_name: data.main_species.family_common_name,
      duration: data.main_species.duration,
      images: data.main_species.images,
      growth_rate: data.main_species.specifications.growth_rate,
      growth_habit: data.main_species.specifications.growth_habit,
      average_height_inches: Math.round(
        data.main_species.specifications.average_height.cm * 0.393701
      ),
      growth_months: data.main_species.growth.growth_months,
      bloom_months: data.main_species.growth.bloom_months,
      fruit_months: data.main_species.growth.fruit_months,
      minimum_precipitation_annualInches: Math.round(
        data.main_species.growth.minimum_precipitation.mm * 0.0393701
      ),
      maximum_precipitation_annualInches: Math.round(
        data.main_species.growth.maximum_precipitation.mm * 0.0393701
      ),
      minimum_root_depth_inches: Math.round(
        data.main_species.growth.minimum_root_depth.cm * 0.393701
      ),
    };
    this.setState({
      learnMore,
      displayLearnMoreFavorites: true,
    });
  };

  handleLearnMoreSearch = async (plantLink) => {
    const { data } = await requestMorePlantInfo(plantLink);
    const learnMore = {
      common_name: data.common_name,
      image_url: data.image_url,
      scientific_name: data.scientific_name,
      family_common_name: data.main_species.family_common_name,
      duration: data.main_species.duration,
      images: data.main_species.images,
      growth_rate: data.main_species.specifications.growth_rate,
      growth_habit: data.main_species.specifications.growth_habit,
      average_height_inches: Math.round(
        data.main_species.specifications.average_height.cm * 0.393701
      ),
      growth_months: data.main_species.growth.growth_months,
      bloom_months: data.main_species.growth.bloom_months,
      fruit_months: data.main_species.growth.fruit_months,
      minimum_precipitation_annualInches: Math.round(
        data.main_species.growth.minimum_precipitation.mm * 0.0393701
      ),
      maximum_precipitation_annualInches: Math.round(
        data.main_species.growth.maximum_precipitation.mm * 0.0393701
      ),
      minimum_root_depth_inches: Math.round(
        data.main_species.growth.minimum_root_depth.cm * 0.393701
      ),
    };
    this.setState({
      learnMore,
      displayLearnMoreSearch: true,
    });
    console.log("learnMore", learnMore);
  };

  componentDidMount = async () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const { name } = jwtDecode(jwt);
      this.setState(
        {
          loggedIn: jwt ? true : false,
          jwt: jwt,
          name: name,
        },
        () => this.getFavorites()
      );
    }
  };

  getFavorites = async () => {
    // console.log("this.state.jwt inside getFavorties:", this.state.jwt); // JWT is not updated here

    const userData = await axios({
      method: "get",
      url: config.apiEndpoint + "/users/me",
      headers: { "x-auth-token": this.state.jwt },
    });
    const favorites = userData.data.favorites;
    this.setState({ favorites });
  };

  addFavorite = async (plantObject) => {
    // Sets state so that heart icon is instantly responsive
    this.setState({
      favorites: [
        ...this.state.favorites,
        {
          _id: "",
          plantId: plantObject.id,
          common_name: plantObject.common_name,
          notes: "",
          image: plantObject.image_url,
          plantUrl: plantObject.links.plant,
        },
      ],
    });

    // add favorite to to database
    const favoriteToAdd = {
      plantId: plantObject.id,
      common_name: plantObject.common_name,
      image: plantObject.image_url,
      plantUrl: plantObject.links.plant,
    };

    let newFavorites = await axios({
      method: "put",
      url: config.apiEndpoint + "/users/",
      data: favoriteToAdd,
      headers: {
        "x-auth-token": this.state.jwt,
      },
    });

    // Sync state with favorites from database to get mongoDB id for new added favorite
    newFavorites = newFavorites.data.favorites;
    this.setState({ favorites: newFavorites });

    console.log("added ", favoriteToAdd.common_name, " to database");
  };

  removeFavorite = async (favorite) => {
    const indexToRemove = this.state.favorites.findIndex(function (
      current,
      index
    ) {
      return current.plantId === favorite.id;
    });
    let currentFavorites = [...this.state.favorites];

    const targetPlantMongoId = this.state.favorites[indexToRemove]._id;
    const targetPlantCommonName = this.state.favorites[indexToRemove]
      .common_name;

    _.pullAt(currentFavorites, [indexToRemove]);

    this.setState({
      favorites: [...currentFavorites],
    });

    // push to database
    await axios({
      method: "delete", //you can set what request you want to be
      url: config.apiEndpoint + "/users/",
      data: {
        plantMongoId: targetPlantMongoId,
      },
      headers: {
        "x-auth-token": this.state.jwt,
      },
    });

    console.log("removed ", targetPlantCommonName, " from database");
  };

  handleFavoriteClick = (favorite, liked) => {
    if (liked) this.removeFavorite(favorite, this.state.jwt);

    if (!liked) this.addFavorite(favorite, this.state.jwt);
  };

  // Input: favorite and note
  // Goal: set state
  handleNoteInput = (id, note) => {

    console.log("handleNoteInput", id, note)

    const indexOfNote = this.state.favorites.findIndex(function (
      current,
      index
    ) {
      return current.plantId === id;
    });

    let currentFavorites = [...this.state.favorites];
    currentFavorites[indexOfNote].notes = note;
    this.setState({
      favorites: [...currentFavorites],
    });
  };

  // Input: state
  // Goal: push state to database
  handleNoteSubmit = async () => {
    await axios({
      method: "put",
      url: config.apiEndpoint + "/users/notes",
      data: this.state.favorites,
      headers: {
        "x-auth-token": this.state.jwt,
      },
    });
  };

  render() {
    return (
      <Provider
        value={{
          loggedIn: this.state.loggedIn,
          name: this.state.name,
          favorites: this.state.favorites,
          learnMore: this.state.learnMore,
          displayLearnMoreFavorites: this.state.displayLearnMoreFavorites,
          displayLearnMoreSearch: this.state.displayLearnMoreSearch,
          handleFavoriteClick: this.handleFavoriteClick,
          handleNoteInput: this.handleNoteInput,
          handleNoteSubmit: this.handleNoteSubmit,
          getFavorites: this.getFavorites,
          handleLearnMoreFavorites: this.handleLearnMoreFavorites,
          handleLearnMoreSearch: this.handleLearnMoreSearch,
          handleExitLearnMore: this.handleExitLearnMore,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { GlobalContextProvider, Consumer as GlobalContextConsumer };
