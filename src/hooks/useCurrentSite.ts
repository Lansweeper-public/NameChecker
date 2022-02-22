import React, { useEffect, useRef, useState } from "react";
import fetch from "isomorphic-unfetch";
import { ISite, ISiteResponse } from "../types/site";
import { getSitesQuery } from "../services/sites";
import { APPLICATION_JSON_CONTENT_TYPE } from "../lib/constants";

interface IGetSiteResponse {
  data: ISite;
  loadData: () => Promise<void>;
}

export const useCurrentSite = (
  currentSite: ISite,
  siteId: string,
  onDataCompleted: () => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): IGetSiteResponse => {
  const [data, setData] = useState<ISite>(currentSite);

  const query = getSitesQuery(siteId);

  const loadData = async () => {
    setLoading(true);

    try {
      const {
        data: { site },
      } = (await (
        await fetch("/api", {
          method: "post",
          body: JSON.stringify({
            query,
          }),
          headers: {
            "Content-Type": APPLICATION_JSON_CONTENT_TYPE,
            Accept: APPLICATION_JSON_CONTENT_TYPE,
          },
        })
      ).json()) as ISiteResponse;
      setData(site);
      onDataCompleted();
    } finally {
      setLoading(false);
    }
  };

  const firstLoad = useRef(!!currentSite.id);

  useEffect(() => {
    // To ignore load data first time
    // because we have from currentSite
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId]);
  return { data, loadData };
};
