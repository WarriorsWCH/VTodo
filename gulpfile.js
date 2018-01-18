
var gulp = require('gulp');
//var	less = require('gulp-less');
//var	cssmin = require('gulp-cssmin');
//var	imagemin = require('gulp-imagemin');
//var	clean = require('gulp-clean');
//var	uglify = require('gulp-uglify');
//var	rename = require('gulp-rename');
//var	concat = require('gulp-concat');
//var connect = require('gulp-connect');
var plu =require('gulp-load-plugins');
var $ = plu();
var open = require('open');


//拷贝json文件
gulp.task('json',function(){
	gulp.src('src/data/**/*.json')
	.pipe(gulp.dest('build/data'))
	.pipe(gulp.dest('dist/data'))
	.pipe($.connect.reload());
});

//把less转成css、把css压缩
gulp.task('less',function(){
	gulp.src('src/style/index.less')
	.pipe($.less())//编译less成css
	.pipe($.autoprefixer())
	.pipe(gulp.dest('build/style'))
	.pipe($.cssmin())//压缩css
	.pipe(gulp.dest('dist/style'))
	.pipe($.connect.reload());
});

//图片的拷贝压缩
gulp.task('image',function(){
	gulp.src('src/image/**/*.{png,jpg,gif}')
	.pipe(gulp.dest('build/image'))
	.pipe($.imagemin())//压缩图片
	.pipe(gulp.dest('dist/image'))
	.pipe($.connect.reload());
});
//js的合并，然后压缩
gulp.task('js',function(){
	gulp.src('src/script/**/*')
	.pipe($.concat('index.js'))//整合js
	.pipe(gulp.dest('build/js'))
	.pipe($.uglify())//压缩js
	.pipe(gulp.dest('dist/js'))
	.pipe($.connect.reload());
});
//拷贝html文件
gulp.task('html',function(){
	gulp.src('src/**/*.html')
	.pipe(gulp.dest('build'))
	.pipe(gulp.dest('dist'))
	.pipe($.connect.reload());
});
//清除指定文件夹
gulp.task('clean',function(){
	gulp.src(['build','dist'])
	.pipe($.clean());//清除
});

//定义default任务  第二个参数是一个数组：当前任务的依赖
//每次执行default任务，会先执行依赖的任务
gulp.task('default',['less','json','js','image','html'],function(){
	//连接服务，刷新浏览器，root-浏览器打开的页面所在的目录
	$.connect.server({
		root : ['build'],
		livereload : true
	});
	//打开某个网址url
	open("http://localhost:8080/");
	
	//监听  第二个参数：文件发生改动执行相应的任务
	gulp.watch('src/script/**/*.js',['js']);
	gulp.watch('src/image/**/*',['image']);
	gulp.watch('src/data/**/*.json',['json']);
	gulp.watch('src/style/**/*.less',['less']);
	gulp.watch('src/**/*.html',['html']);
});




