# VTodo
A todo list using Vue


## 框架使用的[Vue](https://cn.vuejs.org/v2/guide/)
---------------------------------------
## 构建工具使用的[gulp](https://www.gulpjs.com.cn/)

### gulp-load-plugins
一般情况下，gulpfile.js中的模块需要一个个加载。
`
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', function () {
   return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('build'));
});
`
上面代码中，除了gulp模块以外，还加载另外三个模块。

这种一一加载的写法，比较麻烦。使用gulp-load-plugins模块，可以加载所有的gulp模块。
`var gulp = require('gulp'),
    plu = require('gulp-load-plugins'),
    $ = plu();

gulp.task('js', function () {
   return gulp.src('js/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter('default'))
      .pipe($.uglify())
      .pipe($.concat('app.js'))
      .pipe(gulp.dest('build'));
});
`
---------------------------------------

### gulp-babel
1. 全局安装Babel。
npm install -g babel-cli  

2. 局部安装
npm install babel-cli --save-dev  

3. Babel的配置文件是.babelrc ，windows下新建该文件会提示必须键入文件名，解决办法是文件名如下.babelrc.

4. ES2015转码规则
  npm install --save-dev babel-preset-es2015

5. 将规则加入到.babelrc文件中    
`
{  
    "presets": [  
        "es2015" 
    ],  
    "plugins": []  
}  
`

6. 安装gulp-babel
npm install --save-dev gulp-babel
  
7. 配置gulpfile.js文件
`
var gulp = require("gulp");  
var babel = require("gulp-babel");  

gulp.task('js',function(){
	gulp.src('src/script/**/*')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe($.uglify())//压缩js
	.pipe(gulp.dest('dist/js'))
	.pipe($.connect.reload());
});
`
