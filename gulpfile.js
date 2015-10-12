/*
https://markgoodyear.com/2014/01/getting-started-with-gulp/
Falta poner la generación de estilos desde less (el articulo usa sass)

mirar gulp-wrapper o gulp-wrap parece que el último da información del fichero.
mirar gulp-change o gulp-modify (hacen lo mismo) - permite facilmente modificar el texto de un fichero con una función auxiliar. 
(se pasa como String, para poner un encabezado o pie parece sencillo, habría que ver lo óptimo que es). 

gulp-filelog gulp-filesize - Para recoger los parámetros de los ficheros leídos.

Para los mas avanzados. 
https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md
Como escribir un plugin.

Por cierto: gulp-less
https://github.com/plus3network/gulp-less
Hay una opción para minificarlo.

*/

var gulp= require('gulp'),
	jshint= require('gulp-jshint'),
	concat= require('gulp-concat'),
	rename= require('gulp-rename'),
	notify= require('gulp-notify'),
	uglify= require('gulp-uglify'),
	clean= require('gulp-clean'),
	imagemin= require('gulp-imagemin'),
	handlebars= require('gulp-handlebars'),
	wrap= require('gulp-wrap'),
	declare= require('gulp-declare'),
	less= require('gulp-less')
;

gulp.task('default', ['clean'], function(){
	gulp.start('scripts', 'images', 'styles');
});

// SCRIPTS

gulp.task('script-lib', function(){
	return gulp.src( 'src/**/*.js' )
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(concat('script-lib.js'))
		.pipe(gulp.dest('build/tmp'))
		;
});

gulp.task('templates', function(){
	gulp.src('hbs/**/*.hbs') // En la definición del paquete venía sin el **
		.pipe(handlebars())
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
		  namespace: 'app.templates',
		  noRedeclare: true, // Avoid duplicate declarations 
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('build/tmp'));
});

gulp.task('scripts', ['script-lib', 'templates'], function(){
	return gulp.src( ['build/tmp/script-lib.js', 'build/tmp/templates.js'] )
		.pipe(concat('spac.js'))
		.pipe(gulp.dest('build'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('build'))
		.pipe(notify({ message: 'scripts task complete'}))
		;
}); 

// STYLES

gulp.task('styles', function(){
	return gulp.src('./style/**/*.less')
		.pipe(concat('spac.less'))
		.pipe(less()) //Default options: {paths: [ path.join(__dirname, 'less', 'includes') ]}
		.pipe(gulp.dest('./build'));
});

// IMAGES
	
gulp.task('images', function() {
	return gulp.src('images/**/*')
		.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
		.pipe(gulp.dest('build/images'))
		.pipe(notify({ message: 'Images task complete' }));
});

// UTILS

gulp.task('clean', function () {
  return gulp.src('build/*', {read: false})
    .pipe(clean());
});


gulp.task('clean-server', function () {
  return gulp.src( [ '/var/www/html/spac/*', 'build/tmp' ], {read: false})
    .pipe(clean({force: true}));
});


gulp.task('send', ['clean-server'], function () {
	return gulp.src( [ 'build/**', 'html/**', 'lib/**' ] )
		.pipe(gulp.dest( '/var/www/html/spac',{mode: 0755} ))
		;
});


