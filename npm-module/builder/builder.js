#!/usr/bin/env node

/*global process*/
(function() {
    var pathstr = '';
    var fs = require('fs');
    var ora = require('ora');
    var rm = require('rimraf');
    var path = require('path');
    var chalk = require('chalk');
    var client = require('scp2');
    var webpack = require('webpack');
    var CopyPlugin = require('copy-webpack-plugin');
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    var stripJsonComments = require('@luojianet/remove-json-comments');
    var sftpConfig = {};

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
            publicPath: 'dist/'
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'project': config.projectPath
            }
        },
        resolveLoader: {
            modules: [path.resolve(__dirname, 'node_modules')]
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: function(file) {
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
                test: /\.html$/,
                use: 'html-loader'
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                filename: '../index.html',
                template: config.tplFilePath
            })
        ]
    };

    function readFile(url) {
        return new Promise(function(resolve, reject) {
            fs.readFile(url, 'utf-8', function(err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    function existEntryFile() {
        fs.exists(path.resolve(config.projectPath + '/source/static'), function(exists) {
            if (exists) {
                webpackConfig.plugins.push(
                    new CopyPlugin([{
                        from: path.resolve(config.projectPath + '/source/static'),
                        to: config.destPath
                    }])
                );
            }
        });
        if (process.argv.indexOf('--pro') > 1) {
            webpackConfig.devtool = 'source-map';
            webpackConfig.output.filename = 'js/index.min.js';
            webpackConfig.plugins.push(
                new webpack.BannerPlugin('[@luojianet](http://www.xuliehaonet.com)'),
                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: true
                }),
                new ExtractTextPlugin('./css/style.css')
            );
            webpackConfig.module.rules[0].use = ExtractTextPlugin.extract({
                publicPath: '../',
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer')(),
                            require('stylefmt')()
                        ]
                    }
                }]
            })
            webpackConfig.module.rules[1].use[0].options.limit = 8192;
            webpackConfig.module.rules[1].use.push({
                loader: 'image-webpack-loader'
            })
            webpackConfig.module.rules.push({
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [path.resolve(__dirname, 'node_modules/babel-preset-env')],
                        plugins: [path.resolve(__dirname, 'node_modules/babel-plugin-transform-runtime')]
                    }
                }],
                exclude: /node_modules|qrcode.js/
            });
        }
        rm(config.destPath, function(err) {
            if (err) throw err;
            var spinner = ora('主人，小倩正在努力构建中...\n');
            spinner.start();

            function builderSuccess(err, stats) {
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
                console.log(chalk.hex('#51a351')(`主人，小倩已帮您构建完成啦...耗时${(stats.endTime - stats.startTime) / 1000}s\n`));
                var domainList = ['act.vip.xunlei.com', 'vip.xunlei.com'];
                for (var domain of domainList) {
                    if (config.projectPath.indexOf(domain) > -1) {
                        var clientFolder = config.projectPath.split(domain + '\\')[1];
                        clientFolder = clientFolder.replace(/\\/g, '/');
                        var remotePath = '/usr/local/zeus/htdocs/' + domain + '/' + clientFolder;
                        fileDisplay(config.projectPath); //提前sftp配置文件
                        client.scp(config.projectPath, {
                            host: sftpConfig.host,
                            username: sftpConfig.user,
                            password: sftpConfig.password,
                            path: remotePath
                        }, function() {
                            console.log(chalk[getColor()].bold(`已上传服务器:${new Date()}`));
                        });
                        break;
                    }
                }
            }
            if (process.argv.indexOf('--watch') > 1) {
                console.log(chalk.green('主人，您当前运行在监听模式下。'));
                var compiler = webpack(webpackConfig);
                var watching = compiler.watch({
                    // watchOptions
                    aggregateTimeout: 300
                }, function(err, stats) {
                    builderSuccess(err, stats);
                });
                // watching.close(function(){
                //     console.log('关闭监听模式');
                // });
            } else {
                webpack(webpackConfig, function(err, stats) {
                    builderSuccess(err, stats);
                });
            }
        });
    }
    readFile(config.entryFilePath).then(function(data) {
        if (path.extname(path.resolve(config.entryFilePath)) !== '.js') {
            console.log(chalk.red(`主人，您输入的文件类型不合法，当前输入的是${path.extname(path.resolve(config.entryFilePath))}类型，期望输入的是.js文件`));
            return;
        }
        existEntryFile();
    }, function(err) {
        console.log(chalk.red('主人，您输入的文件路径找不到。'));
    })

    function fileDisplay(filePath) {
        var files = fs.readdirSync(filePath);
        if (files.includes('sftp-config.json')) {
            // console.log(`${filePath}\\sftp-config.json`);
            var content = fs.readFileSync(`${filePath}\\sftp-config.json`, 'utf-8');
            var sftpData = stripJsonComments(content, { whitespace: false });
            sftpData = JSON.parse(sftpData);
            ({
                host: sftpConfig.host,
                user: sftpConfig.user,
                password: sftpConfig.password
            } = sftpData);
        } else {
            if (path.resolve(filePath + '/..') !== filePath) {
                var upFolder = path.resolve(filePath + '/..');
                fileDisplay(upFolder);
            }
        }
    }
})();