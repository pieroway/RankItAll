var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        app: './src/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: [{loader: 'file-loader', options: {name: 'assets/[name].[hash].[ext]'}}]
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            { 
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    },

    performance: {
        hints: false
    },
    
    plugins: [

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            { }
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills'],
            minChunks: Infinity
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        new webpack.ProvidePlugin({
            Bloodhound: 'typeahead.js'
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new CopyWebpackPlugin([
            {
                from: helpers.root('src', 'i18n'),
                to: 'assets/i18n'
            }
        ])
    ]
};
