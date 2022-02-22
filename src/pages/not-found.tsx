import { LECButton } from "@lansweeper/lecfrontcomponents";
import { IncomingMessage } from "http";
import React from "react";
import styled from "../theme";

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`;

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <h3>
        It seems you are not in the right place. Do you want to go to{" "}
        <a href="https://app.lansweeper.com">Lansweeper</a>?
      </h3>

      <a style={{ textDecoration: "none" }} href="/api/logout">
        <LECButton secondary>LOG OUT</LECButton>
      </a>
    </NotFoundWrapper>
  );
};

NotFound.getInitialProps = ({
  res,
  error,
}: {
  res?: IncomingMessage;
  error?: IncomingMessage;
}) => {
  return { isErrorPage: res ? res.statusCode : error ? error.statusCode : 404 };
};

export default NotFound;
