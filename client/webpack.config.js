const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry:'./app/index',
  output:{
    path:path.resolve(__dirname,'build'),
    filename:'js/bundle.js'
  },
  resolve:{
    extensions:['.js','.jsx']
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        use:[{
          loader:'babel-loader',
          options:{
            presets:['es2015','react']
          }
        }]
      },
      {
        test:/\.less$/,
        use:ExtractTextPlugin.extract([{loader:'css-loader'},{loader:'postcss-loader'},{loader:'less-loader'}])
      },
      {
        test:/\.(png|svg|jpg|gif)$/,
        use:[{
          loader:'file-loader',options:{name:'img/[name].[hash].[ext]'}
        }]
      },
      {
        test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i,
        use:[{loader:'url-loader',options:{limit:5000,name:'foot/[name].[hash].[ext]'}}]
      },
      {
        test:/\.html$/,
        use:[{loader:'html-loader'}]
      }

    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./app/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/style.css'),
    new webpack.DefinePlugin({
      __DEV__:JSON.stringify(JSON.parse(process.env.NODE_ENV == 'dev')||'false')
    })
  ],
  devServer:{
    historyApiFallback:true,
    inline:true,
    port:'8081'
  }
}


