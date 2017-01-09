// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const paths = require('../config/paths');
const postcss = require('../config/postcss');
const ExtractText  = require('extract-text-webpack-plugin')

module.exports = {
  plugins: [
    new ExtractText('styles.css' , {
      allChunks: true,
    })

  ],
  postcss,
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: paths.appSrc, // For app CSS only
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        include: paths.appNodeModules, // For node CSS only
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        include: paths.appNodeModules, // For node SCSS only
        loaders: [
          'style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass?sourceMap',
          'toolbox'
        ]
      },
    ],
  },
};
