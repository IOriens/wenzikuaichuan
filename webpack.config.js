var path = require('path')
var webpack = require('webpack')
module.exports = {    
    entry: {
        'index': 'index.js',
        'vendor': ['react']        
    },
    output: {
        path: path.join(__dirname, '/app/js/'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"'
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    resolve: {
        extensions: ["", ".js", ".jsx", '.es6'],
        root: path.join(__dirname, '/app/js-es6/'),
        modulesDirectories: ["node_modules"]
    }
}