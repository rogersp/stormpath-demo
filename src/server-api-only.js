import path from 'path'
import http from 'http'
import cors from 'cors'
import express from 'express'
import stormpath from 'express-stormpath'

let app = express();

// configure cors
app.use(cors({    
    origin: true,           // Response will have Access-Control-Allow-Origin header that matches request origin.
    credentials: true       // Response will have Access-Control-Allow-Credentials header, so response will be exposed to the page.
}));

const startServer = () => {
    // fire up server
    let port = 3030;
    let httpServer = http.createServer(app);
    httpServer.listen(port);  
    console.log(`API server listening on http://localhost:${port}`);
}

// configure stormpath
// load config depending on environment
let configEnv = process.env.NODE_ENV;
console.log(`server configuration environment: ${configEnv}`);
let configFile = `../stormpath.config.${configEnv}.json`;
let config = require(configFile)

// start server with or without stormpath middleware,
// depending on if the "ExpressApp" element exists in our loaded config.
if  (config.ExpressApp) {
    app.use(
        stormpath.init(app, Object.assign({
            debug: 'info',
            web: {
                produces: ['application/json']
            }
        }, config.ExpressApp))
    );
    app.on('stormpath.ready', () => {
        startServer();  
    });   
}