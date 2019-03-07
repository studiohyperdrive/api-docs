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
    * The host of your api. Will fill up the `host` property
* basePath
    * The basePath of your api. Will fill up the `basePath` property.
* schemes
    * The scehemes of your api. Will fill up the `schemes` property

## Usage ##

Swagger docs will be available on these routes:
* HTML: [https://my-own-url.com/{baseUrl}/docs](https://my-own-url.com/{baseUrl}/docs)
* JSON: [https://my-own-url.com/{baseUrl}/docs/json](https://my-own-url.com/{baseUrl}/docs/json)

(Replace _https://my-own-url.com_ with your domain. _baseUrl_ is optional depending on your config.)
