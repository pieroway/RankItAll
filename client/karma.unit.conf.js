module.exports = function (config) {
    var _config = {
        basePath: '',

        frameworks: ['jasmine', 'sinon'],

        files: [{ pattern: './config/karma-unit-test-shim.js', watched: false },
                { pattern: './src/i18n/*.json', watched: false, served: true, included: false }
                ],

        proxies: { '/i18n/en.json': '/base/src/i18n/en.json' },

        preprocessors: {
            './config/karma-unit-test-shim.js': ['webpack', 'sourcemap']
        },

        webpack: require('./config/webpack.test'),

        webpackMiddleware: { stats: 'errors-only' },

        webpackServer: { noInfo: true },

        coverageReporter: {
            dir : 'coverage/',
            reporters: [
                { type: 'text-summary', subdir: 'PhantomJS' },
                { type: 'json', subdir: 'PhantomJS' },
                { type: 'html', subdir: 'PhantomJS' },
                { type: 'lcovonly', subdir: 'PhantomJS' }
            ]
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        reporters: [ 'mocha', 'coverage', 'junit' ],
        port: 9876,
        colors: true,
        junitReporter: {
            outputDir: 'junit_unittests',
            suite: 'STA',
        },
        mochaReporter: {
            symbols: {
                success: '+',
                info: '#',
                warning: '!',
                error: 'x'
            }
        },
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,

    };

    config.set(_config);
};
