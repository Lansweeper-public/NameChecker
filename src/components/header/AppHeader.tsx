import React from "react";
import {
  StyledHeader,
  StyledBrandContainer,
  StyledSpan,
  StyledBrand,
  StyledImg,
} from "./AppHeader.styles";

export const AppHeader = () => {
  return (
    <StyledHeader>
      <StyledBrandContainer>
        <StyledSpan>NameChecker</StyledSpan>
        <StyledBrand>by Lansweeper</StyledBrand>
      </StyledBrandContainer>
      <StyledImg src="/assets/svg/name-checker-logo.svg" />
    </StyledHeader>
  );
};
