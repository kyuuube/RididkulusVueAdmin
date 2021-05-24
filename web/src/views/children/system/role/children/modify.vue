<template>
    <base-content class="role-modify" v-loading="loading">
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/system/role/list">角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{ edit ? '编辑角色' : '新建角色' }}</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>{{ edit ? '编辑角色' : '新建角色' }}</h2>
        </div>
        <h4>基本信息</h4>
        <el-form :model="role" label-width="120px" autocomplete="off">
            <el-form-item required label="角色名称:">
                <el-input size="small" v-model="role.name" autocomplete="off" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item required label="角色描述:">
                <el-input size="small" v-model="role.description" autocomplete="off" placeholder="请输入角色描述"></el-input>
            </el-form-item>
            <el-form-item required label="角色状态:">
                <el-radio-group v-model="role.status" size="small">
                    <el-radio label="enable">启用</el-radio>
                    <el-radio label="disable">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <h4>权限信息</h4>
        <el-table
            ref="multipleTable"
            :data="tree"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="name" label="菜单名称"> </el-table-column>
            <el-table-column label="权限">
                <template slot-scope="scope">
                    <el-checkbox
                        @change="authorityChange($event, auth)"
                        :key="auth.id"
                        v-for="auth in scope.row.authority"
                        v-model="auth.check"
                        >{{ auth.name }}</el-checkbox
                    >
                </template>
            </el-table-column>
        </el-table>
        <div></div>
        <el-button :loading="btnLoading" size="small" @click="save" type="primary">保 存</el-button>
        <el-button size="small" @click="$router.back()">取 消</el-button>
    </base-content>
</template>

<script>
// apis
import * as accountApi from 'src/apis/accountApi';
export default {
    name: 'role-modify',
    data() {
        return {
            props: {
                label: 'name'
            },
            tree: [],
            role: {
                name: '',
                description: '',
                status: '',
                permissionIdList: [],
                menuIdList: []
            },
            multipleSelection: [],
            loading: false,
            btnLoading: false
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
                this.addRole();
            } else {
                this.editRole();
            }
        },
        async addRole() {
            const data = {
                ...this.role
            };
            data.menuIdList = this.multipleSelection;
            this.btnLoading = true;
            const { code, msg } = await accountApi.addRole(data).catch(e => e);
            this.btnLoading = false;
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.$message.success('保存成功');
            this.$router.back();
        },
        async editRole() {
            const data = {
                ...this.role
            };
            data.menuIdList = this.multipleSelection;
            this.btnLoading = true;
            const { code, msg } = await accountApi.editRole(data).catch(e => e);
            this.btnLoading = false;
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.$message.success('保存成功');
            this.$router.back();
        },
        async getAuthorityTree() {
            const { code, data } = await accountApi.getAuthorityTree().catch(e => e);
            if (code !== 200) {
                return this.$message.error('加载权限列表失败');
            }
            this.tree = data;
        },
        async getRoleDetail() {
            this.loading = true;
            const { code, data } = await accountApi.roleDetail(this.id).catch(e => e);
            this.loading = false;
            if (code !== 200) {
                return this.$message.error('加载角色详情失败');
            }
            this.role = data;
            this.role.permissionIdList = this.role.permissions.map(i => i.id);
            this.role.menuIdList = this.role.menus.map(i => i.id);
            this.eachChildren(this.tree);
            this.$forceUpdate();
        },
        authorityChange(checked, auth) {
            if (checked) {
                this.role.permissionIdList.push(auth.id);
            } else {
                console.log(auth.id);
                console.log(this.role.permissionIdList);
                this.role.permissionIdList = this.role.permissionIdList.filter(i => i !== auth.id);
            }
        },
        handleSelectionChange(v) {
            this.multipleSelection = v.map(i => i.id);
        },
        // 遍历```
        eachChildren(list) {
            if (!Array.isArray(list)) {
                return;
            }
            list.forEach(i => {
                if (this.role.menuIdList.find(item => item === i.id)) {
                    this.$refs.multipleTable.toggleRowSelection(i);
                }
                if (i.authority && i.authority.length > 0) {
                    i.authority.forEach(auth => {
                        const isChecked = !!this.role.permissionIdList.find(item => auth.id === item);
                        this.$set(auth, 'check', isChecked);
                    });
                }
                if (i.children && i.children.length > 0) {
                    this.eachChildren(i.children);
                }
            });
        }
    },
    async mounted() {
        await this.getAuthorityTree();
        if (this.edit) {
            this.getRoleDetail();
        }
    }
};
</script>
