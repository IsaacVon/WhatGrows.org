import React from "react";
import styled from "styled-components";

import first from "../assets/searchCircleButton.png";
import back from "../assets/page2.png";
import next from "../assets/page3.png";
import last from "../assets/page4.png";

const PageButtonContainer = styled.section`
  background-color: #1deff4;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PageCounterContainer = styled.section`
  display: grid;
  place-items: center;
`;

const PageCounter = styled.h2`
  color: white;
  font-size: 20px;
  letter-spacing: 2px;
`;

const PageButton = styled.button`
  margin: 14px;
  color: #1deff4;
  font-family: "Indie Flower";
  font-size: 20px;
  letter-spacing: 2px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  background-size: 80px;

  height: 80px;
  width: 80px;

  &:hover {
    /* background-color: palevioletred; */
    /* color: #1deff4; */
  }

  &:active {
    background-image: url(${first});
    transition: 0.1s all;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
  }

  &.first {
    background-image: url(${first});
  }

  &.back {
    background-image: url(${back});
  }

  &.next {
    background-image: url(${next});
  }

  &.last {
    background-image: url(${last});
  }
`;

export default function PageButtons({
  handlePageChange,
  currentPage,
  totalPages,
}) {
  return (
    <PageButtonContainer>
      <PageButton
        className="first"
        onClick={() => {
          handlePageChange(1);
        }}
        disabled={currentPage === 1 ? true : false}
      >
        First
      </PageButton>
      <PageButton
        className="back"
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
        disabled={currentPage === 1 ? true : false}
      >
        Back
      </PageButton>

      <PageCounterContainer>
        <PageCounter>
          {currentPage}/25
          {/* {currentPage}/{totalPages} */}
        </PageCounter>
      </PageCounterContainer>

      <PageButton
        className="next"
        onClick={() => {
          handlePageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages ? true : false}
      >
        Next
      </PageButton>
      <PageButton
        className="last"
        onClick={() => {
          handlePageChange(totalPages);
        }}
        disabled={currentPage === totalPages ? true : false}
      >
        Last
      </PageButton>
    </PageButtonContainer>
  );
}
