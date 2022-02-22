import React from "react";
import { LECButton } from "@lansweeper/lecfrontcomponents";
import { NextPage } from "next";
import { Head, Page } from "../components";
import styled from "../theme";

const StyledPage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  font-size: ${({ theme }) => theme.mixins.pxToRem(16)};
  background-color: var(--primary-20);
`;

const Logo = styled.div`
  margin-bottom: 65px;
`;

const StyledDescriptionDiv = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 55px;
  width: 425px;
  height: 88px;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.black};
`;

interface IIndexProps {
  lsAuthorizeUrl: string | null;
}

const Index: NextPage<IIndexProps> = ({ lsAuthorizeUrl }) => {
  const handleClick = () => {
    window.location.href = lsAuthorizeUrl ?? "/not-access";
  };

  return (
    <>
      <Head>
        <title>NameChecker - Login</title>
      </Head>
      <StyledPage>
        <Logo>
          <img
            src="/assets/svg/new-lansweeper-logo.svg"
            alt="Lansweeper logo"
          />
        </Logo>
        <StyledDescriptionDiv>
          This app uses the Lansweeper API to query your site assets, and then
          check the name against your chosen naming convention.
        </StyledDescriptionDiv>
        <LECButton onClick={() => handleClick()}>Check my assets</LECButton>
      </StyledPage>
    </>
  );
};

Index.getInitialProps = (): IIndexProps => {
  return { lsAuthorizeUrl: process.env.LS_APP_AUTHORIZE_URI ?? null };
};

export default Index;
