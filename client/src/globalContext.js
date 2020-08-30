import React, { Component } from "react";
import axios from "axios";
const _ = require("lodash");
const { Provider, Consumer } = React.createContext();

// This changes whos logged in
const jwt =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ0NWY3MWNkZWU5NzJiOTY3Y2IxYzkiLCJpYXQiOjE1OTg3NDIxMTd9.wJDRfLeVnTXzMki1XlHB0sz8ZaG1y-B4mgIu9kRClN8";
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ0NmU3ODBiNGQ3MjMwZDc3ZjYwM2QiLCJpYXQiOjE1OTg4MjI5NTl9.b7HpiAP9n1RvzMewkH9uPybZLZCI-KqnoeG3tDQMNBQ";

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
      url: "http://localhost:3000/api/users/",
      data: favoriteToAdd,
      headers: {
        "x-auth-token": jwt,
      },
    });

    // Sync state with favorites from database to get mongoDB id for new added favorite
    newFavorites = newFavorites.data.favorites
    this.setState({favorites: newFavorites})

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
  // Goal: set state
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

  // Input: state
  // Goal: push state to database
  handleNoteSubmit = async () => {
    await axios({
      method: "put", 
      url: "http://localhost:3000/api/users/notes",
      data: this.state.favorites,
      headers: {
        "x-auth-token": jwt,
      },
    });
  }

  render() {
    return (
      <Provider
        value={{
          loggedIn: this.state.loggedIn,
          name: this.state.name,
          favorites: this.state.favorites,
          handleFavoriteClick: this.handleFavoriteClick,
          handleNoteInput: this.handleNoteInput,
          handleNoteSubmit: this.handleNoteSubmit
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { GlobalContextProvider, Consumer as GlobalContextConsumer };
