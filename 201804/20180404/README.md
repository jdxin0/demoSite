# Study List
* [postcss-cli - npm](https://www.npmjs.com/package/postcss-cli)
* [autoprefixer - npm](https://www.npmjs.com/package/autoprefixer)
# cli
* npx postcss --version
```
$ npx postcss --version
npx: 1 安装成功，用时 1.436 秒
Path must be a string. Received undefined
C:\wamp64\www\www.yanhu.com\201804\20180404\node_modules\postcss-cli\bin\postcss

                                      /|\
                                    //   //
                                  //       //
                                //___*___*___//
                              //--*---------*--//
                            /|| *             * ||/
                          // ||*    v5.0.0     *|| //
                        //   || *             * ||   //
                      //_____||___*_________*___||_____//
```
* npx postcss --help
```
$ npx postcss --help
npx: 1 安装成功，用时 1.502 秒
Path must be a string. Received undefined
C:\wamp64\www\www.yanhu.com\201804\20180404\node_modules\postcss-cli\bin\postcss

                                      /|\
                                    //   //
                                  //       //
                                //___*___*___//
                              //--*---------*--//
                            /|| *             * ||/
                          // ||*               *|| //
                        //   || *             * ||   //
                      //_____||___*_________*___||_____//

Usage:
  postcss [input.css] [OPTIONS] [-o|--output output.css] [--watch|-w]
  postcss <input.css>... [OPTIONS] --dir <output-directory> [--watch|-w]
  postcss <input-directory> [OPTIONS] --dir <output-directory> [--watch|-w]
  postcss <input.css>... [OPTIONS] --replace

Basic options:
  -o, --output   Output file                                            [字符串]
  -d, --dir      Output directory                                       [字符串]
  -r, --replace  Replace (overwrite) the input file                       [布尔]
  --map, -m      Create an external sourcemap
  --no-map       Disable the default inline sourcemaps
  --verbose      Be verbose                                               [布尔]
  --watch, -w    Watch files for changes and recompile as needed          [布尔]
  --env          A shortcut for setting NODE_ENV                        [字符串]

Options for when not using a config file:
  -u, --use      List of postcss plugins to use                           [数组]
  --parser       Custom postcss parser                                  [字符串]
  --stringifier  Custom postcss stringifier                             [字符串]
  --syntax       Custom postcss syntax                                  [字符串]

Advanced options:
  --ext     Override the output file extension; for use with --dir      [字符串]
  --base    Mirror the directory structure relative to this path in the output
            directory, for use with --dir                               [字符串]
  --poll    Use polling for file watching. Can optionally pass polling interval;
            default 100 ms
  --config  Set a custom path to look for a config file                 [字符串]

选项：
  --version   显示版本号                                                  [布尔]
  -h, --help  显示帮助信息                                                [布尔]

示例：
  postcss input.css -o output.css           Basic usage
  cat input.css | postcss -u autoprefixer   Piping input & output
  > output.css

If no input files are passed, it reads from stdin. If neither -o, --dir, or
--replace is passed, it writes to stdout.

If there are multiple input files, the --dir or --replace option must be passed.

Input files may contain globs. If you pass an input directory, it will process
all files in the directory and any subdirectories.

For more details, please see https://github.com/postcss/postcss-cli
```
* npx browserslist
```
$ npx browserslist
npx: 1 安装成功，用时 1.463 秒
Path must be a string. Received undefined
C:\wamp64\www\www.yanhu.com\201804\20180404\node_modules\browserslist\cli.js
and_chr 64
and_ff 57
and_qq 1.2
and_uc 11.8
android 62
android 4.4.3-4.4.4
android 4.4
android 4.2-4.3
baidu 7.12
bb 10
bb 7
chrome 65
chrome 64
chrome 63
chrome 62
edge 16
edge 15
edge 14
edge 13
firefox 59
firefox 58
firefox 57
firefox 56
ie 11
ie 10
ie 9
ie 8
ie_mob 11
ie_mob 10
ios_saf 11.0-11.2
ios_saf 10.3
ios_saf 10.0-10.2
ios_saf 9.3
op_mini all
op_mob 37
op_mob 12.1
op_mob 12
op_mob 11.5
opera 50
opera 49
opera 48
opera 47
safari 11
safari 10.1
safari 10
safari 9.1
samsung 6.2
samsung 5
samsung 4
```
# 笔记
* npx postcss style.css -o css/style.min.css
* npx postcss style.css --out css/style.min.css
* Browserslist config can be defined in `.browserslistrc` file or in `browserslist` section of `package.json`.
* The best way to provide browsers is `.browserslistrc` config or `package.json` with **`browserslist key`**. Put it in your project root.
* [In this example](https://github.com/browserslist/browserslist-example), we defined target browsers in `package.json` to reduce config files in project dir:
```
{
  "private": true,
+ "browserslist": [
+   "Edge 16"
+ ],
  "scripts": {
  }
}
```
* Run `npx browserslist` in project directory to see what browsers was selected by your queries.
* Browserslist config should be named `.browserslistrc` or `browserslist` and have browsers queries split by a new line. Comments starts with # symbol:
```
# Browsers that we support

> 1%
Last 2 versions
IE 8 # sorry
```
*  When `postcss-loader` is used standalone (without `css-loader`) don't use `@import` in your CSS, since this can lead to quite bloated bundles