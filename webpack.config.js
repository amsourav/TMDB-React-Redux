var path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
  entry: './src/client/index.js',

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/javascripts/')
  },

  resolve: {
    modules: ['node_modules', './node_modules'],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(path.resolve(__dirname, 'src')),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        }
      }
    ]
  }
};
