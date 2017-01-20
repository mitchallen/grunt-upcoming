/*
 * grunt-upcoming
 * https://github.com/mitchallen/grunt-upcoming
 *
 * Copyright (c) 2017 Mitch Allen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Project configuration.
  grunt.initConfig({

    // used by the changelog task
    pkg: grunt.file.readJSON('package.json'),


    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/tmp']
    },

    // Configuration to be run (and then tested).
    upcoming: {
      default: {
        files: [
          { src: 'package.json', dest: [ 'test/tmp/v2-FOO%s-info.json', 'test/tmp/v2-BAR%s-info.json' ] },
          { src: 'package.json', dest: [ 'test/tmp/v2%s-info.json'] }
        ]
      },
      patch: {
        files: [ 
          { src: 'package.json', dest: ['test/tmp/v2-patch-info.json'] },
          { src: 'package.json', dest: ['test/tmp/v2-patch-again-info.json'] }
        ]
      }
    },

  });

  grunt.registerTask('default', ['upcoming']);

};
