# 阻塞测试代码
验证js文件是同步加载的

index.html引用了一组js
```
1.js
2.js
3.js
4.js
.
.
```
通过fiddler抓包在2.js这里设置断点，看3.js和4.js能不能正常加载

> 可以正常加载
> 不可以正常加载（说明js文件是同步加载的，如何通过requir.js改为异步加载）

# 解决方案
require.js