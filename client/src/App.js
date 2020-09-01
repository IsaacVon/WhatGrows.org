import React from "react";
import Nav from "./components/navBar";
import SearchZip from "./pages/searchZip";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import history from "./components/history";
import { GlobalContextConsumer } from "./globalContext";

import Favorites from "./pages/favorites";
import NotFound from "./pages/notFound";
import { Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <GlobalContextConsumer>
          {(context) => <Nav loggedIn={context.loggedIn} name={context.name} />}
        </GlobalContextConsumer>
        <Switch>
          <Route path="/searchZip" exact component={SearchZip} />
          <Route path="/Favorites" exact component={Favorites} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/SignIn" exact component={SignIn} />

          <Route path="/*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
