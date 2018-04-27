# Ada (阿打)

基于 Webpack 和 Postcss 的前端打包工具

[![Travis branch](https://img.shields.io/travis/ccbikai/ada/master.svg)](https://travis-ci.org/ccbikai/ada)
[![npm](https://img.shields.io/npm/v/ada.svg)](https://www.npmjs.com/package/ada)
[![npm](https://img.shields.io/npm/dt/ada.svg)](https://www.npmjs.com/package/ada)
[![GitHub stars](https://img.shields.io/github/stars/ccbikai/ada.svg?style=social&label=Stars)](https://github.com/ccbikai/ada)

## 起因

工作中经常遇到一些零散活动需求，分散在不同项目，部分项目是后端维护的。每个项目写打包配置文件，维护太麻烦，就将所有配置写在了一个命令行工具，脱离业务代码。

## 功能

1. JavaScript 支持 ES6+ 的语法，构建代码支持 Uglify；
1. CSS 支持 SCSS 语法，使用 Postcss 做代码优化，支持 Cssnano, Autoprefixer;
1. 支持 React, Vue 打包;
1. 支持实时刷新, React 和 Vue 可以热刷新;
1. 支持自动生成雪碧图;
1. 支持自动转换 px 到 rem;
1. 支持 SourceMap，方便调试;
1. 可以自定义 Webpack, Postcss 配置。

## 安装

```bash
npm i -g ada
```

## 使用帮助

1. 运行 `ada`，启动开发服务器，默认端口 8080；
1. 运行 `ada build`，构建生产环境包，默认目录 dist；
1. src/icons 目录里边的 png 图片会自动生成雪碧图，scss 代码中可以只需引入自动生成的 sprites/sprites.scss 文件，然后使用 `@include sprite($logo);` 既可以使用雪碧图，`docs/src/scss/test.scss` 可做参考；
1. 运行 `ada -h`，查看各参数功能。

```bash
ada.js [cmd] [args]

命令：
  ada.js build  生成线上包
  ada.js        打开开发服务器                                          [默认值]

选项：
  --debug                 调试模式                        [布尔] [默认值: false]
  --host                  服务器监听IP            [字符串] [默认值: "127.0.0.1"]
  --port                  服务器监听端口                   [数字] [默认值: 8080]
  --cwd                   工作目录
                               [字符串] [默认值: "/Users/ccbikai/code/node/ada"]
  --src, --srcDir         源代码目录                    [字符串] [默认值: "src"]
  --dist, --distDir       编译后代码目录               [字符串] [默认值: "dist"]
  --public, --publicPath  静态资源CDN目录                  [字符串] [默认值: ""]
  --hotVue                Vue 使用热刷新模式              [布尔] [默认值: false]
  --hotReact              React 使用热刷新模式            [布尔] [默认值: false]
  --noRem                 不自动转换 rem                  [布尔] [默认值: false]
  --noPx                  自动转换 rem, 并且替换掉 px     [布尔] [默认值: false]
  --analyze               开启性能分析模式                [布尔] [默认值: false]
  --config, -c            自定义 webpack 配置              [字符串] [默认值: ""]
  --postcss, -p           自定义 postcss 配置              [字符串] [默认值: ""]
  -h, --help              显示帮助信息                                    [布尔]
  -v, --version           显示版本号                                      [布尔]
```

## 示例代码

查看源代码 docs 目录，里边内容使用 ada 构建。

## 文件目录

> src 目录为源代码目录，可以自定义。

```bash
.
├── index.html
├── test.html
├── test.react.html
├── test.vue.html
├── src
│   ├── components
│   │   ├── About.jsx
│   │   ├── About.vue
│   │   ├── Header.jsx
│   │   ├── Header.vue
│   │   ├── Home.jsx
│   │   ├── Home.vue
│   │   ├── Loading.jsx
│   │   ├── Static.jsx
│   │   └── Static.vue
│   ├── hbs
│   │   ├── helpers
│   │   │   └── sex.js
│   │   ├── main.hbs
│   │   └── partials
│   │       └── footer.hbs
│   ├── icons
│   │   ├── facebook.png
│   │   ├── html5.png
│   │   ├── instagram.png
│   │   ├── twitter.png
│   │   └── youtube.png
│   ├── images
│   │   ├── big.jpg
│   │   └── logo.png
│   ├── js
│   │   ├── App.jsx
│   │   ├── App.vue
│   │   ├── actions
│   │   │   └── index.js
│   │   ├── common
│   │   │   ├── index.js
│   │   │   └── lazy.js
│   │   ├── index.js
│   │   ├── mutations
│   │   │   └── index.js
│   │   ├── reducers
│   │   │   ├── index.js
│   │   │   └── name.js
│   │   ├── routes
│   │   │   └── index.js
│   │   ├── test.js
│   │   ├── test.react.js
│   │   ├── test.vue.js
│   │   └── types
│   │       └── index.js
│   ├── scss
│   │   ├── common
│   │   │   └── layout.scss
│   │   ├── index.scss
│   │   ├── test
│   │   │   ├── react.scss
│   │   │   └── vue.scss
│   │   └── test.scss
│   └── sprites
│       ├── sprites.png
│       └── sprites.scss
└── dist
    ├── assets
    │   ├── big.875f6f.jpg
    │   └── sprites.a78a7f.png
    ├── css
    │   ├── index.css
    │   ├── test.css
    │   ├── test.react.css
    │   └── test.vue.css
    ├── js
    │   ├── 0.bundle.js
    │   ├── index.js
    │   ├── react-import.bundle.js
    │   ├── test.js
    │   ├── test.react.js
    │   ├── test.vue.js
    │   ├── vue-about.bundle.js
    │   └── vue-static.bundle.js
    └── maps
        ├── css
        │   ├── index.css.map
        │   ├── test.css.map
        │   ├── test.react.css.map
        │   └── test.vue.css.map
        └── js
            ├── 0.bundle.js.map
            ├── index.js.map
            ├── index.scss.js.map
            ├── react-import.bundle.js.map
            ├── test.js.map
            ├── test.react.js.map
            ├── test.scss.js.map
            ├── test.vue.js.map
            ├── vue-about.bundle.js.map
            └── vue-static.bundle.js.map
```

