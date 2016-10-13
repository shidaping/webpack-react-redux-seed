var webpack = require('webpack');
var path = require('path');
var nodeModulesDir = path.join(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config');
var env = process.env.NODE_ENV || 'development';
var fs = require('fs');
var webackConfig = {
  entry: {
    app: ['./src/js/app.js'],
    vendor: ['jquery']
  },
  output: {
    publicPath: `http://${config.staticFileHost}:${config.staticFilePort}${config.staticFilePrefix}`,
    path: './build/static',
    filename: env === 'development' ? '[name].js' : '[name]-[hash].js',
    // chunkFilename: "[id].js"
  },

  // externals: {
  // require('jquery') is external and available
  //  on the global var jQuery
  //   'jquery': 'jQuery'
  // },
  resolve: {
    alias: {
      'font-awesome.css': path.resolve(nodeModulesDir, 'font-awesome/css/font-awesome.min.css'),
      jquery: path.resolve(nodeModulesDir, 'jquery/dist/jquery.min.js'),
    }
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin((env !== 'development') ? '[name]-[hash].css' : '[name].css', { allChunks: true }),
    function() {
      this.plugin('done', function(stats) {
        fs.writeFileSync(
          path.join(__dirname, 'manifest.json'),
          JSON.stringify(stats.toJson().assetsByChunkName)
        );
      });
    }
  ],
  module: {
    noParse: ['./src/noparse/*'],
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /(node_modules)/
    // }, {
    //   test: /\.less$/,
    //  css?-autoprefixer!postcss!less
    //   loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!less')
    // }, {
    //   test: /\.css$/,
    //   loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!less')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.jpg|\.png$/,
      loader: 'file-loader'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'raw!html-minify?ext=[ext]'
    }]
  },
  devServer: {
    host: '0.0.0.0',
    port: config.devPort
  }
};
if (env === 'production') {
  webackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
}

module.exports = webackConfig;
