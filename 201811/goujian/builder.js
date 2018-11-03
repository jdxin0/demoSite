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
        var clientFolder = process.argv[2];
        var projectFolder = process.argv[3];
        console.log(process.argv);
        if (!clientFolder) {
            console.log(chalk.red('  注意！需要填写参数告知是pc或m(例：node build pc spring)'));
            process.exit(1);
        }
        if (!projectFolder) {
            console.log(chalk.red('  注意！需要填写活动开发目录的文件名(例：node build pc spring)'));
            process.exit(1);
        }
        var entryFilePath = path.resolve(clientFolder + '/vip/2018/' + projectFolder + '/source/js/index.js');
        var entryFileName = path.parse(entryFilePath).name;
        var projectPath = path.resolve(entryFilePath + '/../../../');
        var destPath = path.resolve(projectPath + '/dist');
        var tplFilePath = path.resolve(projectPath + '/source/' + entryFileName + '.html');
        return { clientFolder, projectFolder, entryFilePath, projectPath, destPath, tplFilePath };
    }
    var config = init();
    return;
    var webpackConfig = {
        entry: config.entryFilePath,
        output: {
            path: config.destPath,
            filename: 'js/index.js',
            publicPath: 'https://act-vip-ssl.xunlei.com/' + config.clientFolder + '/vip/2018/' + config.projectFolder + '/dist/'
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
                            pathstr = pathstr.replace(/\\/g,'/');
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
                filename: '../index.html',
                hash: true,
                template: config.tplFilePath
            })
        ]
    };
    if (process.argv.indexOf('--copy')>1) {
        webpackConfig.plugins.push(
            new CopyPlugin([{
                from: path.resolve(config.projectPath + '/source/static'),
                to: config.destPath
            }])
        );
    }
    if (process.argv.indexOf('--pro')>1) {
        webpackConfig.devtool='source-map';
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
            client.scp(config.projectPath, {
                host: '10.10.45.12',
                username: 'devweb',
                password: 'I48OJ34Y',
                path: '/usr/local/zeus/htdocs/act.vip.xunlei.com/' + config.clientFolder + '/vip/2018/' + config.projectFolder
            }, function () {
                console.log(chalk[getColor()].bold(`已上传服务器:${new Date()}`));
            });
        });
    });
})();