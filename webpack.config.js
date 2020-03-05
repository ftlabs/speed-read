const path = require("path");
/**
 * webpack & plugins
 */
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

/**
 * postcss plugins
 */
const postcssAutoPrefixer = require("autoprefixer");
const postcssCustomProperties = require("postcss-custom-properties");

const isDev = process.env.NODE_ENV !== "prod";

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: ["main.js"]
    })
  ]
};
