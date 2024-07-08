# NameChecker

<p align="center">
  <img src="https://github.com/Lansweeper-public/NameChecker/blob/main/public/assets/svg/name-checker-logo.svg" alt="Namechecker" width="200px"/>
</p>

---

Lansweeper ADP integration to be used as example about how to use Lansweeper API. The purpose of this certified application is to be able to check the name of your assets based on a pattern.

You can use it as an example about how to build a [Lansweeper cloud application](https://docs.lansweeper.com/docs/api/authenticate#cloud-application). Namechecker is built with [Nextjs](https://nextjs.org/) to provide its interface with server side rendering.

## Requirements

In order to run namechecker locally, please ensure your system accomplishes the following requirements:

- [NodeJS v14.x](https://nodejs.org/download/release/latest-v14.x/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- An existing Lansweeper ADP account.

Your first step will be to check our [documentation](https://docs.lansweeper.com/docs/api/authenticate#cloud-application) where it is explained how to create a Lansweeper cloud application, which will provide all necessary data for setting up your custom integration. For authentication purposes, the `Allowed callback URL` should match with:

```
http://<my.domain>:3000/api/callback
```

For development purposes in local environment you cannot use `localhost` then you are going to need to use a non existing domain and modify your host file to redirect the domain to fill in `<my.domain>` to point to `127.0.0.1`.

## Getting started

After that, you should have a file with your application credentials (`client_id` and `client_secret`), you can start creating your `.env` file in the root folder, you can create it based on `env.example` file. The file, without the optional values, should be similar to:

```
NODE_ENV=development
PORT=3000

# Lansweeper application settings
LS_APP_NAME=NameChecker
LS_APP_CLIENT_ID=<retrieved client_id>
LS_APP_CLIENT_SECRET=<retrieved client_secret>
LS_APP_CALLBACK_URI=http://localhost:3000/api/callback
LS_APP_AUTHORIZE_URI=<retrieved authorization URL>

# Lansweeper API endpoint
INTEGRATIONS_GATEWAY_HOST=https://api.lansweeper.com/api/v2

# Redis settings
SESSION_SECRET=my-secret
```

Now run:

```
yarn && yarn develop
```

And that's it! Congrats! Namechecker is running locally and you can access it at the URL:

```
http://localhost:3000
```

**Note:** _take into account the parameters between <> should be retrieved from the application's creation process_

## API usage

Namechecker is using synchronous queries to Lansweeper API as explained [here](https://docs.lansweeper.com/docs/api/getting-data#querying). Those queries are in `src/services` folder.

### :people_holding_hands: Me query

In [src/services/me.ts](https://github.com/Lansweeper-public/NameChecker/blob/main/src/services/me.ts) you can find a query that gets information related to the user and the authorized sites. It is used in the `src/pages/reports/[siteId].tsx` page in order to show the sites authorized to your Namechecker application.

### :crossed_flags: Sites query

In [src/services/sites.ts](https://github.com/Lansweeper-public/NameChecker/blob/main/src/services/sites.ts) there is an example about how can be retrieved information of a site, providing the `siteId` obtained in `authorizedSites` query.

### :crossed_swords: Assets query

The last and most powerful one, how to retrieve assets. It is located in [src/services/assetResources.ts](https://github.com/Lansweeper-public/NameChecker/blob/main/src/services/assetResources.ts). The first performed call does not have pagination, so Lansweeper API will provide the first matches without cursor.

Once the user is navigating to next or previous page, a cursor is added to the query. The cursor is an identifier obtained in the last performed query to know the next or previous element. This way, Namechecker is consuming the API in a paginated way.

### :lock: Authentication

All the authentication mechanism is done in [src/routes/index.js](https://github.com/Lansweeper-public/NameChecker/blob/main/src/routes/index.js). Namechecker is exposing an endpoint in `/api/callback` resource and it will receive the authorization code used in the authorization code authentication flow.

The first action performed by this route is a POST to Lansweeper API:

```
 `${process.env.INTEGRATIONS_GATEWAY_HOST}/graphql`
```

In the request body, all parameters provided in the `.env` file and the authorization code retrieved in the route are sent, obtaining an `access_token` and a `refresh_token`. With the `access_token` the already explained request will be authenticated until it expires.
