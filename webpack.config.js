module.exports = (env) => {
  if (env === 'dev') {
    return require('./webpack.config.dev.js');
  }
  if (env === 'prod') {
    return require('./webpack.config.prod.js');
  }
  return new Error('Wrong webpack build parameter. Possible choices: "dev" or "prod".');
};
