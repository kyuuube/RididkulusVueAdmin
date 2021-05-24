// 开发环境和生产环境也需要的中间件
const common = [];

if (process.env.NODE_ENV !== 'production') {
    // 开发环境中间件
    module.exports = [...common, ...[require('./logger').default]];
} else {
    // 生产环境中间件
    module.exports = [...common];
}
