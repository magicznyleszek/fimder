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
            './node_modules/angular/angular.min.js',
            './node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.js',

            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/babel-polyfill/dist/polyfill.min.js',
            'test/mockApp.js',
            'test/**/*Test.js'
        ],
        exclude: [
            'src/app.js'
        ],

        // preprocess matching files before serving them to the browser
        // https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage', 'babel'],
            'test/**/*Test.js': ['babel']
        },

        coverageReporter: {
            dir: 'test/coverage',
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
