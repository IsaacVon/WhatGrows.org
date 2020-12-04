import React from "react";
import styled from "styled-components";
import HomeSunrise from "../components/homeSunrise";
import { device } from "../utils/device";

const Background = styled.section`
  color: white;
  flex: 0 1 50vh;
`;

const TextContainer = styled.section`
  height: 40vh;
  color: white;
  max-width: 450px;
`;

const Title = styled.h1`
  font-family: "Indie Flower";
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

const navHeightDesktop = "180px";
const navHeightMobile = "146px";

const Box = styled.section`
  display: flex;
  flex-flow: column;
  overflow: hidden;
  height: calc(100vh - ${navHeightMobile});

  @media ${device.mobileS} {
  }
  @media ${device.tablet} {
    height: calc(100vh - ${navHeightDesktop});
  }
`;

const SunriseWrapper = styled.section`
  background-color: #1deff4;
  flex: 1 1 auto;
  position: relative;
`;

const TextWrapper = styled.section`
  flex: 0 1 auto;
  background: #5cd700;
  display: grid;
  place-items: center;
`;

export default function Home() {
  return (
    <Box>
      <SunriseWrapper>
        <HomeSunrise />
      </SunriseWrapper>
      <TextWrapper>
        <Background>
          <TextContainer>
            <Title>What can your garden grow?</Title>
            <Body>
              Find out What Grows in your zip code. We use USDA hardiness zones
              and a database of over 2 million plants to build a list of plants
              that will naturally thrive in your temperature zone.
            </Body>
          </TextContainer>
        </Background>
      </TextWrapper>
    </Box>
  );
}
