export interface ISessionInfo {
  accessToken: string;
  refreshToken: string;
  appInfo: IAppInfo;
}

export interface IAppInfo {
  clientId?: string;
  name: string;
}
