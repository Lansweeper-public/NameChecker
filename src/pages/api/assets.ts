import { NextApiRequest, NextApiResponse } from "next";
import { downloadAssets } from "../../services/assets";
import { ApiErrors } from "../../types/errors";
const unzip = require("unzip-stream");

export default async function assets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { url } = req.body;
    const response = await downloadAssets(url);
    response.pipe(unzip.Parse()).on("entry", function (entry) {
      entry.pipe(res);
    });
  } catch (error) {
    const apiError = error as ApiErrors;
    res.status(apiError.status || 500).end(apiError.message);
  }
}
