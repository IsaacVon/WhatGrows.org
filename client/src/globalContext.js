import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class GlobalContextProvider extends Component {
  state = {
    loggedIn: false,
    name: "Isaac Householder",
    favorites: [
      {
        _id: "5f445fc9cdee972b967cb1cc",
        plantId: "163618",
        common_name: "Mango",
        notes: "Plant in backyard",
        image: "http://dingus/Image",
        plantUrl: "http://dingus/Image",
      },
      {
        _id: "5f445fc9cdee972b967cb1dc",
        plantId: "102823",
        common_name: "Mango",
        notes: "Plant in backyard",
        image: "http://dingus/Image",
        plantUrl: "http://dingus/Image",
      },
    ],
  };
}

export { GlobalContextProvider, Consumer as GlobalContextConsumer };
