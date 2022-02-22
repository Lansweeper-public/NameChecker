import nodeFetch from "node-fetch";
import { APPLICATION_JSON_CONTENT_TYPE } from "../lib/constants";
import { isServer } from "../lib/utils";
import { from } from "rxjs";

export const downloadAssets = async (url: string) => {
  if (isServer()) {
    const response = await nodeFetch(url);
    return response.body;
  } else {
    return (
      await fetch(`api/assets`, {
        method: "post",
        body: JSON.stringify({ url }),
        headers: {
          "Content-Type": APPLICATION_JSON_CONTENT_TYPE,
          Accept: APPLICATION_JSON_CONTENT_TYPE,
        },
      })
    ).json();
  }
};

export const getDownloadObservable = (url: string) => from(downloadAssets(url));
