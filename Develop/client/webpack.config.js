const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
const workboxPlugin = new InjectManifest({
  swSrc: "./src-sw.js",
  swDest: "src-sw.js",
});

const manifestPlugin = new WebpackPwaManifest({
  name: "My Progressive Web App",
  short_name: "My PWA",
  description: "This is my Progressive Web App",
  background_color: "#ffffff",
  theme_color: "#000000",
});

// TODO: Add CSS loaders and babel to webpack.
const cssLoader = {
  test: /\.css$/i,
  use: [MiniCssExtractPlugin.loader, "css-loader"],
};

const babelLoader = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
};

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new MiniCssExtractPlugin(),
      workboxPlugin,
      manifestPlugin,
    ],

    module: {
      rules: [cssLoader, babelLoader],
    },
  };
};
