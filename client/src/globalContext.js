import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class GlobalContextProvider extends Component {
  state = {
    loggedIn: false,
    name: "Isaac Householder",
    favorites: [
      {
        _id: "5f445fc9cdee972b967cb1cc",
        plantId: 163618,
        common_name: "Mango",
        notes: "Plant in backyard, edit is working nowwwww",
        image: "http://dingus/Image",
        plantUrl: "http://dingus/Image",
      },
      {
        _id: "5f445fc9cdee972b967cb1dc",
        plantId: 102823,
        common_name: "Mango",
        notes: "dingus in dingus, editing notes wow haha",
        image: "http://dingus/Image",
        plantUrl: "http://dingus/Image",
      },
    ],
  };

  removeFavorite = (favorite) => {
    console.log("Favorite Removed", favorite.id)
  }

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
    console.log("favorite added", this.state);
  };
  
  handleFavoriteClick = (favorite, liked) => {

    if (liked) {
      this.removeFavorite(favorite)
    }

    if (!liked) {
      this.addFavorite(favorite);
    }
  };


  // handle log in

  render() {
    return (
      <Provider
        value={{
          loggedIn: this.state.loggedIn,
          name: this.state.name,
          favorites: this.state.favorites,
          handleFavoriteClick: this.handleFavoriteClick,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { GlobalContextProvider, Consumer as GlobalContextConsumer };
