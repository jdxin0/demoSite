## Install
```
npm install @luojianet/builder -g
```

## After Install
after install,@luojianet/builder while create a global cli `build` 

you can use `build` command in any directory


## Development mode
```
build project/source/js/index.js
```

## Production mode
```
build project/source/js/index.js --pro
```

## Watch mode
```
build project/source/js/index.js --watch
```

## Procuction Mode && Watch Mode
```
build project/source/js/index.js --pro --watch
```

## Before build directory tree
```
[root@myServer /]#tree /var/www/html/demo.xuliehaonet.com/201811/xntq/
/var/www/html/demo.xuliehaonet.com/201811/xntq/
└── source
    ├── css
    │   ├── index.css
    │   └── iziToast.min.css
    ├── img
    │   ├── 3.png
    │   ├── 7.png
    │   ├── bgl2.jpg
    │   ├── bgl.jpg
    │   ├── bgr2.jpg
    │   ├── bgr.jpg
    │   ├── cl.png
    │   ├── code.jpg
    │   ├── cr.png
    │   ├── default.png
    │   ├── pop-spr.png
    │   ├── qrcode.png
    │   ├── sale-tip.png
    │   ├── spr-info.png
    │   ├── spr.png
    │   └── title-bg.png
    ├── index.html
    └── js
        ├── data
        │   ├── getPayQRcode.json
        │   └── loginit-unpayorder.json
        ├── index.js
        └── module
            ├── buybtntips.js
            ├── buygoodsbtn.js
            ├── computed.js
            ├── events.js
            ├── goodscardinfo.js
            ├── goodsdata.js
            ├── kjgoods.js
            ├── kmgoods.js
            ├── maidian.js
            ├── methods.js
            ├── mounted.js
            ├── pageinit.js
            ├── paysuccess.js
            ├── subscribe.js
            ├── toash.js
            ├── unpayordertips.js
            ├── utility.js
            ├── vipxuser.js
            └── watch.js
```

## After build directory tree
```
[root@myServer /]#tree /var/www/html/demo.xuliehaonet.com/201811/xntq/
/var/www/html/demo.xuliehaonet.com/201811/xntq/
├── dist
│   ├── css
│   │   ├── style.css
│   │   └── style.css.map
│   ├── img
│   │   ├── bgl2.jpg
│   │   ├── bgl.jpg
│   │   ├── bgr2.jpg
│   │   ├── bgr.jpg
│   │   ├── cl.png
│   │   ├── qrcode.png
│   │   ├── spr-info.png
│   │   ├── spr.png
│   │   └── title-bg.png
│   └── js
│       ├── index.min.js
│       └── index.min.js.map
├── index.html
└── source
    ├── css
    │   ├── index.css
    │   └── iziToast.min.css
    ├── img
    │   ├── 3.png
    │   ├── 7.png
    │   ├── bgl2.jpg
    │   ├── bgl.jpg
    │   ├── bgr2.jpg
    │   ├── bgr.jpg
    │   ├── cl.png
    │   ├── code.jpg
    │   ├── cr.png
    │   ├── default.png
    │   ├── pop-spr.png
    │   ├── qrcode.png
    │   ├── sale-tip.png
    │   ├── spr-info.png
    │   ├── spr.png
    │   └── title-bg.png
    ├── index.html
    └── js
        ├── data
        │   ├── getPayQRcode.json
        │   └── loginit-unpayorder.json
        ├── demo2.js
        ├── index.js
        ├── module
        │   ├── buybtntips.js
        │   ├── buygoodsbtn.js
        │   ├── computed.js
        │   ├── events.js
        │   ├── goodscardinfo.js
        │   ├── goodsdata.js
        │   ├── kjgoods.js
        │   ├── kmgoods.js
        │   ├── maidian.js
        │   ├── methods.js
        │   ├── mounted.js
        │   ├── pageinit.js
        │   ├── paysuccess.js
        │   ├── subscribe.js
        │   ├── toash.js
        │   ├── unpayordertips.js
        │   ├── utility.js
        │   ├── vipxuser.js
        │   └── watch.js
        └── test.json
```