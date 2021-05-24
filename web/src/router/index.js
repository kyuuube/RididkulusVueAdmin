import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import checkLogin from './filter/checkLogin';
import checkPermission from './filter/checkPermission';
import checkTabs from './filter/checkTabs';
// import globalBeforeRouteLeave from './filter/globalBeforeRouteLeave';

// 如果使用 CommonJS 模块规范, 需要显式的使用 Vue.use() 安装路由模块
Vue.use(VueRouter);

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制
const router = new VueRouter({
    mode: 'hash',
    routes // 路由
});

checkLogin(router);
checkPermission(router);
checkTabs(router);
// globalBeforeRouteLeave(router);

export default router;
