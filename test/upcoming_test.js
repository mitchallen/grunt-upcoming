'use strict';

var grunt = require('grunt'),
    semver = require('semver');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

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

exports.upcoming = {

  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_1: function(test) {
    test.expect(1);
    var f = 'product-info.json';
    var actual = grunt.file.read('tmp/' + f);
    test.equal(actual, defaultExpected, 'should have generated correct file');
    test.done();
  },

  default_2: function(test) {
    test.expect(1);
    var f = 'version-info.json';
    var actual = grunt.file.read('tmp/' + f);
    test.equal(actual, defaultExpected, 'should have generated correct file');
    test.done();
  },

  patch: function(test) {
    test.expect(1);
    var f = 'patch-info.json',
        actual = grunt.file.read('tmp/' + f),
        expected = getExpected( { release: "patch" });
    test.equal(actual, expected, 'should have generated correct file');
    test.done();
  },

  major_1: function(test) {
    test.expect(1);
    var f = 'product-major-info.json',
        actual = grunt.file.read('tmp/' + f),
        expected = getExpected( { release: "major" });
    test.equal(actual, expected, 'should have generated correct file');
    test.done();
  },

  major_2: function(test) {
    test.expect(1);
    var f = 'version-major-info.json',
        actual = grunt.file.read('tmp/' + f),
        expected = getExpected( { release: "major" });
    test.equal(actual, expected, 'should have generated correct file');
    test.done();
  },
};
