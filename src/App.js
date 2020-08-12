import React from "react";
import Nav from "./components/navBar";
import Search from "./pages/search";
import Favorites from "./pages/favorites";
import NotFound from "./pages/notFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/search" exact component={Search} />
          <Route path="/Favorites" exact component={Favorites} />

          <Route path="/*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
