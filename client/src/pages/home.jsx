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
  height: 100%;
  margin-top: 38px;
`;

const Title = styled.h1`
  margin: 45px 50px 0px 50px;
  font-size: 23px;
  letter-spacing: 2px;

  text-align: center;
`;

const Body = styled.p`
  font-family: "Indie Flower";
  letter-spacing: 2px;
  text-align: justify;
  font-size: 14px;
  letter-spacing: 2px;
  margin: 15px 50px;
`;

//    height: calc(var(--vh, 1vh) * 98);
export default function Home() {
  return (
    <>
      <HomeSunrise />
      <Background>
        <TextContainer>
          <Title>What can your garden grow?</Title>
          <Body>
            Find out What Grows in your zip code. We the USDA hardiness zones
            and a database of over 2 million plants to build a list of plants
            that will naturally grow in your temperature zone.{" "}
          </Body>
        </TextContainer>
      </Background>
    </>
  );
}
