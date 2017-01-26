var path = require('path');
var findCacheDir = require('find-cache-dir');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// configure stormpath
// load config depending on environment
let configEnv = process.env.NODE_ENV;
console.log(`webpack configuration environment: ${configEnv}`);
let stormpathConfigFile = `./stormpath.config.${configEnv}.json`;
let stormpathConfig = require(stormpathConfigFile) 

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        path.join(__dirname, 'src/index.js')      
    ],
    output: {
        path: path.join(__dirname, 'build'),
        pathinfo: true,
        filename: 'bundle.js',
        publicPath: '/'        
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                loaders: [ 'babel?cacheDirectory=' + findCacheDir({name: 'react-scripts'}) ], 
                include: path.join(__dirname, 'src')
            }            
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
            'process.env.STORMPATH_CONFIG': JSON.stringify(stormpathConfig)
        }),        
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'public/index.html')
        })        
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};