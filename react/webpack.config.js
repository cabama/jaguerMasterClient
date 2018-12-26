const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = (env) => {
  
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  console.log('ENV_KEYS: ', envKeys)

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },


    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
    },

    devServer: {
      host: '0.0.0.0',
      port: 2727,
      historyApiFallback: true,
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "awesome-typescript-loader"
        },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "source-map-loader"
        },
        // import all .css style files
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },


    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    },

    plugins: [
      // Generate index.html file in the output
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      // Copy React Modules to dist folder
      new CopyWebpackPlugin([
        { from: __dirname + '/node_modules/react/umd/react.development.js', to: __dirname + "/dist" },
        { from: __dirname + '/node_modules/react-dom/umd/react-dom.development.js', to: __dirname + "/dist" },
      ], { debug: true }),
      new webpack.DefinePlugin(envKeys)
    ]
  }
}
