const webpack = require("webpack");
const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "./dist/assets"),
        filename: "bundle.js",
        publicPath: "/assets"
    },
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, "./dist"),
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["latest", "stage-0"]
                }
            },
            {
                test: /.json$/,
                exclude: /(node_modules)/,
                loader: "json-loader"
            }
        ]
    }


};