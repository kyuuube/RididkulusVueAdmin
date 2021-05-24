# RIDIDKULUS VUE ADMIN

一个基于vue 的 后台 starter 项目

~~vue vuex view-design (本来想用element ui 但是用多了想换个新的)
本人开发中的体验 view-design 真心的是坑。后期打算 转回 element ui 或者 vuetify~~

vue vuex element ui

配套的后端项目用nestjs

live demo : https://admin.rosetta-latte.art/

## 使用



```bash

yarn
yarn run dev

```

## 进度

可以通过[trello](https://trello.com/b/O9Nf9aQG/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E7%A0%94%E5%8F%91)查看



## 主题生成

从element-ui的官网生成主题。通过一个gulp脚本添加namespace。再导入到项目中

```shell
npm install  gulp -g
npm install gulp-clean-css
npm install gulp-css-wrap
```

```javascript
// gulpfile.js
var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap')
gulp.task('css-wrap', function () {
    return gulp.src(path.resolve('./theme/index.css'))
    /* 找需要添加命名空间的css文件，支持正则表达式 */
        .pipe(cssWrap({
            selector: '.custom-02abfd' /* 添加的命名空间 */
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('src/assets/css/theme/02abfd')) /* 存放的目录 */
})
```

## Init Entity
使用TypeOrm有多种创建数据表的方式，具体参考TypeOrm，方便起见我们使用脚本创建数据表，再生成model的方式
数据准备完毕，使用 Generator这个工具生成我们代码需要的Entity，全局安装该工具

```shell
npm i -g typeorm-model-generator
```

执行生成命令:

```shell
 typeorm-model-generator -h database-host -d stock_demo -u root -x 'database password' -e mysql -o .
```


## Init Modules

```shell
nest g mo modules/user
nest g co modules/user
nest g s modules/user
nest g in libs/interceptors/data
nest g f libs/filters/http-exception
nest g pi libs/pipes/params-validation
nest g mo modules/auth
nest g s modules/auth
nest g gu modules/auth/guards/role
nest g d libs/decorators/role
```