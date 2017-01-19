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
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({

    // used by the changelog task
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/tmp']
    },

    // Configuration to be run (and then tested).
    upcoming: {
      default: {
        files: {
          'package.json': [
            'test/tmp/version%s-info.json', 
            'test/tmp/product%s-info.json']
        }
      },
      patch: {
        files: {
          'package.json': ['test/tmp/patch-info.json']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    shell: {
        publish: {
            command: 'npm publish'
        },
        pubinit: {
            // command: 'npm publish --access public'
            command: [
                'npm publish --access public',
                'git tag v0.1.0',
                'git push origin --tags',
              ].join('&&')
        },
    },

    // To test: grunt bump --dry-run

    bump: {
        options: {

            commit: true,
            createTag: true,
            push: true,
            pushTo: 'origin',

            updateConfigs: ['pkg'],
            commitFiles: ['package.json']
        }
    },

    watch: {
         scripts: {
            files: ['*.js','./modules/*.js'],
            tasks: ['jshint','browserify','uglify']
         }
    },

    jsdoc2md: {
        oneOutputFile: {
          src: 'tasks/*.js',
          dest: 'DOC-API.md'
        }
    },

  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build-doc', ['jsdoc2md']);
  grunt.registerTask('build', ['clean','jshint']);
  grunt.registerTask('pubinit', ['build','shell:pubinit']);
  grunt.registerTask('publish', ['build','bump','shell:publish']);

};
