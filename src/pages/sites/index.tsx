import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { canAccessAndGetUser } from "../../lib/user";
import { getMe } from "../../services/me";
import { ISite } from "../../types/site";
import { IAppInfo } from "../../types/session";
import {
  StyledMainBox,
  Styledh2,
  StyledImg,
  StyledDiv,
  StyledParagraph,
  StyledMainHeader,
  StyledMainContent,
  StyledFooter,
  StyledMainBoxContainer,
  StyledHeader,
  StyledLECUnderscoredTitle,
  StyledActionBox,
  StyledNoStyleLink,
  StyledSiteWrapper,
  SiteList,
  StyledSitesPage,
} from "../../components";
import { useRouter } from "next/router";
import { StyledLogOutAnchor } from "../../components/navbar/AppNavigationBar.styles";
import { Button } from "../../components/common/button";

interface ISitesProps {
  authorizedSites: {
    sites: ISite[];
  };
  appInfo: IAppInfo | null;
  lsAuthorizeUrl: string | null;
}

export const SitesPage: NextPage<ISitesProps> = ({
  authorizedSites,
  appInfo,
  lsAuthorizeUrl,
}) => {
  const router = useRouter();
  const onSiteClick = (siteId) => {
    router.push(`/reports/${siteId}`);
  };
  return (
    <>
      <Head>
        <title>NameChecker - Select Site</title>
      </Head>
      <StyledSitesPage>
        <StyledSiteWrapper>
          <StyledMainBoxContainer>
            {authorizedSites && authorizedSites.sites.length > 0 && (
              <StyledMainBox>
                <StyledMainHeader>
                  <StyledHeader>
                    <Styledh2>Welcome to {appInfo?.name}</Styledh2>

                    <StyledImg src="/assets/svg/name-checker-logo.svg" />
                  </StyledHeader>

                  <StyledDiv>
                    This app allows you to create naming standards by checking
                    your current asset names with a naming convention. Please
                    select which sites you would like to grant access to this
                    app.
                  </StyledDiv>
                  <StyledLECUnderscoredTitle big={true}>
                    Your authorized sites
                  </StyledLECUnderscoredTitle>
                  <StyledParagraph>
                    Access one of the sites you already authorized:
                  </StyledParagraph>
                </StyledMainHeader>
                <StyledMainContent>
                  <SiteList
                    authorizedSites={authorizedSites.sites}
                    onSiteClick={onSiteClick}
                  />
                </StyledMainContent>
              </StyledMainBox>
            )}
          </StyledMainBoxContainer>
        </StyledSiteWrapper>
        <StyledFooter>
          <StyledActionBox>
            <StyledLogOutAnchor href="/logout">
              <Button secondary>LOG OUT</Button>
            </StyledLogOutAnchor>
            <StyledNoStyleLink href={lsAuthorizeUrl ?? "/not-access"}>
              <Button secondary={true}>Authorize other sites</Button>
            </StyledNoStyleLink>
          </StyledActionBox>
        </StyledFooter>
      </StyledSitesPage>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ISitesProps> = async ({
  req,
  res,
}) => {
  const session = await canAccessAndGetUser({ req, res });
  const { authorizedSites } = await getMe(req);

  return {
    props: {
      authorizedSites,
      appInfo: session.appInfo ?? null,
      lsAuthorizeUrl: process.env.LS_APP_AUTHORIZE_URI ?? null,
    },
  };
};

export default SitesPage;
