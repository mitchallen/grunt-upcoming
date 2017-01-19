/**
    Plugin: grunt-upcoming
      Test: smoke-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    semver = require('semver'),
    fs = require('fs-extra'),
    mv = require('mv');

var pkgName = require("../package.json").name,
    pkgVersion = require("../package.json").version;

var defaultExpected = JSON.stringify({
  "name": pkgName,
  "version": pkgVersion,
});

function getExpected(options) {
  options = options || {};
  var release = options.release || "";

  return JSON.stringify({
      "name": pkgName,
      "version": pkgVersion,
      "upcoming": {
      "release": release,
      "version": semver.inc(pkgVersion, release)
  }});
}

describe('plugin', () => {

    var grunt = null;

    var lastGruntFile = null;

    beforeEach( done => {
        // Call before each test
        delete require.cache[require.resolve('grunt')];
        grunt = require('grunt');
        done();
    });

    afterEach( done => {
        if( lastGruntFile ) {
            mv( "./" + lastGruntFile, 'test/trash/trash.js', {clobber: true }, function(err) { 
                if( err ) { 
                    console.error("MV ERROR:" + err);
                }
                done();
            });
        } else {
            done();
        }
    });

    it('run task', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        lastGruntFile = "test-file.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/FOO-info.json").toString().should.eql(defaultExpected);
            fs.readFileSync("test/tmp/BAR-info.json").toString().should.eql(defaultExpected);
            done();
        });
    })

    it('run task patch config defined', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        lastGruntFile = "test-file.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:patch'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/patch-info.json").toString().should.eql(getExpected( { release: "patch" } ));
            done();
        });
    })

    it('run task patch default config', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        var release = "patch";
        lastGruntFile = "default-only.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:' + release ], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/FOO-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ));
            fs.readFileSync("test/tmp/BAR-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ))
            done();
        });
    })

    it('run task prepatch default config', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        var release = "prepatch";
        lastGruntFile = "default-only.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:' + release ], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/FOO-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ));
            fs.readFileSync("test/tmp/BAR-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ))
            done();
        });
    })

    it('run task minor default config', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        var release = "minor";
        lastGruntFile = "default-only.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:' + release ], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/FOO-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ));
            fs.readFileSync("test/tmp/BAR-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ))
            done();
        });
    })

    it('run task preminor default config', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        var release = "preminor";
        lastGruntFile = "default-only.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:' + release ], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/FOO-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ));
            fs.readFileSync("test/tmp/BAR-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ))
            done();
        });
    })

    it('run task major default config', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        var release = "major";
        lastGruntFile = "default-only.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:' + release ], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/FOO-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ));
            fs.readFileSync("test/tmp/BAR-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ))
            done();
        });
    })

    it('run task premajor default config', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        var release = "premajor";
        lastGruntFile = "default-only.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:' + release ], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/FOO-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ));
            fs.readFileSync("test/tmp/BAR-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ))
            done();
        });
    })

    it('run task prerelease default config', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        var release = "prerelease";
        lastGruntFile = "default-only.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:' + release ], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/FOO-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ));
            fs.readFileSync("test/tmp/BAR-" + release + "-info.json").toString().should.eql(getExpected( { release: release } ))
            done();
        });
    })


    it('run task config and default not found should fail gracfully', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        lastGruntFile = "no-default.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:foo'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

    it('run task default with bad release should fail gracfully', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        lastGruntFile = "default-only.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:foo'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

    it('run task with no config should fail gracefully', done => { 
        lastGruntFile = "no-config.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:patch'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

    it('run task with no package version should fail gracefully', done => { 
        lastGruntFile = "no-pkg-version.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:patch'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

    it('run task with no package name should fail gracefully', done => { 
        lastGruntFile = "no-pkg-name.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:patch'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

});