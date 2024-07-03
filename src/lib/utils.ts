import { NextApiRequest, NextApiResponse } from "next";
import { EPage } from "./constants";

export const isServer = () => typeof window === "undefined";

type MethodHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;

export const methods =
  (methodsHandlers: { [key: string]: MethodHandler }) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;
    if (!method) {
      return res.status(404).end();
    }
    const handler = methodsHandlers[method];
    if (!handler) {
      return res.status(404).end();
    }

    return handler(req, res);
  };

export const resolvePage = (
  page: EPage,
  total: number,
  limit: number,
  prev: number,
) => {
  switch (page) {
    case EPage.FIRST:
      return 1;
    case EPage.LAST:
      return Math.ceil(total / limit);
    case EPage.PREV:
      return prev > 1 ? prev - 1 : prev;
    default:
      return prev === total / limit ? prev : prev + 1;
  }
};

export const requestMiddleware = (request) => {
  console.log("Request:", request);
  console.log("Headers:", request.headers);
  console.log("Cookies:", request.cookies);
  return request;
};
