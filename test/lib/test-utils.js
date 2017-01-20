/**
    Plugin: grunt-upcoming
      Test: test-utils
    Author: Mitch Allen
*/

"use strict";

var semver = require('semver'),
    fs = require('fs-extra'),
     mv = require('mv');

module.exports.create = function(spec) { 

    spec = spec || {};

    var build = spec.build,
        grunt = spec.grunt;

    var pkgName = require("../../package.json").name,
        pkgVersion = require("../../package.json").version;

    return {

        trashFile: function(done, file) {
            if( file ) {
                mv( "./" + file, 'test/' + build + '/trash/trash.js', {clobber: true }, function(err) { 
                    if( err ) { 
                        var eMsg = "MV ERROR:" + err;
                        console.error(eMsg);
                        throw new Error(eMsg);
                    }
                    done();
                });
            } else {
                done();
            }
        },

        defaultExpected: JSON.stringify({
            "name": pkgName,
            "version": pkgVersion,
        }),

        getExpected: function(options) {
            options = options || {};
            var release = options.release || "";

            return JSON.stringify({
                "name": pkgName,
                "version": pkgVersion,
                "upcoming": {
                "release": release,
                "version": semver.inc(pkgVersion, release)
            }});
        },

        testDefaultConfig: function( done, release, gruntFile ) {
            fs.copySync('./test/' + build + '/source/' + gruntFile, gruntFile );
            var _self = this;
            grunt.tasks(['clean','upcoming:' + release ], { gruntfile: "./" + gruntFile, color: false }, function() {
                fs.readFileSync("test/tmp/FOO-" + release + "-info.json").toString().should.eql(_self.getExpected( { release: release } ));
                fs.readFileSync("test/tmp/BAR-" + release + "-info.json").toString().should.eql(_self.getExpected( { release: release } ))
                done();
            });
        }

    };
};