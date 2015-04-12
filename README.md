# grunt-lambda-log

[![Build Status](https://travis-ci.org/k-kinzal/grunt-lambda-log.svg)](https://travis-ci.org/k-kinzal/grunt-lambda-log)
[![Dependency Status](https://david-dm.org/k-kinzal/grunt-lambda-log.svg)](https://david-dm.org/k-kinzal/grunt-lambda-log)
[![devDependency Status](https://david-dm.org/k-kinzal/grunt-lambda-log/dev-status.svg)](https://david-dm.org/k-kinzal/grunt-lambda-log#info=devDependencies)

> Display AWS Lambda log for grunt task

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-lambda-log --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lambda-log');
```

## The "lambda_log" task

### Overview
In your project's Gruntfile, add a section named `lambda_log` to the data object passed into `grunt.initConfig()`.


```js
grunt.initConfig({
  lambda_log: {
    options: {
      functionName: 'functionname',
      startTime: (new Date()).getTime(),
      endText: /^REPORT RequestId/
    },
    debug: {}
  },
})
```

## License
Copyright (c) 2012-2015 k-kinzal. Licensed under the MIT license.