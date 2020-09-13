const path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', 'babel-plugin-styled-components'],
          },
        }, 'source-map-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Added to remove chrome dev tools errors:
  devtool: 'source-map',
};
