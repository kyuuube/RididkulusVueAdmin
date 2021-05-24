import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import globalActivated, { clearCache } from './mixin/globalLifecycle';
import { loadScript } from './common/index';
import VueProgressBar from 'vue-progressbar';
// import './assets/css/theme/dark/index.css';
const options = {
    color: '#0577ad',
    failedColor: '#cd7979',
    thickness: '4px',
    transition: {
        speed: '0.4s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};

Vue.use(VueProgressBar, options);

import baseContent from 'src/components/layout/LayoutBaseContent';
import moment from 'dayjs';
// // 引入中文
// import 'moment/locale/zh-cn';
// // 设置中文
// moment.locale('zh-cn');
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

Vue.component('baseContent', baseContent);
Vue.mixin(globalActivated);
Vue.prototype.$moment = moment;
Vue.prototype.$loadScript = loadScript;
Vue.prototype.$clearCache = clearCache;

if (process.env.NODE_ENV === 'development') {
    Vue.config.devtools = true;
} else {
    Vue.config.devtools = false;
}

router.beforeResolve((to, from, next) => {
    setTimeout(() => {
        window.initSuccess && window.initSuccess();
    }, 300);
    next();
});

loadScript('https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.9.6/dist/data-set.min.js');
loadScript('https://gw.alipayobjects.com/os/lib/antv/g2/3.5.12/dist/g2.min.js');

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
