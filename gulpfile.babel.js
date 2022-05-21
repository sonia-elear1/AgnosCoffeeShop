/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Creates and executes gulp tasks
 * @author Sonia Dua, sonia.dua@healthasyst.com
 * @copyright Copyright (c) 2022 Elear Solutions Tech Private Limited. All rights
 * reserved.
 * @license To any person (the "Recipient") obtaining a copy of this software and
 * associated documentation files (the "Software"):
 *
 * All information contained in or disclosed by this software is confidential
 * and proprietary information of Elear Solutions Tech Private Limited and all
 * rights therein are expressly reserved. By accepting this material the
 * recipient agrees that this material and the information contained therein is
 * held in confidence and in trust and will NOT be used, copied, modified,
 * merged, published, distributed, sublicensed, reproduced in whole or in part,
 * nor its contents revealed in any manner to others without the express
 * written permission of Elear Solutions Tech Private Limited.
 */
/*********************************************************************************/
/*===============================================================================*/

import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import nodemon from 'gulp-nodemon';

// Gulp task to clean the dist folder
gulp.task('clean', () => {
  return gulp.src('dist', { allowEmpty: true, read: false })
    .pipe(clean());
});

// Gulp task for transpiling all ES6 code to ES5 and copy to dist folder.
gulp.task('transpiler', () => {
  return gulp.src(['server/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

//copy ejs files into dist
gulp.task('copyejs', () => {
  return gulp
  .src('server/**/*.ejs')
  .pipe(gulp.dest('dist'));
});

// Gulp task for clearing the dist folder and building the new code
gulp.task('build:src', gulp.series('clean', gulp.parallel('transpiler', 'copyejs')));

// Gulp task to check lint errors and build the code into dist folder
gulp.task('build', gulp.series('build:src'));

// Gulp task for starting the server using nodemon
gulp.task('start:server', (done) => {
  const stream = nodemon({
    script: 'dist/server.js'
    , ext: 'html js'
    , ignore: ['ignored.js']
    , watch: jsFiles
    , tasks: ['build']
  });

  stream.on('restart', () => {
    console.log('restarted!');
    done();
  }).on('crash', () => {
    console.error('Application has crashed!\n');
    stream.emit('restart', 10);  // restart the server in 10 seconds
    done();
  });
});

// Default gulp task to build and run the server
gulp.task('default', gulp.series('build', 'start:server'));

