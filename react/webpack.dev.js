// webpack.dev.js
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: __dirname + '/src/Services/worker.js', to: __dirname + "/dist/worker.js" },
      { from: __dirname + '/node_modules/react/umd/react.development.js', to: __dirname + "/dist/react.js" },
      { from: __dirname + '/node_modules/react-dom/umd/react-dom.development.js', to: __dirname + "/dist/react-dom.js" },
    ], { debug: true })
  ]
}