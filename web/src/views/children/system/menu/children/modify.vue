<template>
    <base-content class="menu-modify">
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/system/menu/list">菜单管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{ edit ? '编辑菜单' : '新建菜单' }}</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>{{ edit ? '编辑菜单' : '新建菜单' }}</h2>
        </div>
        <el-form :model="menu" label-width="120px" autocomplete="off">
            <el-form-item required label="菜单名称:">
                <el-input size="small" v-model="menu.name" autocomplete="off" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item required label="菜单描述:">
                <el-input size="small" v-model="menu.description" autocomplete="off" placeholder="请输入角色描述"></el-input>
            </el-form-item>
            <el-form-item required label="上级菜单:">
                <el-select v-model="menu.parentId" size="small" clearable>
                    <el-option v-for="item in list" :value="item.id" :key="item.id" :label="item.name">{{ item.name }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item required label="图标:">
                <el-input size="small" v-model="menu.icon" autocomplete="off" placeholder="请输入图标"></el-input>
            </el-form-item>
            <el-form-item required label="url:">
                <el-input v-model="menu.url" size="small" autocomplete="off" placeholder="请输入url"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" @click="save" type="primary">保 存</el-button>
                <el-button size="small" @click="$router.back()">取 消</el-button>
            </el-form-item>
        </el-form>
    </base-content>
</template>

<script>
import * as accountApi from '../../../../../apis/accountApi';

export default {
    name: 'menu-modify',
    data() {
        return {
            menu: {
                name: '',
                description: '',
                url: '',
                icon: '',
                parentId: null,
                permissList: []
            },
            list: [],
            loading: false
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        edit() {
            return !!this.id;
        }
    },
    methods: {
        save() {
            if (!this.edit) {
                this.addMenu();
            }
        },
        async addMenu() {
            const data = {
                ...this.menu
            };
            const { code, msg } = await accountApi.addMenu(data).catch(e => e);
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.$message.success('保存成功');
            this.$router.back();
        },

        async loadMenuDetail() {},

        async loadMenuList() {
            const { code, msg, data } = await accountApi.getMenuList().catch(e => e);
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.list = data.list;
        }
    },
    mounted() {
        this.loadMenuList();
    }
};
</script>

<style scoped></style>
