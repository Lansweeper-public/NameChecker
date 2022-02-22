import express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { checkExportStatus } from "../../services/exports";
import { ApiErrors } from "../../types/errors";

export default async function exports(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { siteId, exportId } = req.query;
    const data = await checkExportStatus(
      siteId as string,
      exportId as string,
      req as unknown as express.Request,
    );
    res.json(data);
  } catch (error) {
    const apiError = error as ApiErrors;
    res.status(apiError.status || 500).end(apiError.message);
  }
}
