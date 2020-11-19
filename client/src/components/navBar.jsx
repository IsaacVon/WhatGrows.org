import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../assets/logo.png";
import styled from "styled-components";

const Wrapper = styled.section`
  color: white;
`;

const Logo = styled.section`
  color: white;
`;



export default function NavBar({ name, loggedIn }) {
  return (
    <>
      <img src={logo} alt="WhatGrows" />

      <Wrapper>
        <Button component={Link} to="/">
          Home
        </Button>

        <Button component={Link} to="/searchzip">
          Search
        </Button>

        {loggedIn && (
          <Button component={Link} to="/favorites">
            Favorites
          </Button>
        )}
        {loggedIn && (
          <Button component={Link} to="/logout">
            Sign Out
          </Button>
        )}
        {!loggedIn && (
          <Button component={Link} to="/signin">
            Sign In
          </Button>
        )}
        {!loggedIn && (
          <Button component={Link} to="/signup">
            Sign Up
          </Button>
        )}
      </Wrapper>
    </>
  );
}
