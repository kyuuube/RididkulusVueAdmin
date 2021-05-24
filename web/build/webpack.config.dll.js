const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//只需要使用yarn run dll一次就行
module.exports = {
    mode: 'production',
    // 修复table不渲染问题
    // @see https://github.com/ElemeFE/element/issues/18394
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    entry: {
        vendor: ['vue/dist/vue.esm.js', 'element-ui']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, '..', 'public/dll'),
        library: '_dll_[name]'
    },
    plugins: [
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '..'),
            exclude: [],
            verbose: true,
            dry: false
        }),
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, '../public/dll', 'mainfist.json')
        }),
        // new CleanWebpackPlugin({
        //     root: path.resolve(__dirname, '..'),
        //     exclude: [],
        //     verbose: true,
        //     dry: false
        // })
        //删除dll目录下的文件
    ]
};
