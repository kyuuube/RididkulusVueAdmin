// utils
import persistedState from 'src/common/persistedState';
// import * as doorControlApi from "../../../apis/doorControlApi";
// import * as userApi from "../../../apis/userApi";
import { namespace, getters as $getters, actions as $actions, mutations as $mutations } from './types';

const state = persistedState(
    namespace,
    {
        permissions: [],
        islogin: 1,
        user: {},
        token: null,
        routerTab: [],
        routerList: [],
        companyList: [],
        superAdmin: false,
        isCollapsed: false,
        menu: []
    },
    {
        selectedRouter: [],
        currentMenuId: sessionStorage.currentMenuId ? JSON.parse(sessionStorage.currentMenuId) : 1,
        currentOpenMenuIds: sessionStorage.currentOpenMenuIds ? JSON.parse(sessionStorage.currentOpenMenuIds) : []
        // ...other
    }
);

const mutations = {
    [$mutations.token]: (state, data) => {
        window.localStorage.setItem('token', data);
        state.token = data;
    },
    [$mutations.iframelogin]: state => {
        state.islogin = true;
    },
    [$mutations.logout]: state => {
        state.islogin = false;
        state.token = null;
        state.user = null;
        state.selectedRouter = [];
        state.currentMenuId = 1;
        state.currentOpenMenuIds = [];
        sessionStorage.clear();
    },
    [$mutations.user]: (state, data) => {
        state.user = data;
    },
    [$mutations.routerList]: (state, data) => {
        state.routerList = data;
    },
    [$mutations.companyList]: (state, data) => {
        state.companyList = data;
    },
    [$mutations.selectedRouter]: (state, data) => {
        state.selectedRouter = data;
        sessionStorage.selectedRouter = JSON.stringify(data);
    },
    [$mutations.currentMenuId]: (state, data) => {
        state.currentMenuId = data;
        sessionStorage.currentMenuId = JSON.stringify(data);
    },
    [$mutations.currentOpenMenuIds]: (state, data) => {
        state.currentOpenMenuIds = data;
        sessionStorage.currentOpenMenuIds = JSON.stringify(data);
    },
    [$mutations.isCollapsed]: (state, data) => {
        state.isCollapsed = data;
    },
    [$mutations.menu]: (state, data) => {
        state.menu = data;
    }
};

const actions = {
    [$actions.setToken]: ({ commit }, token) => {
        commit($mutations.token, token);
    },
    [$actions.logout]: ({ commit }) => {
        commit($mutations.logout);
    },
    [$actions.setUserInfo]: ({ commit }, user) => {
        commit($mutations.user, user);
    },
    [$actions.setRouterList]: ({ commit }, list) => {
        commit($mutations.routerList, list);
    },
    [$actions.setSelectedRouter]: ({ commit }, list) => {
        commit($mutations.selectedRouter, list);
    },
    [$actions.setCurrentMenuId]: ({ commit }, list) => {
        commit($mutations.currentMenuId, list);
    },
    [$actions.setCurrentOpenMenuIds]: ({ commit }, id) => {
        commit($mutations.currentOpenMenuIds, id);
    },
    [$actions.setCollapsed]: ({ commit }, data) => {
        commit($mutations.isCollapsed, data);
    },
    [$actions.setMenu]: ({ commit }, data) => {
        commit($mutations.menu, data);
    }
};

const getters = {
    [$getters.islogin]: state => state.islogin,
    [$getters.token]: state => state.token,
    [$getters.user]: state => state.user,
    [$getters.companyList]: state => state.companyList,
    [$getters.selectedRouter]: state => {
        return state.selectedRouter > 0 ? state.selectedRouter : JSON.parse(sessionStorage.selectedRouter || '[]');
    },
    [$getters.currentMenuId]: state => state.currentMenuId,
    [$getters.currentOpenMenuIds]: state => state.currentOpenMenuIds,
    [$getters.isCollapsed]: state => state.isCollapsed,
    [$getters.menu]: state => state.menu
};

export default {
    namespaced: true,

    state,

    getters,

    actions,

    mutations
};
