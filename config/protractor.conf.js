/**
 * @author: @AngularClass
 */

require('ts-node/register');
var helpers = require('./helpers');

exports.config = {
  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [
    helpers.root('src/**/**.e2e.ts'),
    helpers.root('src/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ["--headless", "--disable-gpu", "--window-size=1024x786"]
    }
  },

  onPrepare: function () {
    var jasmineReporters = require('jasmine-reporters');

    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig().then(function (config) {
      // you could use other properties here if you want, such as platform and version
      var browserName = config.capabilities.browserName;

      var junitReporter = new jasmineReporters.JUnitXmlReporter({
        consolidateAll: false,
        savePath: 'testresults',
        modifyReportFileName: function (generatedFileName, suite) {
          // this will produce distinct file names for each capability,
          // e.g. 'firefox.SuiteName' and 'chrome.SuiteName'
          return browserName + '.' + generatedFileName;
        }
      });
      jasmine.getEnv().addReporter(junitReporter);
    });
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  //  useAllAngular2AppRoots: true,
     plugins: [{
        package: 'jasmine2-protractor-utils',
        disableHTMLReport: false,
        disableScreenshot: false,
        screenshotPath:'./reports/screenshots',
        screenshotOnExpectFailure:true,
        screenshotOnSpecFailure:true,
        clearFoldersBeforeTest: true,
        htmlReportDir: './reports/htmlReports',
        // failTestOnErrorLog: {
        //             failTestOnErrorLogLevel: 900,
        //             excludeKeywords: ['keyword1', 'keyword2']
        //         }
      }]

   
};