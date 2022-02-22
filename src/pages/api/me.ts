import express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromServer, canAccessMiddleware } from "../../lib/user";
import { ApiErrors } from "../../types/errors";

export default canAccessMiddleware(async function me(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const user = await getUserFromServer(req as unknown as express.Request);
    res.json(user);
  } catch (error) {
    const apiError = error as ApiErrors;
    res.status(apiError.status || 500).end(apiError.message);
  }
});
