# Study List
[Integration with has.js](http://requirejs.org/docs/optimization.html#hasjs)
# r.js
* node js/r.js -v
```
$ node js/r.js -v
r.js: 2.3.5, RequireJS: 2.3.5, UglifyJS: 2.8.29
```
* node js/r.js
```
$ node js/r.js
See https://github.com/requirejs/r.js for usage.
```
# 笔记
* REQUIREJS API [API](http://requirejs.org/docs/api.html)
* REQUIREJS OPTIMIZER [Optimization](http://requirejs.org/docs/optimization.html)
* There is an [example.build.js](https://github.com/requirejs/r.js/blob/master/build/example.build.js) file in the requirejs/build directory that details all of the allowed optimizer configuration options.
* `cssIn` is typically used as a command line option. It can be used along with `out` to optimize a single CSS file.
* Since "require" is a reserved dependency name, you create a "requireLib" dependency and map it to the require.js file.Once that optimization is done, you can change the script tag to reference "main-built.js" instead of "require.js", and your optimized project will only need to make one script request.
* If you only intend to optimize a module (and its dependencies), with a single file as the output, you can specify the module options inline, instead of using the 'modules' section above. 'exclude', 'excludeShallow', 'include' and 'insertRequire' are all allowed as siblings to `name`. The name of the optimized file is specified by 'out'.
* [requirejs/example-multipage](https://github.com/requirejs/example-multipage) is an example of a project that has multiple pages, but shares a common configuration and a common optimized build layer.
* If doing a whole project optimization, but only want to minify the build layers specified in `modules` options and not the rest of the JS files in the build output directory, you can set `skipDirOptimize` to true.
* Introduced in 2.1.2: If using "dir" for an output directory, normally the optimize setting is used to optimize the build bundles (the "modules" section of the config) and any other JS file in the directory. However, if the non-build bundle JS files will not be loaded after a build, you can skip the optimization of those files, to speed up builds. Set this value to true if you want to skip optimizing those other non-build bundle JS files.
* Normally each run of a whole project optimization will delete the output build directory specified by `dir` for cleanliness. Some build options, like `onBuildWrite`, will modify the output directory in a way that is hazardous to do twice over the same files. However, if you are doing simple builds with no extra file transforms besides build layer minification, then you can set `keepBuildDir` to true to keep the build directory between runs. Then, only files that have changed between build runs will be copied.
* As of RequireJS 2.0.2, the dir above will be deleted before the build starts again. If you have a big build and are not doing source transforms with onBuildRead/onBuildWrite, then you can set keepBuildDir to true to keep the previous dir. This allows for faster rebuilds, but it could lead to unexpected errors if the built code is transformed in some way.