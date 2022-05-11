import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import {
  AppNavigationBar,
  AssetResourcesTable,
  buildESFilter,
  ChangeSitesModal,
  FiltersForm,
  FormFieldMap,
  Head,
  IChangePageParams,
  PaginationTableFooter,
  SimpleTabs,
  StyledFullPageContent,
  StyledPage,
  StyledTableContainer,
  TABS,
  useAllAssets,
  useFilters,
  useMatchedAssets,
  useNoMatchAssets,
} from "../../components";
import { EmptyWrapper } from "../../components/common/empty";
import { useCurrentSite } from "../../hooks/useCurrentSite";
import { usePagination } from "../../hooks/usePagination";
import { EPage } from "../../lib/constants";
import { canAccessAndGetUser } from "../../lib/user";
import { getMe } from "../../services/me";
import { getSite } from "../../services/sites";
import { IFiltersGroupedInput } from "../../types";
import { ISite } from "../../types/site";

export const pageSizeOptions = [10, 25, 50];

interface IReportsPageProps {
  siteSelected: ISite;
  authorizedSites: ISite[];
}

export const ReportsPage: NextPage<IReportsPageProps> = ({
  authorizedSites,
  siteSelected,
}) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(TABS.ALL_ASSETS);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSitesModal, setShowSitesModal] = useState<boolean>(false);
  const [areFiltersApplied, setAreFiltersApplied] = useState<boolean>(false);
  const [filters, setFilters] = useState({} as IFiltersGroupedInput);
  const [noFilters, setNoFilters] = useState({} as IFiltersGroupedInput);
  const [filtersString, setFiltersString] = useState<string>();
  const [, setNoFiltersString] = useState<string>();
  const {
    regExps,
    setRegExps,
    filterValues,
    setFilterValues,
    setEsRegExps,
    esRegExps,
    setNoEsRegExps,
    noEsRegExps,
  } = useFilters();
  const allAssets = useAllAssets();
  const noMatchAssets = useNoMatchAssets();
  const matchedAssets = useMatchedAssets();
  const { updateAll } = useAllAssets();
  const { goToPage } = usePagination();

  const {
    query: { siteId },
  } = router;

  const onCloseChangeSiteModal = () => setShowSitesModal(false);

  const { data: currentSite } = useCurrentSite(
    siteSelected,
    siteId as string,
    onCloseChangeSiteModal,
    setLoading,
  );

  useEffect(() => {
    goToPage(EPage.FIRST, currentSite.id, pageSizeOptions[0], {}, updateAll);
  }, [currentSite.id]);

  const onClickApplyChangeSite = (newSiteId: string) => {
    router.push(`${newSiteId}`, undefined, {
      shallow: true,
    });
  };

  const tabs = Object.values(TABS).map((tab) => ({
    id: tab,
    title: tab,
    to: tab,
  }));

  const onChangePage = ({
    page,
    limit,
    filtersGrouped,
    cursor,
    fnUpdateAll,
  }: IChangePageParams) => {
    setLoading(true);
    goToPage(page, currentSite.id, limit, filtersGrouped, fnUpdateAll, cursor);
    setLoading(false);
  };

  const isTabSelectable = (tab) => {
    return (
      (tab.id !== TABS.ALL_ASSETS && areFiltersApplied) ||
      tab.id === TABS.ALL_ASSETS
    );
  };

  const resetTabCallback = useCallback(
    (limit, filtersGrouped, fnUpdateAll) => {
      goToPage(EPage.FIRST, currentSite.id, limit, filtersGrouped, fnUpdateAll);
    },
    [filtersString, currentTab, currentSite.id],
  );

  const handleOnChangeFilters = (
    newRegExps: RegExp[],
    newEsRegExps: string[],
    newNoEsRegExps: string[],
  ) => {
    setRegExps(newRegExps);
    setEsRegExps(newEsRegExps);
    setNoEsRegExps(newNoEsRegExps);
    const filtersGrouped = buildESFilter(newEsRegExps, "OR");
    const noFiltersGrouped = buildESFilter(newNoEsRegExps, "AND");
    setFiltersString(JSON.stringify(filtersGrouped));
    setNoFiltersString(JSON.stringify(noFiltersGrouped));
    setFilters(filtersGrouped);
    setNoFilters(noFiltersGrouped);
  };

  const handleOnDeleteAllTags = () => {
    setRegExps([]);
    setFilters({} as IFiltersGroupedInput);
    setFilterValues({});
    setAreFiltersApplied(false);
    setCurrentTab(TABS.ALL_ASSETS);
  };

  const handleOnFiltersApplied = (newFilterValues: FormFieldMap) => {
    setAreFiltersApplied(true);
    setFilterValues(newFilterValues);
  };

  const handleOnSelectTab = (tab) => {
    if (isTabSelectable(tab)) {
      setCurrentTab(tab.id as TABS);
    }
  };

  useEffect(() => {
    if (regExps.length) {
      const filtersGrouped = buildESFilter(esRegExps, "OR");
      const noFiltersGrouped = buildESFilter(noEsRegExps, "AND");
      setFiltersString(JSON.stringify(filtersGrouped));
      setNoFiltersString(JSON.stringify(noFiltersGrouped));
      setFilters(filtersGrouped);
      setNoFilters(noFiltersGrouped);
      setAreFiltersApplied(true);
    }
  }, []);

  const goToSitesPage = () => {
    router.push("/sites");
  };

  return (
    <>
      <Head>
        <title>Report Site {currentSite.name}</title>
      </Head>
      <AppNavigationBar
        site={currentSite}
        goToSitesPage={goToSitesPage}
      ></AppNavigationBar>
      <StyledPage>
        <FiltersForm
          loading={loading}
          onFiltersApplied={handleOnFiltersApplied}
          onDeleteAllTags={handleOnDeleteAllTags}
          onChangeSite={() => setShowSitesModal(true)}
          onChangeFilters={handleOnChangeFilters}
          initialValue={filterValues}
        ></FiltersForm>
        <StyledFullPageContent>
          <StyledTableContainer>
            <SimpleTabs
              tabs={tabs}
              isTabActive={(tab) => tab.id === currentTab}
              onSelectTab={handleOnSelectTab}
              isTabDisabled={(tab) => !isTabSelectable(tab)}
            />
            {Object.values(TABS).map((tab) => (
              <AssetResourcesTable
                key={`${tab}-table`}
                tab={tab}
                {...(tab === TABS.ALL_ASSETS
                  ? { ...allAssets }
                  : tab === TABS.MATCHED
                  ? { ...matchedAssets }
                  : { ...noMatchAssets })}
                filters={
                  tab === TABS.ALL_ASSETS
                    ? {}
                    : tab === TABS.MATCHED
                    ? filters
                    : noFilters
                }
                loading={loading}
                filterValues={filterValues}
                regExps={regExps}
                empty={
                  <EmptyWrapper
                    title="Please fill in the filters to find matches"
                    subTitle=" "
                    image="no-results"
                  />
                }
                isHidden={currentTab !== tab}
              />
            ))}
          </StyledTableContainer>
        </StyledFullPageContent>
      </StyledPage>
      {Object.values(TABS).map((tab) => (
        <PaginationTableFooter
          key={`${tab}-table-footer`}
          {...(tab === TABS.ALL_ASSETS
            ? { ...allAssets }
            : tab === TABS.MATCHED
            ? { ...matchedAssets }
            : { ...noMatchAssets })}
          filters={
            tab === TABS.ALL_ASSETS
              ? {}
              : tab === TABS.MATCHED
              ? filters
              : noFilters
          }
          resetTabCallback={resetTabCallback}
          handleChangePage={onChangePage}
          siteId={currentSite.id}
          isHidden={currentTab !== tab}
        />
      ))}
      <ChangeSitesModal
        open={showSitesModal}
        currentSiteId={currentSite.id}
        sites={authorizedSites}
        onClose={onCloseChangeSiteModal}
        applyFilters={onClickApplyChangeSite}
        loading={loading}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  IReportsPageProps
> = async ({ req, res, query: { siteId } }) => {
  const session = await canAccessAndGetUser({ req, res });
  const { authorizedSites } = await getMe(req);
  const { site } = await getSite(siteId as string, req);
  return {
    props: {
      siteSelected: site,
      authorizedSites: authorizedSites?.sites,
      appInfo: session?.appInfo || {},
    },
  };
};

export default ReportsPage;
