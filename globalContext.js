import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class GlobalContextProvider extends Component {
  state = {
    submitted: false,
  };

}

export { GlobalContextProvider, Consumer as GlobalContextConsumer };
