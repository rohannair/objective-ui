const precss  = require('precss');
const cssnext = require('postcss-cssnext');
const nano    = require('cssnano');

module.exports = function() {
  return [
    precss,
    cssnext({
      warnForDuplicates: false
    }),
    nano,
  ];
};
