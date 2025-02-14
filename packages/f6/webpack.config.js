const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');
// eslint-disable-next-line prefer-destructuring
const resolve = require('path').resolve;
// eslint-disable-next-line prefer-destructuring

let entry = {
  f6: './src/index.ts',
};

const graphExtenders = fs.readdirSync(path.join(__dirname, './src/extends/graph'));
const layoutExtenders = fs.readdirSync(path.join(__dirname, './src/extends/layout'));
graphExtenders.forEach((name) => {
  entry[name] = `./src/extends/graph/${name}/index.ts`;
});
layoutExtenders.forEach((name) => {
  entry[name] = `./src/extends/layout/${name}/index.ts`;
});

module.exports = {
  entry,
  output: {
    filename: (pathData) => {
      const chunkName = pathData.chunk.name;
      let filename = 'index.js';
      if ('f6' === chunkName) {
        filename = 'f6.js';
      }
      if (/graph/i.test(chunkName)) {
        filename = 'extends/graph/[name].js';
      }
      if (/layout/i.test(chunkName)) {
        filename = 'extends/layout/[name].js';
      }
      return filename;
    },
    library: 'f6',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: resolve(process.cwd(), 'dist/'),
    globalObject: 'this',
  },
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              inline: 'fallback',
              filename: 'f6Layout.worker.js',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // babelrc: true,
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: process.env.ANALYZE
    ? [new Visualizer(), new BundleAnalyzerPlugin(), new webpack.optimize.AggressiveMergingPlugin()]
    : [new webpack.optimize.AggressiveMergingPlugin()],
  devtool: 'source-map',
};
