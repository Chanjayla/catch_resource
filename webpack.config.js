const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    entry: {
        app: "./app/main.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "build"),
        publicPath: "",
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        inline: false,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!postcss-loader",
                    publicPath: '/'
                })
            },
            {
                test: /\.(svg|ttf|woff|woff2)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader?limit=8192&name=img/pc/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html',
            chunks: ['app']
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {

    }
}