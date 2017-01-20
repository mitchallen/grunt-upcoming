/**
    Plugin: grunt-upcoming
      Test: test-utils
    Author: Mitch Allen
*/

"use strict";

var semver = require('semver'),
    fs = require('fs-extra');

module.exports.create = function(spec) { 

    spec = spec || {};

    var pkgName = require("../../package.json").name,
        pkgVersion = require("../../package.json").version;

    return {

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

        testDefaultConfig: function( done, grunt, release, gruntFile ) {
            fs.copySync('./test/source/' + gruntFile, gruntFile );
            var _self = this;
            grunt.tasks(['clean','upcoming:' + release ], { gruntfile: "./" + gruntFile, color: false }, function() {
                fs.readFileSync("test/tmp/FOO-" + release + "-info.json").toString().should.eql(_self.getExpected( { release: release } ));
                fs.readFileSync("test/tmp/BAR-" + release + "-info.json").toString().should.eql(_self.getExpected( { release: release } ))
                done();
            });
        }

    };
};