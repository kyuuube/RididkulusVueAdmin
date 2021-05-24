<template>
    <el-upload
        class="avatar-uploader"
        :action="isNotDev ? '/files/avatar' : '/api/files/avatar'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
export default {
    name: 'rd-avatar-upload',
    props: {
        value: null
    },
    data() {
        return {
            imageUrl: null
        };
    },
    computed: {
        isNotDev() {
            return process.env.NODE_ENV !== 'development';
        }
    },
    watch: {
        value: {
            handler: function() {
                this.imageUrl = this.value;
            },
            immediate: true
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res);
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$emit('input', res.url);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        }
    }
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
