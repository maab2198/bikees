const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "./dist")
  },
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
     contentBase: './'
   },
  module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        { test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, 
             {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              }
            }
          }, 
          {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader:'file-loader',
            options: {
             name: '[name].[ext]',
             outputPath: 'img/',
             publicPath: 'dist/img/'
           }
          }
          ]
        },
         {
         test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
         use: [{
           loader: 'file-loader',
           options: {
             name: '[name].[ext]',
             outputPath: 'fonts/',    // where the fonts will go
             publicPath: 'dist/fonts/'       // override the default path
           }
         }]
    }]},
    plugins: [
     //new CleanWebpackPlugin(['dist/']),
     /*new CopyWebpackPlugin([
      { from: 'node_modules/bootstrap-sass/assets/fonts/', to: 'fonts' }
    ]),
    */
     new ExtractTextPlugin("styles.css"),
     new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['./'] },
        files: ['./*.html','./src/style/sass/*/**/.scss']
      })
    ]
  };