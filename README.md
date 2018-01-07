# Ada (阿打)

基于 Webpack 和 Postcss 的前端打包工具

[![Travis branch](https://img.shields.io/travis/ccbikai/ada/master.svg)](https://travis-ci.org/ccbikai/ada)
[![npm](https://img.shields.io/npm/v/ada.svg)](https://www.npmjs.com/package/ada)
[![npm](https://img.shields.io/npm/dt/ada.svg)](https://www.npmjs.com/package/ada)
[![GitHub stars](https://img.shields.io/github/stars/ccbikai/ada.svg?style=social&label=Stars)](https://github.com/ccbikai/ada)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fccbikai%2Fada.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fccbikai%2Fada?ref=badge_shield)

## 起因

工作中经常遇到一些零散活动需求，分散在不同项目，部分项目是后端维护的。每个项目写打包配置文件，维护太麻烦，就将所有配置写在了一个命令行工具，脱离业务代码。

## 功能

1. JavaScript 支持 ES6+ 的语法，构建代码支持 Uglify；
1. CSS 支持 SCSS 语法，使用 Postcss 做代码优化，支持 Cssnano, Autoprefixer;
1. 支持实时刷新;
1. 支持自动生成雪碧图;
1. 支持自动转换 px 到 rem;
1. 支持 SourceMap，方便调试。

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
ada [cmd] [args]

命令：
  ada build  生成线上包
  ada        打开开发服务器                                             [默认值]

选项：
  --debug            调试模式                             [布尔] [默认值: false]
  --host             服务器监听IP                 [字符串] [默认值: "127.0.0.1"]
  --port             服务器监听端口                        [数字] [默认值: 8080]
  --cwd              工作目录  [字符串] [默认值: "/Users/ccbikai/code/node/ada"]
  --src, --srcDir    源代码目录                         [字符串] [默认值: "src"]
  --dist, --distDir  编译后代码目录                    [字符串] [默认值: "dist"]
  --noRem            不自动转换 rem                       [布尔] [默认值: false]
  --noPx             自动转换 rem, 并且替换掉 px          [布尔] [默认值: false]
  -h, --help         显示帮助信息                                         [布尔]
  -v, --version      显示版本号                                           [布尔]
```

## 示例代码

查看源代码 docs 目录，里边内容使用 ada 构建。

## 文件目录

> src 目录为源代码目录，可以自定义。

```bash
.
├── dist
│   ├── css
│   │   ├── index.css
│   │   └── test.css
│   ├── images
│   │   ├── big.db1966.png
│   │   └── logo.a771e8.png
│   ├── js
│   │   ├── index.js
│   │   ├── index.scss.js
│   │   ├── test.js
│   │   └── test.scss.js
│   └── maps
│       ├── css
│       │   ├── index.css.map
│       │   └── test.css.map
│       └── js
│           ├── index.js.map
│           ├── index.scss.js.map
│           ├── test.js.map
│           └── test.scss.js.map
├── index.html
├── src
│   ├── icons
│   │   ├── logo.png
│   │   └── logo2.png
│   ├── images
│   │   ├── big.png
│   │   └── logo.png
│   ├── js
│   │   ├── common
│   │   │   └── index.js
│   │   ├── index.js
│   │   └── test.js
│   └── scss
│       ├── common
│       │   └── layout.scss
│       ├── index.scss
│       └── test.scss
└── test.html
```

## 存在问题

1. 多余的 .scss.js 文件未清理。

## 待办事项

* 支持 Vue 打包；
* 支持 React 打包。


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fccbikai%2Fada.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fccbikai%2Fada?ref=badge_large)