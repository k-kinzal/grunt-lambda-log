'use strict';

module.exports = function (grunt) {
  // configuration
  var config = grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        force: true,
        reporter: require('jshint-stylish')
      },
      all: [
        'src/*.js',
        'Gruntfile.js'
      ]
    },
    lambda_log: {
      options: {
        functionName: 'env',
        // startTime: (new Date()).getTime(),
        // endText: /^REPORT RequestId/
      },
      debug: {}
    }
  });
  // tasks
  grunt.registerTask('test', function() {
    grunt.loadNpmTasks('grunt-contrib-jshint'); 
    grunt.task.run([
      'jshint'
    ]);
  });
  grunt.registerTask('log', function() {
    require('./tasks/lambda_log')(grunt);
    grunt.task.run([
      'lambda_log'
    ]);
  });
};




