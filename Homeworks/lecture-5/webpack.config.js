const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: "/",
            clean: true
        },
        mode: isProduction ? "production" : "development",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                ["@babel/preset-react", { runtime: "automatic" }]
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ["file-loader"]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: "styles.[contenthash].css",
            }),
        ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ],
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            historyApiFallback: true,
            hot: true,
            open: true,
            compress: true,
            port: 8080,
            headers: {
                "Content-Security-Policy":
                    "default-src 'self'; " +
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
                    "style-src 'self' 'unsafe-inline'; " +
                    "img-src 'self' data: blob:; " +
                    "connect-src 'self' ws://localhost:8080 http://localhost:8080;"
            }
        },
    }
};
