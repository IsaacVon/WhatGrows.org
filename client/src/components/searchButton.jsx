import React from "react";
import styled from "styled-components";
import searchCircle from "../assets/searchCircleButton.png";

const Background = styled.section`
  width: 100%;
  height: 95px;
  position: relative;
  text-align: center;
  color: #1deff4;
  margin-top: 23px;
`;

const Logo = styled.img`
  height: 95px;
  overflow: hidden;
`;

const Text = styled.h3`
  font-size: 20px;
  margin: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function searchButton() {
  return (
    <Background>
      <Logo src={searchCircle} />
      <Text>Search</Text>
    </Background>
  );
}
