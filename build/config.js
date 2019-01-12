var debug = 'dev';

module.exports = {
    DEBUG:debug,
    development: {
        autoOpenBrowser: true,
        API_PATH:  debug == 'dev' ? 'https://www.ymkgdesign.com' : '',
    },
    version: '1.0.0'
};
