import React from "react";
import { Button } from "../components/common/button";
import styled from "../theme";

const NotAccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;

  p {
    margin-bottom: 2rem;
  }
`;

const StyledAnchor = styled.a`
  text-decoration: none;
`;

const NotFound = () => {
  return (
    <NotAccessWrapper>
      <h1>404</h1>
      <p>This page could not be found.</p>

      <StyledAnchor href="/">
        <Button secondary>HOME</Button>
      </StyledAnchor>
    </NotAccessWrapper>
  );
};

export default NotFound;
