const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
  mode: "development",
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      http: false,
      fs: false,
      path: false,
    },
  },
  module: {
    rules: [
      // changed from { test: /\.js?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
      {
        test: /\.(t|j)s?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
      // addition - add source-map support
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
    ],
  },
};
