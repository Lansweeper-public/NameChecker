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

const NotAccess = () => {
  return (
    <NotAccessWrapper>
      <h3>
        It seems you are a member of Lansweeper crew, but you dont have
        permissions to access NameChecker.
      </h3>
      <p>Try to contact with one of the NameChecker Administrators.</p>

      <StyledAnchor href="/">
        <Button secondary>HOME</Button>
      </StyledAnchor>
    </NotAccessWrapper>
  );
};

NotAccess.getInitialProps = () => {
  return { isErrorPage: true };
};

export default NotAccess;
