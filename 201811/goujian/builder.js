#!/usr/bin/env node
/*global process*/
(function () {
    var pathstr = '';
    var rm = require('rimraf');
    var ora = require('ora');
    var path = require('path');
    var chalk = require('chalk');
    var client = require('scp2');
    var webpack = require('webpack');
    var CopyPlugin = require('copy-webpack-plugin');
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    function getColor() {
        var colorArr = ['green', 'yellow', 'blue', 'magenta', 'cyan', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright'];
        return colorArr[Math.floor(Math.random() * 10)];
    }
    function init() {
        var input = process.argv[2];
        if (!input) {
            console.log(chalk.red('  输入要打包js文件的相对路径，例：build src/index.js'));
            process.exit(1);
        }
        var entryFilePath = path.resolve(process.cwd(), process.argv[2]);
        var entryFileName = path.parse(entryFilePath).name;
        var projectPath = path.resolve(entryFilePath + '/../../../');
        var destPath = path.resolve(projectPath + '/dist');
        var tplFilePath = path.resolve(projectPath + '/source/' + entryFileName + '.html');
        return { entryFilePath, entryFileName, projectPath, destPath, tplFilePath };
    }
    var config = init();
    var webpackConfig = {
        entry: config.entryFilePath,
        output: {
            path: config.destPath,
            filename: 'js/index.js',
            publicPath:'dist/'
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader'
                    }]
                })
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: function (file) {
                            pathstr = path.resolve(file);
                            pathstr = pathstr.split('source')[1];
                            pathstr = pathstr.split(/[^\\]*\.(png|jpg|gif|svg)$/)[0];
                            pathstr = pathstr.replace(/\\/g, '/');
                            pathstr = pathstr.substr(1);
                            return pathstr + '[name].[ext]?v=[hash:8]';
                        }
                    }
                }]
            }, {
                test: /\.js$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules|qrcode.js/
            }, {
                test: /\.html$/,
                use: 'html-loader'
            }]
        },
        plugins: [
            new webpack.BannerPlugin('[@luojianet](http://www.xuliehaonet.com)'),
            new ExtractTextPlugin('css/style.css'),
            new HtmlWebpackPlugin({
                hash: true,
                filename: '../index.html',
                template: config.tplFilePath
            })
        ]
    };
    if (process.argv.indexOf('--copy') > 1) {
        webpackConfig.plugins.push(
            new CopyPlugin([{
                from: path.resolve(config.projectPath + '/source/static'),
                to: config.destPath
            }])
        );
    }
    if (process.argv.indexOf('--pro') > 1) {
        webpackConfig.devtool = 'source-map';
        webpackConfig.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            })
        );
    }
    rm(config.destPath, function (err) {
        if (err) throw err;
        var spinner = ora('主人，小奴正在努力构建中...\n');
        spinner.start();
        webpack(webpackConfig, (err, stats) => {
            spinner.stop();
            if (err) throw err;
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');

            if (stats.hasErrors()) {
                console.log(chalk.red('主人，构建过程中出错啦！\n'));
                process.exit(1);
            }
            console.log(chalk.hex('#51a351')(`主人，小奴已帮您构建完成啦...耗时${(stats.endTime - stats.startTime) / 1000}s\n`));
            
        });
    });
})();