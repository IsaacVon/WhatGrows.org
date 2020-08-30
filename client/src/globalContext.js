import React, { Component } from "react";
import axios from "axios";
const _ = require("lodash");
const { Provider, Consumer } = React.createContext();

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ0NWY3MWNkZWU5NzJiOTY3Y2IxYzkiLCJpYXQiOjE1OTg3NDIxMTd9.wJDRfLeVnTXzMki1XlHB0sz8ZaG1y-B4mgIu9kRClN8";

class GlobalContextProvider extends Component {
  state = {
    loggedIn: true,
    name: "Isaac Householder",
    favorites: [],
  };

  componentDidMount() {
    if (this.state.loggedIn) this.getFavorites(jwt);
  }

  getFavorites = async (jwt) => {
    const userData = await axios({
      method: "get",
      url: "http://localhost:3000/api/users/me",
      headers: { "x-auth-token": jwt },
    });
    const favorites = userData.data.favorites;
    this.setState({ favorites });
  };

  addFavorite = async (plantObject, jwt) => {
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

    await axios({
      method: "put", //you can set what request you want to be
      url: "http://localhost:3000/api/users/",
      data: favoriteToAdd,
      headers: {
        "x-auth-token": jwt,
      },
    });

    console.log("added ", favoriteToAdd.common_name, " to database");
  };

  removeFavorite = async (favorite, jwt) => {
    const indexToRemove = this.state.favorites.findIndex(function (
      current,
      index
    ) {
      return current.plantId === favorite.id;
    });
    let currentFavorites = [...this.state.favorites];

    const targetPlantMongoId = this.state.favorites[indexToRemove]._id;
    const targetPlantCommonName = this.state.favorites[indexToRemove].common_name;

    _.pullAt(currentFavorites, [indexToRemove]);

    this.setState({
      favorites: [...currentFavorites],
    });

    // push to database
    await axios({
      method: "delete", //you can set what request you want to be
      url: "http://localhost:3000/api/users/",
      data: {
        plantMongoId: targetPlantMongoId,
      },
      headers: {
        "x-auth-token": jwt,
      },
    });

    console.log("removed ", targetPlantCommonName, " from database")

  };

  handleFavoriteClick = (favorite, liked) => {
    if (liked) this.removeFavorite(favorite, jwt);
    
    if (!liked) this.addFavorite(favorite, jwt);
    
  };

  // Input: favorite and note
  // output: set state
  handleNoteInput = (id, note) => {
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

  render() {
    return (
      <Provider
        value={{
          loggedIn: this.state.loggedIn,
          name: this.state.name,
          favorites: this.state.favorites,
          handleFavoriteClick: this.handleFavoriteClick,
          handleNoteInput: this.handleNoteInput,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { GlobalContextProvider, Consumer as GlobalContextConsumer };
