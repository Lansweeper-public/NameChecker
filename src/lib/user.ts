import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import { isServer } from "./utils";
import { getSession } from "./session";
import express from "express";

const redirectTo = (locationPath: string, res?: ServerResponse) => {
  if (res && isServer()) {
    res.writeHead(302, {
      Location: locationPath,
    });
    res.end();
  } else {
    Router.replace(locationPath);
  }
};

type RouteHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;

export const getUserFromServer = async (req: express.Request) => {
  return getSession(req);
};

export const getUserFromBrowser = () =>
  fetch("/api/me").then((res) => res.json());

export const canAccessAndGetUser = async ({
  req,
  res,
}: {
  req?: IncomingMessage;
  res?: ServerResponse;
}) => {
  const user = await (isServer() && req && res
    ? getUserFromServer(req as express.Request)
    : getUserFromBrowser());

  if (!user) {
    redirectTo("/not-access", res);
    return user;
  }

  user.permissions = {};
  return user;
};

export const canAccessMiddleware = (
  arg1: RouteHandler | string[] | string,
  arg2?: RouteHandler,
) => {
  const handler = typeof arg1 === "function" ? arg1 : arg2;
  if (!handler) {
    throw new Error("Route handler is required");
  }

  return async (req: NextApiRequest, res: NextApiResponse) => {
    return handler(req, res);
  };
};
