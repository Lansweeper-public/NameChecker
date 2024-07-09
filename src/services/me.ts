import express from "express";
import { GraphQLClient } from "graphql-request";
import { IncomingMessage } from "http";
import fetch from "isomorphic-unfetch";
import config from "../lib/config";
import { getSession } from "../lib/session";
import { isServer } from "../lib/utils";
import { IMeContext, IMeResponse } from "../types/me";
import { APPLICATION_JSON_CONTENT_TYPE } from "../lib/constants";

export const getMe = async (req: IncomingMessage): Promise<IMeContext> => {
  const graphQLClient = new GraphQLClient(
    config.services.INTEGRATIONS_GATEWAY_API_URL,
  );
  const query = `query {
        me {
            id
            username
            email
            name
            surname
            fullName
            imageUrl
            language
        }
        authorizedSites {
            sites {
                id
                name
                companyName
                logoUrl
            }
        }
    }
  `;
  if (isServer()) {
    const session = getSession(req as express.Request);
    graphQLClient.setHeader("authorization", `Bearer ${session?.accessToken}`);
    return graphQLClient.request<IMeContext>(query);
  } else {
    return (
      (await (
        await fetch("", {
          method: "post",
          body: JSON.stringify({ query }),
          headers: {
            "Content-Type": APPLICATION_JSON_CONTENT_TYPE,
            Accept: APPLICATION_JSON_CONTENT_TYPE,
          },
        })
      ).json()) as IMeResponse
    ).data;
  }
};
