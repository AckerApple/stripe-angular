const browserIndex = process.argv.indexOf('--browser')
const browserArg = browserIndex>=0 ? process.argv[browserIndex+1] : ''

const setup = {
  //basePath: '',
  basePath: 'src',
  frameworks: [
    'jasmine',
    '@angular-devkit/build-angular'
  ],

  plugins: [
    require('karma-jasmine'),
    require('karma-chrome-launcher')
  ],
  browsers: [],
  browserDisconnectTolerance : 2,
  browserNoActivityTimeout : 20000,
  browserDisconnectTimeout : 5000,
  reporters: ['progress'],//['progress','karma-typescript'],//['dots', 'karma-remap-istanbul'],//['progress'],//'dots',
  mime: { 'text/x-typescript': ['ts','tsx'] },
  client: { captureConsole: true }
}

if( browserArg=='PhantomJS' ){
  setup.browsers.push('Chrome')
  setup.browsers.push('PhantomJS')
  setup.plugins.push( require('karma-phantomjs-launcher') )
  setup.plugins.push( require('karma-jasmine-html-reporter') )
  setup.plugins.push( require('karma-coverage-istanbul-reporter') )
}else{
  setup.browsers.push('Chrome')
  //setup.customLaunchers = require('./test-tools/sauce-browsers.js').customLaunchers()
  setup.customLaunchers = require('./test/sauce-browsers.js').customLaunchers()
}

setup.plugins.push( require('@angular-devkit/build-angular/plugins/karma') )

module.exports = function (config) {
  setup.logLevel = config.LOG_INFO
  config.set(setup);
};
