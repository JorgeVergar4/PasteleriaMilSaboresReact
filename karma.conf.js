module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine'],
      files: [
        'src/tests/setupTests.js',
        'src/tests/**/*.spec.js'
      ],
      preprocessors: {
        'src/tests/**/*.spec.js': ['webpack'],
        'src/tests/setupTests.js': ['webpack']
      },
      webpack: {
        mode: 'development',
        module: {
          rules: [
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
                }
              }
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
          ]
        },
        resolve: {
          extensions: ['.js', '.jsx']
        }
      },
      reporters: ['progress', 'kjhtml', 'coverage'],
      coverageReporter: {
        type: 'html',
        dir: 'coverage/'
      },
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      concurrency: Infinity
    });
  };
  