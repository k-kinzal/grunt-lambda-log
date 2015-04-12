'use strict';
// require
var LambdaLogsStream = require('lambda-logs')
var log = new LambdaLogsStream();

module.exports = function (grunt) {
  // register tasks
  grunt.registerMultiTask('lambda_log', 'Display AWS Lambda log.', function () {
    // initialize
    var done      = this.async();
    var options   = this.options();

    var stream = log.describe(options.functionName, options.startTime);
    stream.onValue(function(log) {
      // display log
      grunt.log.ok(log.text);
      // end text
      if (options.endText && options.endText.test(log.message)) {
        stream.stop();
        done();
      }

    });
    stream.onError(function(err) {
      grunt.log.error(err);
      stream.stop();
      done(false);
    });
  });

};