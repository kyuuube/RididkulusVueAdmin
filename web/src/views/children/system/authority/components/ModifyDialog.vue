<template>
    <el-dialog title="新增权限" :visible="value" @update:visible="$emit('input', $event)" width="760">
        <el-form ref="authorityForm" :model="authority" :rules="ruleAuthority" label-width="55px" autocomplete="off">
            <el-form-item prop="name" label="名称:">
                <el-input size="small" type="text" v-model="authority.name" placeholder="名称"> </el-input>
            </el-form-item>
            <el-form-item prop="menuId" label="菜单:">
                <el-select size="small" v-model="authority.menuId">
                    <el-option v-for="item in menuList" :value="item.id" :key="item.id" :label="item.name">{{ item.name }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="slug" label="标识:">
                <el-input size="small" type="text" v-model="authority.slug" placeholder="标识"> </el-input>
            </el-form-item>
            <el-form-item label="描述:">
                <el-input size="small" type="text" v-model="authority.description" placeholder="描述"> </el-input>
            </el-form-item>
            <el-form-item label="类型:">
                <el-radio-group v-model="authority.type">
                    <el-radio :label="0">页面权限</el-radio>
                    <el-radio :label="1">接口权限</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="接口路径:" v-if="authority.type === 1">
                <el-input size="small" type="text" v-model="authority.path" placeholder="描述"> </el-input>
            </el-form-item>
            <el-form-item label="接口方法:" v-if="authority.type === 1">
                <el-input size="small" type="text" v-model="authority.methods" placeholder="描述"> </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button size="small" type="primary" :loading="btnLoading" @click="save">确 认</el-button>
            <el-button size="small" type="info" :loading="btnLoading" @click="$emit('input', false)">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import * as accountApi from '../../../../../apis/accountApi';

export default {
    name: 'modify-dialog',
    props: {
        value: null
    },
    data() {
        return {
            menuList: [],
            btnLoading: false,
            authority: {
                name: '',
                menuId: '',
                description: '',
                path: '',
                methods: '',
                type: 0,
                slug: ''
            },
            ruleAuthority: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { type: 'string', max: 10, message: '输入长度超过10', trigger: 'blur' }
                ],
                menuId: [{ required: true, message: '请选择菜单.', trigger: 'blur' }],
                slug: [{ required: true, message: '请输入标识.', trigger: 'blur' }]
            }
        };
    },
    methods: {
        save() {
            if (!this.authority.id) {
                this.add();
            }
        },
        async add() {
            const data = {
                ...this.authority
            };
            this.btnLoading = true;
            const { code, msg } = await accountApi.saveAuthority(data).catch(e => e);
            this.btnLoading = false;
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.$message.success('保存成功');
            this.$emit('input', false);
        },
        async loadMenuList() {
            const { code, data } = await accountApi.getMenuList().catch(e => e);
            if (code !== 200) {
                return this.$message.error('加载菜单列表');
            }
            this.menuList = data.list;
        }
    },
    mounted() {
        this.loadMenuList();
    }
};
</script>

<style scoped></style>
