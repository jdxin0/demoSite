/*global process*/
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const rm = require('rimraf');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;
var webpackConfig = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve('dist'),
        filename: '[hash].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: 'css-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1',
            'typeof window': JSON.stringify('object')
        })
    ]
};
if ('development' === NODE_ENV) {
    Object.assign(webpackConfig, {
        devtool: 'source-map'
    });
}
rm(path.resolve('dist'), err => {
    if (err) throw err;
    var spinner = ora('building for production...\n');
    spinner.start();
    webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'));
            process.exit(1);
        }

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
        ));
    });

});
