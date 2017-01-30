import path from 'path'
import http from 'http'
import cors from 'cors'
import express from 'express'
import stormpath from 'express-stormpath'
import cache from 'memory-cache'

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

// Stormpath postLoginHandler
const postLoginHandler = (account, req, res, next) => {    
    console.log('postLoginHandler');
    
    // wrap response.json method to get tokens issued by stormpath middleware
    // no other way to get this at the moment?    
    let prevJson = res.json;
    res.json = function(obj) {            
        if (obj.refresh_token) {
            // cache the refresh with its current access token.
            // if the access token is refreshed it should be put here as well.
            // it would be desireable to also save any access tokens that have not expired, but don't bother now for simplicity.
            cache.put(`refresh_${obj.refresh_token}`, obj.access_token);   
        }            

        prevJson.apply(res, arguments);
    };

    next(); 
}

// Stormpath postLogoutHandler
const postLogoutHandler = (account, req, res, next) => {        
    console.log('postLogoutHandler');    
    let refreshToken = req.body.token;
    // look up the access token to blacklist it locally
    // look up is performed by our refresh token, since that is what is supplied in the request    
    let accessToken = cache.get(`refresh_${refreshToken}`);    
    if (accessToken) {
        console.log('found access token in cache! adding to blacklist...');
        // cache access token to indicate we are blacklisting.
        // technically we could put an expiration on the cache key to expire when the token expires, but don't bother now for simplicity.        
        cache.put(`access_blacklist_${accessToken}`, true);        
    }    
    next();    
}

// Custom middleware to check presented Stormpath access token and reject if it shows in our blacklist
const checkBlacklistedToken = (req, res, next) => {
    let authHeader = req.headers.authorization;    
    let accessToken = authHeader && authHeader.match(/Bearer .+/) ? authHeader.split('Bearer ')[1] : '';
    if (accessToken) {        
        console.log(`access token has been provided! performing lookup in local token blacklist...`);        
        let blacklisted = cache.get(`access_blacklist_${accessToken}`);        
        if (blacklisted) {
            console.log('token has been blacklisted! clearing token from headers so Stormpath middleware will reject...');
            req.headers.authorization = 'Bearer blacklisted';
        }
    }        
    next();
}

// start server with or without stormpath middleware,
// depending on if the "ExpressApp" element exists in our loaded config.
if  (config.ExpressApp) {

    // build stormpath config
    let stormConfig = Object.assign({
            debug: 'info',
            web: {
                produces: ['application/json']
            },            
            postLoginHandler,
            postLogoutHandler
        }, config.ExpressApp);

    // use custom middleware
    app.use(checkBlacklistedToken);

    // use stormpath middleware        
    app.use(stormpath.init(app, stormConfig));    
    app.on('stormpath.ready', () => {
        startServer();  
    });   
}