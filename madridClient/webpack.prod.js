// webpack.dev.js
const { CheckerPlugin } = require('awesome-typescript-loader')
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: '',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      Components: srcPath('Components'),
      Containers: srcPath('Containers'),
      Mocks: srcPath('Mocks'),
      Services: srcPath('Services'),
      Shared: srcPath('Shared'),
      Types: srcPath('Types')
    },
  },

  devServer: {
    port: '2222',    // Change it if other port needs to be used
    hot: true,
    contentBase: 'dist',
    historyApiFallback: true
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader'
      },
      // import all .css style files
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  plugins: [
    // Generate index.html file in the output
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new CopyWebpackPlugin(
      [
        {
          from: __dirname + '/node_modules/react/umd/react.development.js',
          to: __dirname + '/dist/react.js'
        },
        {
          from:
            __dirname + '/node_modules/react-dom/umd/react-dom.development.js',
          to: __dirname + '/dist/react-dom.js'
        }
      ],
      { debug: true }
    ),

    new CheckerPlugin()
  ]
}

