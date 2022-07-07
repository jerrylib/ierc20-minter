const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    "ierc20-minter": path.join(__dirname, "src/index.js"),
    "ierc20-minter.min": path.join(__dirname, "src/index.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "minter",
    libraryExport: "default",
  },
  mode: "none",
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /(node_modules)/,
      },
    ],
  },
  resolve: {
    alias: {
      "@constants": path.join(__dirname, "src/constants"),
      "@utils": path.join(__dirname, "src/utils"),
    },
    extensions: ["", ".js"],
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
};
