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
    testUtilsFactory = require("../lib/test-utils");

describe('plugin', () => {

    var build = "v0002",
        grunt = null,
        lastGruntFile = null,
        testUtils = null;

    beforeEach( done => {
        // Call before each test
        delete require.cache[require.resolve('grunt')];
        grunt = require('grunt');
        testUtils = testUtilsFactory.create({
            grunt: grunt,
            build: build,
            outPrefix: "v2-"
        });
        done();
    });

    afterEach( done => {
        testUtils.trashFile( done, lastGruntFile );
    });

    it('run task', done => {  
        // grunt.registerTask('zorro', ['upcoming', 'upcoming:patch', 'upcoming:major']);
        lastGruntFile = "v2-test-file.js";
        fs.copySync('./test/' + build + '/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/v2-FOO-info.json").toString().should.eql(testUtils.defaultExpected);
            fs.readFileSync("test/tmp/v2-BAR-info.json").toString().should.eql(testUtils.defaultExpected);
            done();
        });
    })

    it('run task patch config defined', done => {  
        lastGruntFile = "v2-test-file.js";
        fs.copySync('./test/' + build + '/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:patch'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            fs.readFileSync("test/tmp/v2-patch-info.json").toString().should.eql(testUtils.getExpected( { release: "patch" } ));
            done();
        });
    })

    it('run task patch default config', done => {  
        lastGruntFile = "v2-default-only.js"
        testUtils.testDefaultConfig( done, "patch", lastGruntFile );
    })

    it('run task prepatch default config', done => {  
        lastGruntFile = "v2-default-only.js"
        testUtils.testDefaultConfig( done, "prepatch", lastGruntFile );
    })

    it('run task minor default config', done => {  
        lastGruntFile = "v2-default-only.js"
        testUtils.testDefaultConfig( done, "minor", lastGruntFile );
    })

    it('run task preminor default config', done => {  
        lastGruntFile = "v2-default-only.js"
        testUtils.testDefaultConfig( done, "preminor", lastGruntFile );
    })

    it('run task major default config', done => { 
        lastGruntFile = "v2-default-only.js"
        testUtils.testDefaultConfig( done, "major", lastGruntFile ); 
    })

    it('run task premajor default config', done => {  
        lastGruntFile = "v2-default-only.js"
        testUtils.testDefaultConfig( done, "premajor", lastGruntFile );
    })

    it('run task prerelease default config', done => { 
        lastGruntFile = "v2-default-only.js"
        testUtils.testDefaultConfig( done, "prerelease", lastGruntFile );
    })

    it('run task config and default not found should fail gracfully', done => {  
        lastGruntFile = "v2-no-default.js";
        fs.copySync('./test/' + build + '/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:foo'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

    it('run task default with bad release should fail gracfully', done => {  
        lastGruntFile = "v2-default-only.js";
        fs.copySync('./test/' + build + '/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:foo'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

    it('run task with no config should fail gracefully', done => { 
        lastGruntFile = "v2-no-config.js";
        fs.copySync('./test/' + build + '/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:patch'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

    it('run task with no package version should fail gracefully', done => { 
        lastGruntFile = "v2-no-pkg-version.js";
        fs.copySync('./test/' + build + '/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:patch'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

    it('run task with no package name should fail gracefully', done => { 
        lastGruntFile = "v2-no-pkg-name.js";
        fs.copySync('./test/' + build + '/source/' + lastGruntFile, lastGruntFile );
        grunt.tasks(['clean','upcoming:patch'], { gruntfile: "./" + lastGruntFile, color: false }, function() {
            done();
        });
    })

});