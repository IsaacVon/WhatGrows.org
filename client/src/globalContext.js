import React, { Component } from "react";
const _ = require("lodash");
const { Provider, Consumer } = React.createContext();

class GlobalContextProvider extends Component {
  state = {
    loggedIn: false,
    name: "Isaac Householder",
    favorites: [
      // {
      //   _id: "5f445fc9cdee972b967cb1cc",
      //   plantId: 163618,
      //   common_name: "Mango",
      //   notes: "Plant in backyard, edit is working nowwwww",
      //   image: "http://dingus/Image",
      //   plantUrl: "http://dingus/Image",
      // },
      // {
      //   _id: "5f445fc9cdee972b967cb1dc",
      //   plantId: 102823,
      //   common_name: "Mango",
      //   notes: "dingus in dingus, editing notes wow haha",
      //   image: "http://dingus/Image",
      //   plantUrl: "http://dingus/Image",
      // },
    ],
  };

  removeFavorite = (favorite) => {
    const indexToRemove = this.state.favorites.findIndex(function (
      current,
      index
    ) {
      return current.plantId === favorite.id;
    });

    let currentFavorites = [...this.state.favorites];

    _.pullAt(currentFavorites, [indexToRemove]);

    this.setState({
      favorites: [...currentFavorites],
    });
    // push to database
  };

  addFavorite = (favorite) => {
    this.setState({
      favorites: [
        ...this.state.favorites,
        {
          _id: "",
          plantId: favorite.id,
          common_name: favorite.common_name,
          notes: "",
          image: favorite.image_url,
          plantUrl: favorite.links.plant,
        },
      ],
    });
    // push to database
  };

  handleFavoriteClick = (favorite, liked) => {
    if (liked) {
      console.log("Removing Favorite", favorite.id);
      this.removeFavorite(favorite);
    }

    if (!liked) {
      console.log("Adding Favorite", favorite.id);
      this.addFavorite(favorite);
    }
  };

  // Input: favorite and note
  // output: set state
  handleNoteInput = (id, note) => {
    console.log("note input handled", id, note);

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
