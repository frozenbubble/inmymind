var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    devtool: 'source-map',
    debug: true,

    entry: {
        '@angular': [
            'rxjs',
            'reflect-metadata',
            '@angular/core',
            '@angular/router',
            '@angular/http',
            '@angular/common',
        ],
        'app': './src/main',
        'test': './src/app.spec'
    },

    output: {
        path: __dirname + '/build/',
        publicPath: 'build/',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

     resolve: {
        extensions: ['','.ts','.js','.json', '.css', '.html']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
                exclude: [ /node_modules/ ]
            }
        ]
  },

  plugins: [
    new CommonsChunkPlugin({ name: '@angular', filename: '@angular.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common',   filename: 'common.js' })
  ]
};