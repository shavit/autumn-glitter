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
        loader: "babel"
      },
    ]
  }
};
