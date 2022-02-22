export interface ISite {
  id: string;
  name: string;
  companyName: string;
  logoUrl: string;
}

export interface ISiteContext {
  site: ISite;
}

export interface ISiteResponse {
  data: ISiteContext;
}
