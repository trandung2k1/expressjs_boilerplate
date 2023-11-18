const path = require('path');
const nodeExternals = require('webpack-node-externals');
const isProduction =
    process.argv[process.argv.indexOf('--mode') + 1] === 'production';
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        isProduction && new BundleAnalyzerPlugin(),
        new webpack.ProgressPlugin(),
        new Dotenv(),
    ],
    resolve: {
        extensions: ['*', '.js', '.json'],
    },
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    devtool: isProduction ? false : 'source-map',
};
