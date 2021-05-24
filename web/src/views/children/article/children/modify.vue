<template>
    <base-content class="article-modify">
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/article">内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{ editing ? '编辑' : '新增' }}文章</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>{{ editing ? '编辑' : '新增' }}文章</h2>
        </div>
        <div class="editor" v-loading="loading">
            <el-form label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOptions"> </quill-editor>
                    <input type="file" id="getImage" style="display: none;" @change="uploadImage" />
                </el-form-item>
                <el-form-item label="文章狀態">
                    <el-radio-group v-model="status">
                        <el-radio :key="status.value" v-for="status in statusList" :label="status.value">{{ status.label }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </base-content>
</template>

<script>
// apis
import * as contentApi from 'src/apis/contentApi';
import * as commonApi from 'src/apis/commonApi';
// constants
import articleStatus from 'src/common/constants/articleStatus';
// components
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
// utils
import editorOptions from 'src/common/utils/editorOptions';
export default {
    name: 'article-modify',
    components: {
        quillEditor
    },
    data() {
        return {
            title: '',
            content: '',
            status: '2',
            editorOptions,
            loading: false,
            btnLoading: false,
            contentDetail: null
        };
    },
    computed: {
        editing() {
            return !!this.$route.params.id;
        },
        statusList() {
            return Object.keys(articleStatus).map(i => articleStatus[i]);
        }
    },
    methods: {
        async save() {
            const data = {
                ...this.contentDetail,
                title: this.title,
                content: this.content,
                status: this.status
            };
            const f = this.editing ? contentApi.editArticle : contentApi.addArticle;
            this.btnLoading = true;
            const { code, message } = await f(data).catch(e => e);
            this.btnLoading = false;
            if (code !== 200) {
                return this.$message.error(message);
            }
            this.$message.success('保存成功');
            this.$router.push('/article');
        },
        async uploadImage(e) {
            let file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            const { code, url } = await commonApi.upload(formData).catch(e => e);
            if (code !== 200) {
                return this.$message('失败');
            }
            this.insertImageIntoDOM(url);
        },
        insertImageIntoDOM(url) {
            let img = document.createElement('img');
            img.src = url;
            document.getElementsByClassName('ql-editor')[0].appendChild(img);
        },
        async loadArticleDetail() {
            this.loading = true;
            const { data } = await contentApi.getArticleDetail(this.$route.params.id).catch(e => e);
            this.loading = false;
            this.contentDetail = data;
            this.title = data.title;
            this.content = data.content;
            this.status = data.status;
        }
    },
    mounted() {
        this.loadArticleDetail();
    }
};
</script>

<style lang="less">
.article-modify {
    .editor {
        width: 88%;
        margin: 0 auto;
    }
}
</style>
