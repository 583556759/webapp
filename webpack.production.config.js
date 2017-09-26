/**
 * Created by zhangjie on 17/5/11.
 * 发布环境的配置文件
 */
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        bundle: path.resolve(__dirname, './src/route.js'),
        common: ['react','react-dom','react-router','./lib/bootstrap/css/bootstrap.css','redux'] //分离第三方库
    },
    output: {
        path: path.join(__dirname, 'assets'),
        publicPath: '/assets/',//bundle.js的输出路径
        filename: '[name].[hash].js'
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
    plugins:[
        new webpack.optimize.UglifyJsPlugin(), //去掉空格
        new webpack.optimize.CommonsChunkPlugin({name:'common', filename:'common.[hash].js'})
    ],
};
