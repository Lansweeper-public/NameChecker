import { LECUnderscoredTitle } from "@lansweeper/lecfrontcomponents";
import Link from "next/link";
import { Page } from "..";
import styled from "../../theme";

const StyledMainBox = styled.div`
  flex-direction: column;
  flex: unset;
  align-items: center;
  width: 464px;
  height: 587px;
  height: fit-content;
  position: relative;
  border-radius: 3px;
  border: 1px solid var(--light-grey);
  background-color: var(--white);
  label {
    font-weight: bold;
    color: var(--grey);
  }
  padding: 24px
  margin: 0 1rem 0.5rem;
`;

const Styledh2 = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16.8px;
`;

const StyledImg = styled.img`
  width: 46.5px;
  height: 46.5px;
  margin-bottom: 16.7px;
`;

const StyledDiv = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: black;
  margin-bottom: 16px;
  line-height: 1.25;
`;

const StyledSitesPage = styled(Page)`
  flex-direction: column;
  background-color: var(--lighter-grey);
  padding-top: 47px;
`;

const StyledParagraph = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--grey-80);
  margin-bottom: 1rem;
`;

const StyledMainHeader = styled.div`
  padding-top: 1.5rem;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
`;

const StyledMainContent = styled.div`
  padding-bottom: 1.5rem;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
`;

const StyledFooter = styled.div`
  border-radius: 3px;
  border: 1px solid var(--light-grey);
  background: var(--white);
  padding: 1rem 0;
  margin: 0;
  padding-right: 0.75rem;
`;

const StyledMainBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const StyledLECUnderscoredTitle = styled(LECUnderscoredTitle)`
  margin-bottom: 22px;
  font-weight: bold;

  &:after {
    width: 48px;
  }
`;

const StyledActionBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 240px;
`;

const StyledNoStyleLink = styled(Link)`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const StyledSiteWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 1.5rem;
`;

export {
  StyledMainBox,
  Styledh2,
  StyledImg,
  StyledDiv,
  StyledSitesPage,
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
};
