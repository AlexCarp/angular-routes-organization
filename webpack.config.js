var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts',
        'styles': './src/styles/index.less'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    'html-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            doctype: 'html'
                        }
                    }
                ]
            }, {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                    },
                    'angular-router-loader',
                    'angular2-template-loader'
                ]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    filename: "[name].[hash].css",
                    allChunks: true,
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, 'src'),
            {}
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.pug'
        }),
        new UglifyJSPlugin(),
        new ExtractTextPlugin({
            filename: "style.css",
            allChunks: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false
            }
        })
    ]
}