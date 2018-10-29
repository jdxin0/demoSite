/*global process*/
var path = require('path');
var rm = require('rimraf');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var whichClient = process.argv[2];
var act = process.argv[3];
if(!whichClient){
    console.log('需要填写是pc或m');
    process.exit(1);
}
if(!act){
    console.log('需要填写活动开发目录的文件名');
    process.exit(1);
}
var entry = path.resolve('../'+whichClient+'/vip/2018/' + act + '/js/index.js');
var dest = path.resolve('../'+whichClient+'/vip/2018/' + act + '/dist');
var tpl = path.resolve('../'+whichClient+'/vip/2018/' + act + '/tpl.html');

var webpackConfig = {
    entry: entry,
    output: {
        path: dest,
        filename: 'index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: tpl
        })
    ]
};
rm(dest, function (err) {
    if (err) throw err;
    webpack(webpackConfig, (err, stats) => {
        if (err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n');
    
        if (stats.hasErrors()) {
            console.log('  Build failed with errors.\n');
            process.exit(1);
        }
    
        console.log('  Build complete.\n');
    });
});

console.log(entry + '\n');
console.log(dest + '\n');
console.log(tpl + '\n');