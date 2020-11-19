import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../assets/logo.png";
import styled from "styled-components";
import { device } from "../utils/device";

const Parent = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 250px;

  @media ${device.mobileL} {
    flex-direction: column;
  }
  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const LogoContainer = styled.section`
  margin: 5px;
  // background-color: yellowgreen;
`;

const Logo = styled.img`
  left: 20px;
  height: 111px;
  width: 195px;
  margin: 20px;

  @media ${device.mobileL} {
    position: relative;
  }
  @media ${device.tablet} {
    position: absolute;
  }
`;

const TextContainer = styled.section`
  margin: 5px;
  // display: grid;
  // place-items: center;
  // height: 50px;
`;

const NavButtons = styled.h3`
  color: white;
`;

export default function NavBar({ name, loggedIn }) {
  console.log("device", device.laptop);
  return (
    <>
      <Parent>
        <LogoContainer>
          <Logo src={logo} />
        </LogoContainer>
        <TextContainer>
          <div>
            <Button component={Link} to="/">
              <NavButtons>Home</NavButtons>
            </Button>
            <Button component={Link} to="/searchzip">
              <NavButtons>Search</NavButtons>
            </Button>
            {loggedIn && (
              <Button component={Link} to="/favorites">
                <NavButtons>Favorites</NavButtons>
              </Button>
            )}
            {loggedIn && (
              <Button component={Link} to="/logout">
                <NavButtons>Sign Out</NavButtons>
              </Button>
            )}
            {!loggedIn && (
              <Button component={Link} to="/signin">
                <NavButtons>Sign In</NavButtons>
              </Button>
            )}
            {!loggedIn && (
              <Button component={Link} to="/signup">
                <NavButtons>Sign Up</NavButtons>
              </Button>
            )}
          </div>
        </TextContainer>
        <LogoContainer></LogoContainer>
      </Parent>
    </>
  );
}
