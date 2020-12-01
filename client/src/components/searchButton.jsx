import React from "react";
import styled from "styled-components";
import searchCircle from "../assets/searchCircleButton.png";
import searchCircleClicked from "../assets/page2.png";

const SearchButton = styled.button`
  margin-top: 20px;

  color: #1deff4;
  font-family: "Indie Flower";
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold;

  cursor: pointer;

  border: none;
  background-color: transparent;
  background-image: url(${searchCircle});
  background-size: 95px;

  height: 95px;
  width: 95px;

  &:hover {
    /* background-color: palevioletred; */
    /* color: #1deff4; */
  }

  &:active {
    background-image: url(${searchCircleClicked});
    transition: 0.1s all;

  }

  &:focus {
    outline: none;
  };

  &:disabled{
    cursor: default;
  }
`;

export default function searchButton({ handleSearch, zipCodeValid }) {
  return (
    <>
      <SearchButton
        onClick={handleSearch}
        disabled={!zipCodeValid}
      >
        Search
      </SearchButton>
    </>
  );
}
