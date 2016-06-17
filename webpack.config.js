const path = require('path')
const pkg = require('./package.json');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');


var isProduction = function () {
    return process.env.NODE_ENV === 'production';
};


var plugins = [
    new webpack.DefinePlugin({
        VERSION: pkg.version,
        DEBUG: process.env.NODE_ENV !== 'production',
        'process.env.NODE_ENV': isProduction() ? '"production"' : '"development"'
    }),

    new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
        // 'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),

    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html')
    }),

    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
]

var loaders = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            presets: ['es2015', 'react']
        }
    }, {
        test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
        // loaders: ["url?limit=1024&name=img2/[name].[ext]"],
        loaders: ["url?limit=1024&name=/[path][name].[ext]"],
        exclude: /node_modules/
    }
]


if (isProduction()) {

    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
        new ExtractTextPlugin('css/style.css')
    )

    loaders.push(
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass', 'postcss')
        }
    )
} else {
    loaders.push(
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            // loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
            loader: 'style!css!sass'
        }
    )
}

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        'index': './index.js',
        'vendor': ['react']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: loaders
    },
    postcss: [autoprefixer],
    resolve: {
        extensions: ["", ".js", ".jsx", '.es6'],
        // root: path.join(__dirname, '/app/js-es6/'),
        modulesDirectories: ["node_modules"]
    },
    plugins: plugins,
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    },
    externals: {
        'Config': JSON.stringify(isProduction() ? {
            serverURL: "http://114.215.131.176"
        } : {
                serverURL: "http://localhost:8090"
            })
    }
}