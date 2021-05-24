module.exports = {
    dev: {
        devtoolType: 'cheap-module-eval-source-map',
        host: 'localhost',
        port: '2887',
        api: '/api',
        target: 'http://api.rosetta-latte.art'
    },
    build: {
        devtoolType: 'cheap-module-eval-source-map',
        api: 'http://api.rosetta-latte.art'
    }
};
