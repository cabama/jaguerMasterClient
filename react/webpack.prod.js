const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: __dirname + '/src/Services/worker.js', to: __dirname + "/dist/worker.js" },
      { from: __dirname + '/node_modules/react/umd/react.production.min.js', to: __dirname + "/dist/react.js" },
      { from: __dirname + '/node_modules/react-dom/umd/react-dom.production.min.js', to: __dirname + "/dist/react-dom.js" },
    ])
  ]
}