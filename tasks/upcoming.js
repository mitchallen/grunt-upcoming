/*
 * grunt-upcoming
 * https://github.com/mitchallen/grunt-upcoming
 *
 * Copyright (c) 2017 Mitch Allen
 * Licensed under the MIT license.
 */

/*jshint node: true */
/*jshint esversion: 6 */
/*jshint loopfunc: true */

'use strict';

var semver = require("semver"),
    util = require("util");

module.exports = function(grunt) {

  grunt.registerTask('upcoming', 'Generate upcoming release JSON file', function(release) {
    var taskArgs = arguments; 
    var warning = "WARNING: See README for how to configure this grunt task.";
    if(!grunt.config(this.name)) {
      grunt.log.writeln(warning);
      return;
    }
    var task = grunt.config(this.name)[release] || grunt.config(this.name)['default'];
    // console.log(grunt.config(this.name));
    if(!task) {
      grunt.log.writeln(warning);
      return;
    } 
    // Iterate over all specified files
    for (let [key, value] of Object.entries(task.files)) {
      var source = key;
      value.forEach( function(t, ix) {
        grunt.log.writeln("----------------------------------------------");
        var target = t;
        if(target.indexOf("%") > -1) {
          target = util.format( t, release ? "-" + release.trim() : "" ); 
        }
        grunt.log.writeln(source, "-->", target);
        var pkg = grunt.file.readJSON( source ),
          srcName = pkg.name,
          srcVersion = pkg.version,
          upcomingVersion = semver.inc( srcVersion, release ),
          releaseInfo = {
            name: srcName, 
            version: srcVersion
          };
        grunt.log.writeln("PACKAGE: " + srcName + ": " + srcVersion );
        // arguments here would return array data/length, not task arguments
        if (taskArgs.length === 0) {
          grunt.log.writeln( "current: " + srcVersion );
        } else {
          grunt.log.writeln( release + ": " + srcVersion + ' --> ' +  upcomingVersion );
          releaseInfo.upcoming = {
            release: release,
            version: upcomingVersion || srcVersion
          };
        }
        var content = JSON.stringify(releaseInfo);
        grunt.log.writeln( "writing: " + target + ":\n" + content );
        grunt.file.write( target, content );
      });
    }
  });
};
