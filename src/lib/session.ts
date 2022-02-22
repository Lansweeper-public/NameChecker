import express from "express";
import { ISessionInfo } from "../types/session";

export const getSession = (req?: express.Request): ISessionInfo | undefined => {
  if (req && req.session) {
    return req.session.info as ISessionInfo;
  }
  return undefined;
};
