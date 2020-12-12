var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = env => {
  const mode = env.NODE_ENV || 'development'
  return {
    entry: {
      index: './src/index.js',
      background: './src/background.js'
    },
    output: {
      path: path.resolve(__dirname , 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader:'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['transform-class-properties']
          }
        },
        {test: /\.css$/, use:['style-loader', 'css-loader']}
      ]
    },
    mode,
    devtool: mode === 'development' ? 'eval-cheap-source-map' : false,
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: './src/manifest.json', to: path.resolve(__dirname, 'dist') }
        ],
      }),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json']
    }
  }
}