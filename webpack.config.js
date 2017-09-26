/*
 * Created by HuangJinYu on 16/11/21.
 * 开发环境的配置文件
 */
let path = require('path');
let webpack = require('webpack');
module.exports = {
    entry: {
        bundle: [
            'webpack-dev-server/client?http://localhost:8080',
            "webpack/hot/only-dev-server",
            './src/route.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dev'),
        filename: '[name].js'
    },
    module: {
        rules: [
            //     {
            //     test: /\.js$/,
            //     enforce: "pre",
            //     exclude: /node_modules/,
            //     use: [{loader:"eslint-loader"}]
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'react-hot-loader'
                },
                    {
                        loader: "babel-loader",
                        options: {presets: ['es2015', 'stage-0', 'react']}
                    }],
            }, {
                test: /images/,
                exclude: /node_modules/,
                use: [{loader: "file-loader"}]
            }, {
                test: /\.(png|jpg|svg)$/,
                use: [{loader: "url-loader?limit=8192"}]
            }, {
                test: /.less$/,
                // exclude: /node_modules/,
                use: ["style-loader", "css-loader", "less-loader"]
            }, {
                test: /icons/,
                exclude: /node_modules/,
                use: [{loader: 'url-loader'}]
            }, {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            wx: 'wx'
        }),
        new webpack.HotModuleReplacementPlugin({})
    ],
    devServer: {
        hot: true
    }
};