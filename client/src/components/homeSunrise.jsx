import React from "react";
import styled from "styled-components";
import sunrise from "../assets/sunrise.png";

const Background = styled.section`
  width: 100%;
  overflow: hidden;
  display: grid;
  place-items: center;
  position: absolute;
  bottom: 0px;
`;

const Logo = styled.img`
  height: 175px;
  overflow: hidden;
`;



export default function HomeSunrise() {
  return (
    <Background>
      <Logo src={sunrise} />
    </Background>
  );
}
