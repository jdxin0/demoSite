const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin') //CSS文件单独提取出来
const optimizeCss = require('optimize-css-assets-webpack-plugin');

const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = require('./config')
const utils = require('./utils')


let {
  entries,
  plugins
} = utils.getWebpackConfig('./src/views/**/index.js')

const isDev = process.env.NODE_ENV === "development"

const happyPacks = [
  new HappyPack({
    id: 'js',
    loaders: [{
      loader: 'babel-loader',
      options: {
        presets: ['es2015'],
        cacheDirectory: true,
        plugins: ['transform-decorators-legacy']
      }
    }],
    threadPool: happyThreadPool,
  }),
]

module.exports = {
  cache: true,
  mode: process.env.NODE_ENV,
  entry: entries,
  output: {
    path: path.resolve(__dirname, config.build.outputPath),
    publicPath: isDev ? config.dev.assetsPublicPath : config.build.assetsPublicPath,
    filename: (isDev ? config.dev.assetsSubDirectory : config.build.assetsSubDirectory) + '[name].build.[chunkHash:8].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'components': path.resolve(__dirname, './src/components'),
      'lib': path.resolve(__dirname, './lib'),
      'tool': path.resolve(__dirname, './src/js/tool'),
      'views': path.resolve(__dirname, './src/views'),
      '@components': path.resolve(__dirname, './src/vue-components'),
      'src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    ...plugins,
    ...happyPacks,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + process.env.NODE_ENV + '"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // new ExtractTextWebapckPlugin("css/[name].css"),
    ...isDev ? [] : [
      new CleanWebpackPlugin(['dist/*.*', 'dist/*/*.*'])
      // new CopyWebpackPlugin([ // 复制插件
      // { 
      //   from: path.join(__dirname, 'src/img'), 
      //   to:  path.join(__dirname, 'dist/img') 
      // },
      // {
      //   from: path.join(__dirname, 'src/image'), 
      //   to:  path.join(__dirname, 'dist/image') 
      // }
      // ])
    ]
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps,
        uglifyOptions: {
          warnings: false
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        xlLib: {
          test: /public-sale\/lib/,
          minChunks: 2,
          name: 'xl-lib',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: 'happypack/loader?id=js'
        },
        cacheBusting: true,
        transformToRequire: {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: 'xlink:href'
        }
      },
      // loader: ['happypack/loader?id=vue'],
      include: [path.resolve(__dirname, './src')],
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: ['happypack/loader?id=js'],
      // use: {
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ['es2015'],
      //     cacheDirectory: true
      //   }
      // }
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.(tpl|html)$/,
      loader: 'text-loader'
    },
    {
      test: /\.css$/,
      // use: ExtractTextWebapckPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [{
      //       loader: 'css-loader',
      //       options:{
      //           minimize: true //css压缩
      //       }
      //     }]
      // }), // 提取import进来的css到css文件中
      //exclude: /node_modules/
      use: ['style-loader', 'css-loader']
    }
    ]
  },

  devServer: {
    port: 80,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    disableHostCheck: true,
    host: '127.0.0.1',
    // hot: true,
    // inline: true,
    // https: true
  },

  performance: {
    hints: false
  },
  devtool: '#source-map'
}
