# NameChecker

<p align="center">
  <img src="https://github.com/Lansweeper-public/NameChecker/blob/main/public/assets/svg/name-checker-logo.svg" alt="Namechecker" width="200px"/>
</p>

---

Lansweeper ADP integration to be used as example about how to consumer Lansweeper API. The purpose of this certified application is to be able to check the name of your assets based on a pattern.

You can use it as an example about how to build a [Lansweeper cloud application](https://docs.lansweeper.com/docs/api/authenticate#cloud-application). Namechecker is built with [Nextjs](https://nextjs.org/) to provide its interface with server side rendering.

## Requirements

In order to run namechecker locally, please ensure your system accomplish following requirements:

- [NodeJS v14.x](https://nodejs.org/download/release/latest-v14.x/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- To have a Lansweeper ADP account.

Your first step will be check our [documentation](https://docs.lansweeper.com/docs/api/authenticate#cloud-application) where it is explained how to create a Lansweeper cloud application, you will need that values. For authentication purposes, the `Allowed callback URL` should match with:

```
http://localhost:3000/api/callback
```

## Getting started

After that, you should have a file with your application credentials ("client_id" and "client_secret"), you can start creating your .env file in the root folder, you can create based on env.example file. The file, without the optional values, should be similar to:

```
NODE_ENV=development
PORT=3000

# Lansweeper application settings
LS_APP_NAME=NameChecker
LS_APP_CLIENT_ID=<client_id retrieved>
LS_APP_CLIENT_SECRET=<client_secret retrieved>
LS_APP_CALLBACK_URI=http://localhost:3000/api/callback
LS_APP_AUTHORIZE_URI=<authorization URL retrieved>

# Lansweeper API endpoint
INTEGRATIONS_GATEWAY_HOST=https://api.lansweeper.com/api/v2

# Redis settings
SESSION_SECRET=my-secret
```

Now run:

```
yarn && yarn develop
```

Congrats, Namechecker is running locally, you can access to the url:

```
http://localhost:3000
```

**Note:** _take into account the parameters between <> should be retrieved from application creation process_

## API usage

Namechecker is using synchronous queries to Lansweeper API as is explained [here](https://docs.lansweeper.com/docs/api/getting-data#querying). Those queries are in `src/services` folder.

### :people_holding_hands: Me query

In `src/services/me.ts` you can find a query that is getting information related to the user and the sites that has been authorized. It is used in the `src/pages/reports/[siteId].tsx` page in order to show the sites authorized to your Namechecker application.

### :crossed_flags: Sites query

In `src/services/sites.ts` there is an example about how can be retrieved information of a site, providing the siteId obtained in 'authorizedSites' query.

### :magic_wand: Assets query

The last one and most important, how to retrieve assets, it is in `src/services/assetResources.ts`. The first call performed doesn't have page, then Lansweeper API will provide the first matches without cursor.

Once the user is navigating to next or previous page, it is added to the query using a cursor, the cursor is an identifier obtained in the last query performed to know next or previous element, in this way Namechecker is consuming the API in a paginated way.

### :lock: Authentication

All the authentication mechanism is done in `src/routes/index.js`. Namechecker is exposing an endpoint in `/api/callback` resource and it will receive the authorization code used in the authorization code authentication flow.

The first action performed by this route is a POST to Lansweeper API:

```
 `${process.env.INTEGRATIONS_GATEWAY_HOST}/graphql`
```

In the request body, all parameters provided in the `.env` file and the authorization code retrieved in the route are sent, obtaining an `access_token` and a `refresh_token`. With the `access_token` the already explained request will be authenticated until it will expire.
