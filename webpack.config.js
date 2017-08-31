var path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const vendors = [
  "react",
  "react-dom",
  "react-redux",
  "react-router-dom",
  "react-router-redux",
  "redux",
  "react-select"
];
module.exports = {
  entry: {
    app: "./src/client/index.js",
    vendor: vendors
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/javascripts/")
  },

  resolve: {
    modules: ["node_modules", "./node_modules"],
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx"],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      "react-native": "react-native-web"
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(path.resolve(__dirname, "src")),
      new ExtractTextPlugin({
        filename: "app.css"
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, "src"),
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve("style-loader"),
              use: [
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true
                  }
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: "postcss",
                    plugins: () => [
                      require("postcss-flexbugs-fixes"),
                      autoprefixer({
                        browsers: [
                          ">1%",
                          "last 4 versions",
                          "Firefox ESR",
                          "not ie < 9" // React doesn't support IE8 anyway
                        ],
                        flexbox: "no-2009"
                      })
                    ]
                  }
                },
                {
                  loader: require.resolve("less-loader"),
                  options: {
                    strictMath: true,
                    noIeCompat: true,
                    sourceMap: true
                  }
                }
              ]
            },
            {
              publicPath: path.resolve(__dirname, "public/css/")
            }
          )
        )
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      }
    ]
  },
  plugins: [
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin(path.resolve(__dirname, "src")),
    new ExtractTextPlugin({
      filename: "app.css"
    })
  ]
};
