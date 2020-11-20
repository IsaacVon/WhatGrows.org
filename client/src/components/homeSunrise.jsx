import React from "react";
import styled from "styled-components";
import sunrise from "../assets/sunrise.png";

const Background = styled.section`
  background: #1deff4;
  width: 100%;
  overflow: hidden;

  display: grid;
  place-items: center;
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
