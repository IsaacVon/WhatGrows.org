import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { GlobalContextConsumer } from "./globalContext";
import styled from "styled-components";

import Nav from "./components/navBar";
import SearchZip from "./pages/searchZip";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Logout from "./pages/logOut";
import history from "./components/history";
import Favorites from "./pages/favorites";
import NotFound from "./pages/notFound";
import Home from "./pages/home";

const Wrapper = styled.section`
  background: #1deff4;
  min-height: 100vh;
  padding-bottom: 50px;
`;

function App() {
  return (
    <Router history={history}>
      <Wrapper>
        <GlobalContextConsumer>
          {(context) => <Nav loggedIn={context.loggedIn} name={context.name} />}
        </GlobalContextConsumer>
        <Switch>
          <Route path="/searchzip" component={SearchZip} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Wrapper>
    </Router>
  );
}

export default App;
