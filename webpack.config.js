var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

var NODE_MODULES_PATH = path.join(__dirname, 'node_modules');
var PROJECT_PATH = path.join(__dirname, 'src');

var config = {
    entry: [
        // 'webpack-dev-server/client?path=http://127.0.0.1:8000/__webpack_hmr',
        // 'webpack-hot-middleware/client?path=http://127.0.0.1:8003/__webpack_hmr',
        path.resolve(PROJECT_PATH, 'index.js')
    ],

    resolve: {
        alias: {},
        extensions: ['', '.js', '.jsx'],
        fallback: PROJECT_PATH
    },

    resolveLoader: {
        root: NODE_MODULES_PATH
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js',
        publicPath: '/dist'
    },

    module: {
        noParse: [],
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: PROJECT_PATH
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.css?$/,
            loaders: ['style', 'css', 'postcss'],
        }, {
            test: /\.(woff|eot|ttf)$/i,
            loader: 'url',
            query: {
                limit: 8192,
                name: 'fonts/[hash:8].[name].[ext]'
            }
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url',
            query: {
                limit: 8192,
                name: 'images/[hash:8].[name].[ext]'
            }
        }]
    },

    devServer: {
        port: 3000,
        hot: true,
        // Enable special support for Hot Module Replacement
        // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
        // Use "webpack/hot/dev-server" as additional module in your entry point
        // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

        historyApiFallback: true,
        // webpack-dev-middleware options
        quiet: false,
        noInfo: false,
        stats: {
            chunks: false,
            colors: true
        }
    },

    postcss: function () {
        return [precss, autoprefixer];
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}

// 第三方库指向min.js，开发时reload不再编译
// moment改路径防止引入locale版本
// var deps = [{
//     name: 'moment',
//     file: 'moment/min/moment.min.js'
// }]

// deps.forEach(function (dep) {
//     var depPath = path.resolve(NODE_MODULES_PATH, dep.file);
//     config.resolve.alias[dep.name] = depPath;
//     config.module.noParse.push(depPath);
// })

module.exports = config
