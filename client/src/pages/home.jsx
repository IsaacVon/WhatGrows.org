import React from "react";
import styled from "styled-components";
import HomeSunrise from "../components/homeSunrise";

const Background = styled.section`
  background: #5cd700;
  color: white;
  display: grid;
  place-items: center;
`;

const TextContainer = styled.section`
  background: #5cd700;
  color: white;
  max-width: 450px;
  height: 55vh;
`;

const Title = styled.h1`
  margin: 45px 50px 0px 50px;
  font-size: 23px;

  text-align: center;
`;

const Body = styled.p`
  text-align: justify;
  font-size: 14px;
  margin: 15px 50px;
`;

//    height: calc(var(--vh, 1vh) * 98);
export default function Home() {
  return (
    <Background>
      <HomeSunrise />
      <TextContainer>
        <Title>What does your garden grow?</Title>
        <Body>
          I don't know what to type here so I'm just talking randomly so it doesn't have words without meaning or structure. I don't know what to say and this is awkward because I'm talking to the computer.
        </Body>
      </TextContainer>
    </Background>
  );
}
