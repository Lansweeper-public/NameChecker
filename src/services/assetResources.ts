import express from "express";
import { GraphQLClient } from "graphql-request";
import config from "../lib/config";
import { APPLICATION_JSON_CONTENT_TYPE, EPage } from "../lib/constants";
import { getSession } from "../lib/session";
import { isServer, requestMiddleware } from "../lib/utils";
import { IAssetsResourceResponse } from "../types/assets";
import { IncomingMessage } from "http";
import { IFiltersGroupedInput } from "../types";

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
      { headers: {}, requestMiddleware },
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
