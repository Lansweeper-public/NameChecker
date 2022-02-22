import express from "express";
import { GraphQLClient } from "graphql-request";
import config from "../lib/config";
import { APPLICATION_JSON_CONTENT_TYPE, EPage } from "../lib/constants";
import { getSession } from "../lib/session";
import { isServer } from "../lib/utils";
import {
  IAssetsResourceResponse,
  IStatusExportResponse,
} from "../types/assets";
import { from } from "rxjs";
import { IncomingMessage } from "http";
import { IFiltersGroupedInput } from "@lansweeper/integrations-dataset";

export const getAssetResources = async (
  siteId: string,
  limit = 500,
  page?: EPage,
  cursor?: string,
  filters?: IFiltersGroupedInput,
  req?: IncomingMessage,
): Promise<IAssetsResourceResponse> => {
  const query = `
    query getAssetResources($filters: AssetsFilterGroupedInput) {
      site(id: "${siteId}") {
        assetResources(   
          assetPagination: { limit: ${limit}, page: ${page} ${
    page === "PREV" || page === "NEXT" ? `, cursor:"${cursor}"` : ""
  }}
          fields: [
            "key",
            "assetBasicInfo.name",            
            "assetBasicInfo.type",
            "assetCustom.manufacturer",
          ]
          filters: $filters                
        ) {     
          total
          pagination {
            limit
            next
            current
            page
          }
          items  
        }
      }
    }
  `;
  if (isServer()) {
    const session = getSession(req as express.Request);
    const graphQLClient = new GraphQLClient(
      config.services.INTEGRATIONS_GATEWAY_API_URL,
    );
    graphQLClient.setHeader("authorization", `Bearer ${session?.accessToken}`);
    return graphQLClient.request<IAssetsResourceResponse>(query, {
      filters,
    });
  } else {
    return (
      await (
        await fetch("/api", {
          method: "post",
          body: JSON.stringify({
            query,
            variables: { filters },
          }),
          headers: {
            "Content-Type": APPLICATION_JSON_CONTENT_TYPE,
            Accept: APPLICATION_JSON_CONTENT_TYPE,
          },
        })
      ).json()
    ).data;
  }
};

export const checkExportStatus = async (
  siteId: string,
  exportId: string,
  req?: express.Request,
): Promise<IStatusExportResponse> => {
  if (isServer()) {
    const query = `
      query {
        site(id: "${siteId}") {
          exportStatus(exportId: "${exportId}"){
            progress
            url
            requestedAt
            completedAt
            exportId
          }
        }
      }
    `;
    const session = getSession(req);
    const graphQLClient = new GraphQLClient(
      config.services.INTEGRATIONS_GATEWAY_API_URL,
    );
    graphQLClient.setHeader("authorization", `Bearer ${session?.accessToken}`);
    return graphQLClient.request<IStatusExportResponse>(query);
  } else {
    return (
      await fetch(`api/exports?siteId=${siteId}&exportId=${exportId}`, {
        headers: {
          "Content-Type": APPLICATION_JSON_CONTENT_TYPE,
          Accept: APPLICATION_JSON_CONTENT_TYPE,
        },
      })
    ).json();
  }
};

export const getExportStatusObservable = (siteId: string, exportId: string) =>
  from(checkExportStatus(siteId, exportId));
