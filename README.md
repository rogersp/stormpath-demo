# Stormpath React SDK + Express SDK Demo

This app demonstrates how the two can work together, in combination with the Stormpath API.

## Getting Started

Perform the steps below to satisfy prerequisites:

* `npm install`
* Rename `stormpath.config.local.SAMPLE.json` to `stormpath.config.local.json` and configure with appropriate values.
* Rename `stormpath.config.remote.SAMPLE.json` to `stormpath.config.remote.json` and configure with appropriate values.

There are two possible modes of operation, which change who the React front-end components talk to:

* **local**: communicate with our local Express backend API, which will relay requests to the Stormpath API.
* **remote**: communicate directly with the Stormpath API, and bypassing our local Express backend API.

Run the app in local OR remote mode:

`npm run local` -- **or** -- `npm run remote` 
