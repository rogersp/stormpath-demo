# Stormpath React SDK + Express SDK Demo

This app demonstrates how the two can work together, in combination with the Stormpath API.

## Getting Started

Perform the steps below to satisfy prerequisites:

* `npm install`
* Copy or rename the following files so they exist without `.SAMPLE` in name, and modify their content to contain appropriate configuration values:
    * `stormpath.config.local.SAMPLE.json`
    * `stormpath.config.remote.SAMPLE.json`
    * `stormpath.config.local-separates.SAMPLE.json`

There are three possible modes of operation, which change who the React front-end components talk to:

* **local**: communicate with our local Express backend API (running at the same host address), which will relay requests to the Stormpath API.
* **remote**: communicate directly with the Stormpath API, effectively ignoring/bypassing the local Express backend API.
* **local-separates**: same as **local**, but the Express backend API is hosted elsewhere (in our case, a different port).

Run **ONE** of the following commands depending on your desired mode of operation, described above:

* `npm run local` 
* `npm run remote` 
* `npm run local-separates`

## Issues

This project was created to demonstrate incompatibility under the `local-separates` run configuration, between the React SDK and Express SDK.

The primary issue is that under this configuration, the user is not automatically redirected to the login page after successful logout. A full browser refresh is necessary to trigger the redirect.
