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
    mv = require('mv'),
    testUtils = require("./lib/test-utils").create();

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
            fs.readFileSync("test/tmp/FOO-info.json").toString().should.eql(testUtils.defaultExpected);
            fs.readFileSync("test/tmp/BAR-info.json").toString().should.eql(testUtils.defaultExpected);
            done();
        });
    })

    it('run task patch config defined', done => {  
        lastGruntFile = "test-file.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:patch'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/patch-info.json").toString().should.eql(testUtils.getExpected( { release: "patch" } ));
            done();
        });
    })

    it('run task patch default config', done => {  
        lastGruntFile = "default-only.js"
        testUtils.testDefaultConfig( done, grunt, "patch", lastGruntFile );
    })

    it('run task prepatch default config', done => {  
        lastGruntFile = "default-only.js"
        testUtils.testDefaultConfig( done, grunt, "prepatch", lastGruntFile );
    })

    it('run task minor default config', done => {  
        lastGruntFile = "default-only.js"
        testUtils.testDefaultConfig( done, grunt, "minor", lastGruntFile );
    })

    it('run task preminor default config', done => {  
        lastGruntFile = "default-only.js"
        testUtils.testDefaultConfig( done, grunt, "preminor", lastGruntFile );
    })

    it('run task major default config', done => { 
        lastGruntFile = "default-only.js"
        testUtils.testDefaultConfig( done, grunt, "major", lastGruntFile ); 
    })

    it('run task premajor default config', done => {  
        lastGruntFile = "default-only.js"
        testUtils.testDefaultConfig( done, grunt, "premajor", lastGruntFile );
    })

    it('run task prerelease default config', done => { 
        lastGruntFile = "default-only.js"
        testUtils.testDefaultConfig( done, grunt, "prerelease", lastGruntFile );
    })

    it('run task config and default not found should fail gracfully', done => {  
        lastGruntFile = "no-default.js";
        fs.copySync('./test/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:foo'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

    it('run task default with bad release should fail gracfully', done => {  
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