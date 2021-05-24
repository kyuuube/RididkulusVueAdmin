const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config');
const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const devConf = merge(common, {
    mode: 'development',
    devtool: config.dev.devtoolType,
    devServer: {
        quiet: true,
        compress: true,
        clientLogLevel: 'warning',
        contentBase: './public',
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: config.dev.host,
        port: config.dev.port,
        disableHostCheck: true,
        publicPath: '/',
        proxy: {
            '/api': {
                target: config.dev.target,
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        }
    },
    plugins: [
        new webpack.BannerPlugin('start'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'vue-ops-static',
            filename: 'index.html',
            template: './src/index.template.html',
            inject: true,
            chunksSortMode: 'none'
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    `You application is running here http://${config.dev.host}:${config.dev.port}`
                ]
                // notes: ["Some additionnal notes to be displayed unpon successful compilation"]
            },
            onErrors: undefined,
            clearConsole: true
        })
    ]
});
module.exports = devConf;
