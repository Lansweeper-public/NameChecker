import { ISite } from "./site";

export interface IMe {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  fullName: string;
  imageUrl: string;
  language: string;
}

export interface IMeContext {
  me: Partial<IMe>;
  authorizedSites: {
    sites: ISite[];
  };
}

export interface IMeResponse {
  data: IMeContext;
}
