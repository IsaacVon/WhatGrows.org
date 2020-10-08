import React, { Component } from "react";
import FavoritesTable from "../components/favoritesTable";
import { GlobalContextConsumer } from "../globalContext";
import MoreInfo from "../components/moreInfo";

class Favorites extends Component {
  render() {
    return (
      <>
        <GlobalContextConsumer>
          {(context) => (
            <FavoritesTable
              learnMore={context.learnMore}
              displayLearnMoreFavorites={context.displayLearnMoreFavorites}
              handleExitLearnMore={context.handleExitLearnMore}
              plantsOnPage={context.favorites}
            />
          )}
        </GlobalContextConsumer>
      </>
    );
  }
}

export default Favorites;
