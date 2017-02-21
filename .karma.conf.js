module.exports = function (config) {
    config.set({
        basePath: '',
        port: 9876,
        autoWatch: false,
        singleRun: true,

        reporters: ['spec', 'coverage'],
        logLevel: config.LOG_INFO,
        colors: true,

        specReporter: {
            showSpecTiming: true
        },

        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],

        files: [
            // vendors
            './node_modules/lodash/lodash.min.js',
            './node_modules/angular/angular.min.js',
            './node_modules/angular-route/angular-route.min.js',
            './node_modules/angular-cache/dist/angular-cache.min.js',
            './node_modules/angular-mocks/angular-mocks.js',
            // test vendors
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/babel-polyfill/dist/polyfill.min.js',
            // source code
            'src/**/*.js',
            // test environment preparations
            'test/testApp.js',
            // test code
            'test/**/*Test.js'
        ],
        exclude: [
            'src/app.js',
            'src/appSetup/appInit.js'
        ],

        // preprocess matching files before serving them to the browser
        // https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage', 'babel'],
            'test/**/*.js': ['babel']
        },

        coverageReporter: {
            dir: 'test-coverage',
            reporters: [
                {
                    type: 'html',
                    includeAllSources: true
                },
                {
                    type: 'text-summary',
                    file: 'text-summary.txt',
                    includeAllSources: true
                },
                // prints to console for GitLab
                {
                    type: 'text-summary',
                    includeAllSources: true
                }
            ]
        }
    });
};
