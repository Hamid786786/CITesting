/**
 * @author: @AngularClass
 */

module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js')({ env: 'test' });

  var configuration = {

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('istanbul-instrumenter-loader'),
      require('@angular/cli/plugins/karma'),
      require('karma-sourcemap-loader'),
      require('karma-webpack'),
      require('karma-coverage'),
      require('karma-remap-coverage'),
      require('karma-phantomjs-launcher'),
    ],
    coverageIstanbulReporter: {
      reports: ['text-summary', 'html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,
    // list of files to exclude
    exclude: [],

    client: {
      //captureConsole: false,
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [
      { pattern: './config/spec-bundle.js', watched: false },
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
    ],

    /*
     * By default all assets are served at http://localhost:[PORT]/base/
     */
    proxies: {
      "/assets/": "/base/src/assets/"
    },

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      file: 'coverage.xml',
      includeAllSources: true
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html',
      cobertura: './coverage/cobertura.xml'
    },

    junitReporter: {
      outputDir: './karma-results',
      outputFile: 'karma-results.xml'
    },

    // Webpack please don't spam the console when running in karma!
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e. 
        chunks: false
      }
    },

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['progress', 'kjhtml', 'coverage', 'coverage-istanbul', 'remap-coverage'],

    // web server port

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    //autoWatch: false,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: ['PhantomJS', 'PhantomJS_custom'],

    // you can define custom flags 
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom) 
      exitOnResourceError: true
    },
  
    
    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    //singleRun: true,

    /*
     * Timeout definitions
     */
    captureTimeout: 60000,
    browserDisconnectTimeout: 2000,
    browserDisconnectTolerance: 0,
    browserNoActivityTimeout: 60000,
    singleRun:true    
  };

  if (process.env.TRAVIS) {
    configuration.browsers = [
      'PhantomJS_custom'
    ];
  }

  if (process.platform == 'darwin') {
    configuration.browsers = [
      'Chrome',
      'Firefox',
      'Safari'
    ];
  }

  if (process.platform.startsWith('win')) {
    configuration.browsers = [
      'Chrome',
      'Firefox',
      'IE'
    ];
  }

  config.set(configuration);
};
