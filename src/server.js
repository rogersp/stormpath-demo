import path from 'path'
import http from 'http'
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'

let app = express();

const rewriteMiddleware = (req, res, next) => {
    // stupid-simple rewrite rule for handling front-end routes
    if (req.accepts('text/html') && req.url.indexOf('.') < 0) {    
        console.log(`rewriting url ${req.url} to index.html`);
        req.url = '/index.html';
    }    
    next();
}

app.use(rewriteMiddleware);

app.use(
    webpackMiddleware(
        webpack(webpackConfig), {
            publicPath: '/'
        }
    )
);

let port = 3050;
let httpServer = http.createServer(app);
httpServer.listen(port);  

console.log(`listening on http://localhost:${port}`);