import React, { Component } from "react";
import FavoritesTable from "../components/favoritesTable";
import { GlobalContextConsumer } from "../globalContext";

class Favorites extends Component {
  state = {};
  render() {
    return (
      <>
        <GlobalContextConsumer>
          {(context) => <FavoritesTable plantsOnPage={context.favorites} />}
        </GlobalContextConsumer>
      </>
    );
  }
}

export default Favorites;
