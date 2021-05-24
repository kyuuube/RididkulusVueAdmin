// utils
import persistedState from 'src/common/persistedState';
// import * as doorControlApi from "../../../apis/doorControlApi";
// import * as userApi from "../../../apis/userApi";
import { namespace, getters as $getters, actions as $actions, mutations as $mutations } from './types';

const state = persistedState(
    namespace,
    {
        // tabList: [{ id: 1, name: '工作台', url: '/dashboard', icon: 'el-icon-s-data', parentId: 0 }]
        tabList: []
    },
    {
        tabMap: new Map()
    }
);

const mutations = {
    [$mutations.tabMap]: (state, data) => {
        state.tabMap = data;
    },
    [$mutations.tabList]: (state, data) => {
        state.tabList = data;
    }
};

const actions = {
    [$actions.setTabMap]: ({ commit }, data) => {
        commit($mutations.tabMap, data);
    },
    [$actions.setTabList]: ({ commit }, data) => {
        commit($mutations.tabList, data);
    }
};

const getters = {
    [$getters.tabMap]: state => state.tabMap,
    [$getters.tabList]: state => state.tabList
};

export default {
    namespaced: true,

    state,

    getters,

    actions,

    mutations
};
