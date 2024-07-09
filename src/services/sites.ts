import express from "express";
import { GraphQLClient } from "graphql-request";
import { IncomingMessage } from "http";
import config from "../lib/config";
import { getSession } from "../lib/session";
import { ISiteContext } from "../types/site";

export const getSitesQuery = (siteId: string) => `
    query {
      site(id: "${siteId}") {
        id
        name
      }
    }
  `;

export const getSite = async (
  siteId: string,
  req: IncomingMessage,
): Promise<ISiteContext> => {
  const graphQLClient = new GraphQLClient(
    config.services.INTEGRATIONS_GATEWAY_API_URL,
  );

  const session = getSession(req as express.Request);
  graphQLClient.setHeader("authorization", `Bearer ${session?.accessToken}`);
  return graphQLClient.request<ISiteContext>(getSitesQuery(siteId));
};
