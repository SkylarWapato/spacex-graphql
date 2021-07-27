const path = require('path')

module.exports = [
  {
    mode: (process.env.NODE_ENV || '').toLowerCase() === 'development' ? 'development' : 'production',
    entry: path.join(__dirname, 'src/index.ts'),
    devtool: 'inline-source-map',
    resolve: {
      extensions: [
        '.mjs',
        '.js',
        '.jsx',
        '.json',
        '.ts',
        '.tsx',
      ]
    },
    output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, 'dist'),
      filename: 'graphql.js',
    },
    target: 'node',
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        { test: /\.graphql$/, loader: 'graphql-import-loader' },
      ]
    },
  }
]
