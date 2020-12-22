const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    context: __dirname,
    entry: {
        app: './src/index.jsx',
    },
    output: {
        path: `${__dirname}/build`,
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        noParse: /lodash/,
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: /src/,
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /(\.css$)/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(png|jp(e*)g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash]-[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PUBLIC_URL': JSON.stringify('')
        }),
        new HtmlWebpackPlugin({
            template: 'template.html',
        }),
        new CopyPlugin({
            patterns: [
                {from: './img/*',},
            ],
        }),
    ],
};
