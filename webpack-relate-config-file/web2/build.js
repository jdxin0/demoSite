const ora = require('ora')
const {prompt} = require('inquirer')
const chalk = require('chalk')
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')

const git = require('simple-git')()
const branch = require('git-branch')

const gulp = require('gulp')
const minifyCSS = require('gulp-minify-css')  // 获取 minify-css 模块（用于压缩 CSS）
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const cssVersioner = require('gulp-css-url-versioner')
const clean = require('gulp-clean')

const shell = require('shelljs')
const fs = require('fs')

const config = require('./config')

const spinner = ora('building....')
const question = [
    {
        type: 'input',
        name: 'commitMessage',
        message: 'Please input commit message:',
        validate(val) {
          if(val === ''){
            return 'commit messag is required'
          }
          return true
        }
    }
]

prompt(question).then(({commitMessage}) => {
    const branchName = branch.sync()
    spinner.start()
    // 先更新代码
    shell.exec('git pull')
    // 更新cdn代码
    shell.cd('cdn')
    shell.exec('git checkout ' + branchName)
    shell.exec('git pull')

    // 清理文件
    gulp.task("clean", function() {
        return gulp.src(config.build.outputPath + config.build.assetsSubDirectory)
            .pipe(clean());
    })

    gulp.task('webpack', function() {
        shell.cd('..')
        // 再打包
        webpack(webpackConfig, (err, stats) => {
            spinner.stop()
            if(err) throw err

            if(stats.hasErrors()) {
                console.log(chalk.red('build failed with errors \n'))
                console.log(stats)
                process.exit(1)
            }

            // 压缩 css 文件
            gulp.task('css', function () {
                // 1. 找到文件
                gulp.src('src/css/**/*.css')
                // 2. 压缩文件
                    .pipe(minifyCSS())
                // 3. CSS路径版本号控制
                .pipe(cssVersioner({version: +(new Date())}))
                // 4. 另存为压缩文件
                    .pipe(gulp.dest(config.build.outputPath + 'jingpai/assets/css'))
            })

            // 压缩 assets文件夹下css 文件
            gulp.task('assetsCss', function () {
                // 1. 找到文件
                gulp.src('src/assets/**/*.css')
                // 2. 压缩文件
                    .pipe(minifyCSS())
                // 3. CSS路径版本号控制
                .pipe(cssVersioner({version: Math.random()}))
                // 4. 另存为压缩文件
                    .pipe(gulp.dest(config.build.outputPath + 'jingpai/assets'))
            })

            // 压缩images下的所有图片
            gulp.task('image', function(){
                return gulp.src('src/images/*.*')
                    // .pipe(imagemin({
                    //     progressive: true,
                    //     svgoPlugins: [{
                    //         removeViewBox: false
                    //     }],
                    //     use: [pngquant({
                    //         quality: '100'
                    //     })]
                    // }))
                    .pipe(gulp.dest(config.build.outputPath + 'jingpai/assets/images'))
            })
            // 压缩img下的所有图片
            gulp.task('img',function(){
                return gulp.src('src/img/*.*')
                    // .pipe(imagemin({
                    //     progressive: true,
                    //     svgoPlugins: [{
                    //         removeViewBox: false
                    //     }],
                    //     use: [pngquant({
                    //         quality: '100'
                    //     })]
                    // }))
                    .pipe(gulp.dest(config.build.outputPath + 'jingpai/assets/img'))
            })

            // 压缩assets文件夹下的所有图片
            gulp.task('assetsImg', function(){
                return gulp.src('src/assets/**/*.{png,jpg,gif,ico}')
                    // .pipe(imagemin({
                    //     progressive: true,
                    //     svgoPlugins: [{
                    //         removeViewBox: false
                    //     }],
                    //     use: [pngquant({
                    //         quality: '100'
                    //     })]
                    // }))
                    .pipe(gulp.dest(config.build.outputPath + 'jingpai/assets'))
            })

            // 提交到git上
            const gitPush = (branch = 'master') => {
                shell.exec('git add -A')
                shell.exec(`git commit -m \"${commitMessage}\" `)
                shell.exec('git push --set-upstream origin ' + branch)
                // git.add(['-A'])
                //     .commit(commitMessage)
                //     .push('origin', branch)
            }

            // 使用 gulp.task('default') 定义默认任务
            // 在命令行使用 gulp 启动  'css', 'image', 'img', 'assetsCss', 'assetsImg'
            gulp.task('default', ['css', 'image', 'img', 'assetsCss', 'assetsImg'], function() {
                // 提交cdn
                shell.cd('cdn')
                gitPush(branchName)

            
                // 提交代码
                shell.cd('..')
                gitPush(branchName)
            })

            // 启压缩css任务
            gulp.start('default')
        })
    })

    gulp.start('webpack', ['clean'])
})


