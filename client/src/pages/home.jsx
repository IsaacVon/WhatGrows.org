import React from "react";
import styled from "styled-components";

const Background = styled.section`
  background: #5cd700;
  height: 250px;
  color: white;
`;

export default function Home() {
  return (
    <Background>
      <h1>Home Page</h1>;
    </Background>
  );
}
