# Node.js API Docs #

Simple Node.js package which exposes Swagger docs both in JSON and HTML.

## Installation ##

```
$ npm install -S @studiohyperdrive/api-docs
```

## Setup ##

```js
app.use(docs({
    name: "my-api",
    version: "1.0.0",
    baseUrl: "/",
    path: "path/to/docs/folder/",
    basePath: "/v1",
    host: "studiohyperdrive.be",
    schemes: ["https", "http"],
    NODE_ENV: [
        "development"
    ]
}));
```

## Configuration ##

* name
    * Name of the API.
    * Defaults to the `package.json` name.
* version
    * Version of the API.
    * Defaults to the `package.json` version.
* baseUrl
    * All routes will be prefixed with this value.
    * Defaults to "/".
* path
    * Path (starting from the root) where all the docs can be found.
    * Package will search for Swagger docs in folder and nested folders.
* NODE_ENV
    * Package exposes two routes only in specific NODE_ENV's.
* host
    * host is the domain name or IP address (IPv4) of the host that serves the API.
    * Empty by default.
* basePath
    * basePath is the URL prefix for all API paths, relative to the host root. It must start with a leading slash /.
    * Defaults to "/".
* schemes
    * schemes are the transfer protocols used by the API. Swagger supports the http, https, and WebSocket schemes – ws and wss.
    * Defaults to "https".

## Usage ##

Swagger docs will be available on these routes:
* HTML: [https://my-own-url.com/{baseUrl}/docs](https://my-own-url.com/{baseUrl}/docs)
* JSON: [https://my-own-url.com/{baseUrl}/docs/json](https://my-own-url.com/{baseUrl}/docs/json)

(Replace _https://my-own-url.com_ with your domain. _baseUrl_ is optional depending on your config.)
