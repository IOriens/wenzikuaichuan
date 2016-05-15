var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var eslint = require('gulp-eslint')
var uglify = require('gulp-uglify')
var htmlMinify = require('gulp-html-minifier')
const babel = require('gulp-babel');


//Sass
var sassInput = './app/scss/**/*.scss'
var cssOuput = './app/css'
var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
}
var autoPrefixerOptions = {
	browsers: ['last 2 versions', '> 10%']
}

gulp.task('sass', function () {
	return gulp
		.src(sassInput)
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer(autoPrefixerOptions))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(cssOuput))
})

gulp.task('babel', () => {
	return gulp.src('./app/js-es6/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./app/js'));
});

gulp.task('watchSass', function () {
	return gulp
		.watch(sassInput, ['sass'])
		.on('change', function (event) {
			console.log('File： ' + event.path + ' was ' + event.type + ', running tasks...')
		})
})

gulp.task('watchES6', function () {
	return gulp
		.watch('./app/js-es6/*.js', ['babel'])
		.on('change', function (event) {
			console.log('File： ' + event.path + ' was ' + event.type + ', running tasks...')
		})
})
//BrowserSync
gulp.task('serve', function () {
	browserSync({
		server: {
			baseDir: 'app'
		}
	})
	gulp.watch(['*.html', 'css/*.css', 'js/*.js'], { cwd: 'app' }, reload)
})

//ESLint 检测JS的语法错误
gulp.task('lint', function name() {
	return gulp.src(['./app/js/*.js', './app/*.html'])
		.pipe(eslint())
		.pipe(eslint.format())
})

//Default Task
gulp.task('default', ['sass', 'babel', 'watchES6','watchSass', 'serve'/*, possible other tasks... */])

//Production 最后使用将可发布的文件放到dist文件夹中
gulp.task('prod', [], function () {
	gulp.src(sassInput)
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefixer(autoPrefixerOptions))
		.pipe(gulp.dest(cssOuput))
	gulp.src(['./app/css/*.css','./app/css/*.map'])
		.pipe(gulp.dest('./dist/css'))
	gulp.src('./app/*.html')
		.pipe(htmlMinify({ //https://github.com/kangax/html-minifier
		  minifyCSS: true,
          minifyJS: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
		}))
		.pipe(gulp.dest('./dist'))
	gulp.src('./app/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
	gulp.src('./app/img/**/*')
		.pipe(gulp.dest('./dist/img'))
})