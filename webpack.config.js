var path = require('path');
var findCacheDir = require('find-cache-dir');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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