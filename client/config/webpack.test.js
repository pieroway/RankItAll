var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.js']
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
                use: [{ loader: 'null-loader' }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'null-loader' }]
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        new webpack.ProvidePlugin({
            Bloodhound: 'typeahead.js'
        })
    ]
}
