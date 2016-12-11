module.exports = {
  entry: __dirname+"/src/js/app.jsx",
  output: {
    path: __dirname+"/dist/js",
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: __dirname+"/src/js",
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
          "react",
          "es2015"
        ]}
      },
    ]
  },
  resolve: {
    extensions: [
      "", ".js", ".jsx",
    ]
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "src/html/index.html"
    }
  }
};
