<template>
    <base-content class="user-modify">
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/article/list">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{ edit ? '编辑用户' : '新建用户' }}</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>{{ edit ? '编辑用户' : '新建用户' }}</h2>
        </div>
        <div class="main">
            <el-form :model="user" label-width="140px">
                <el-form-item required label="邮箱:">
                    <el-input size="small" v-model="user.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item required label="用户名:">
                    <el-input size="small" v-model="user.name" autocomplete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                    <el-radio-group v-model="user.gender">
                        <el-radio label="male">男</el-radio>
                        <el-radio label="female">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="!edit" required label="密码:">
                    <el-input
                        size="small"
                        v-model="user.password"
                        autocomplete="new-password"
                        placeholder="输入密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item v-if="!edit" required label="确认密码:">
                    <el-input
                        size="small"
                        v-model="user.rePassword"
                        autocomplete="new-password"
                        placeholder="确认秘密"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="头像:">
                    <rd-avatar-upload v-model="user.avatar"></rd-avatar-upload>
                </el-form-item>
                <el-form-item label="角色:">
                    <el-select v-model="user.roleIds" size="small" multiple placeholder="请选择">
                        <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" @click="save" type="primary">保 存</el-button>
                    <el-button size="small" @click="$router.back()">取 消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </base-content>
</template>

<script>
// apis
import * as accountApi from 'src/apis/accountApi';
// components
import RdAvatarUpload from 'src/components/upload/RdAvatarUpload';
const md5 = require('md5');
export default {
    name: 'user-modify',
    components: {
        RdAvatarUpload
    },
    props: ['id'],
    data() {
        return {
            user: {
                email: '',
                name: '',
                gender: 'male',
                password: '',
                rePassword: '',
                avatar: 'https://i.loli.net/2020/04/05/xUmnIHdZMv8epXo.jpg',
                roleIds: []
            },
            defaultList: [],
            roleOptions: []
        };
    },
    computed: {
        edit() {
            return !!this.id;
        }
    },
    methods: {
        save() {
            if (this.edit) {
                this.editUser();
            } else {
                this.addUser();
            }
        },
        async addUser() {
            const data = {
                ...this.user,
                password: md5(this.user.password)
            };
            data.rePassword = null;
            const { code, msg } = await accountApi.addUser(data).catch(e => e);
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.$message.success('保存成功');
            this.$router.back();
        },
        async editUser() {
            const data = {
                ...this.user
            };
            const { code, message } = await accountApi.editUser(data).catch(e => e);
            if (code !== 200) {
                return this.$message.error(message);
            }
            this.$message.success('保存成功');
            this.$router.back();
        },
        async detail() {
            const { code, data } = await accountApi.userDetail(this.id).catch(e => e);
            if (code !== 200) {
                return this.$message.error('获取用户详情失败');
            }
            this.user = data;
        },
        async loadRoleList() {
            const { data, msg, code } = await accountApi.getRoleOptions().catch(e => e);
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.roleOptions = data;
        }
    },
    mounted() {
        if (this.edit) {
            this.detail();
        }
        this.loadRoleList();
    }
};
</script>

<style lang="less">
.user-modify {
    .main {
        //margin: 0 auto;
        //width: 70%;
    }
}
</style>
