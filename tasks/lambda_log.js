'use strict';
// require
var Promise = require('bluebird');
var AWS     = require('aws-sdk');
var Lambda         = AWS.Lambda;
var CloudWatchLogs = AWS.CloudWatchLogs;
/*
 * grunt-lambda-log
 * https://github.com/k-kinzal/grunt-lambda-log
 *
 * Copyright (c) 2012-2015 k-kinzal
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
  // initialize
  var defaults = {
    credentials: {
      profile: null,
      region: 'us-east-1'
    }
  };
  // register tasks
  grunt.registerMultiTask('lambda_log', 'Display AWS Lambda log.', function () {
    // initialize
    var done      = this.async();
    var options   = this.options(defaults);
    var logs      = Promise.promisifyAll(new CloudWatchLogs(options.credentials));
    var logGroupName = '/aws/lambda/' + options.functionName;
    // create describe log stream promise
    var promise = logs.describeLogStreamsAsync({
      logGroupName: logGroupName
    });
    // run promise
    promise.then(function timer(data) {
      // create log events promise
      var promises = data.logStreams.sort(function(a, b) {
        return a.lastIngestionTime - b.lastIngestionTime;

      }).map(function(logStream) {
        var params = {
          logGroupName: logGroupName,
          logStreamName: logStream.logStreamName,
          startTime: data.startTime || options.startTime
        };
        return logs.getLogEventsAsync(params);

      });
      // run log events promise
      Promise.all(promises).filter(function(logEvent) {
        return logEvent.events.length > 0;

      }).reduce(function(arr, logEvent) {
        return arr.concat(logEvent.events);

      }, []).each(function(event) {
        grunt.log.ok(event.message);

      }).then(function(events) {
        if (options.tail === true) {
          if (events.length > 0 && options.firstLogOnly === true) {
            if (/^REPORT RequestId/.test(events[events.length-1].message)) {
              done(true);
              return;
            }
            var sortedEvents = events.sort(function(a, b) {
              return a.timestamp > b.timestamp;
            });
            data.startTime = events[events.length-1].timestamp + 1;
          }
          setTimeout(timer, 500, data); // wait for log
          return;
        }
        done(true);

      }).catch(function(err) {
        grunt.log.error(err.message);
        done(false);

      });
    // catch error
    }).catch(function(err) {
      grunt.log.error(err.message);
      done(false);

    });
  });

};