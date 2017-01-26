import path from 'path'
import http from 'http'
import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'

let app = express();

// stupid-simple request reqwrite middleware for handling front-end route direct requests
// rewrite all non-"file requests" to "index.html"
const rewriteMiddleware = (req, res, next) => {    
    if (req.accepts('text/html') && req.url.indexOf('.') < 0) {    
        console.log(`rewriting url ${req.url} to index.html`);
        req.url = '/index.html';
    }    
    next();
}
app.use(rewriteMiddleware);

// use webpack dev server middleware
app.use(
    webpackMiddleware(
        webpack(webpackConfig), {
            publicPath: '/'
        }
    )
);

const startServer = () => {
    // fire up server
    let port = 3050;
    let httpServer = http.createServer(app);
    httpServer.listen(port);  
    console.log(`UI server listening on http://localhost:${port}`);
}

startServer();