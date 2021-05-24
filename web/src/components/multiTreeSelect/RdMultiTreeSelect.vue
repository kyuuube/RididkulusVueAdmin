<template>
    <div class="project-select">
        <el-select :size="size" v-model="selectedCommunity" placeholder="请选择" multiple popper-class="project" collapse-tags>
            <el-option value="1">
                <el-tree
                    ref="treeRef"
                    :data="communityTreeList"
                    node-key="id"
                    accordion
                    show-checkbox
                    @check="handleCheckChange"
                    :default-checked-keys="defaultSelectdOpyions"
                ></el-tree>
            </el-option>
            <el-option v-for="(item, index) in selectedCommunity" :key="index" :value="item">{{ item }}</el-option>
        </el-select>
    </div>
</template>

<script>
import * as contractApi from 'src/apis/contract/contractApi';
import select from 'element-ui/packages/select/src/select';
const MixinProp = {
    props: {
        ...select.props
    }
};
export default {
    mixins: [MixinProp],
    props: {
        value: null,
        companyId: null
    },
    data() {
        return {
            communityTreeList: [], // 项目列表
            selectedCommunity: [], // 已选择的项目
            defaultSelectdOpyions: []
        };
    },
    watch: {
        value: {
            handler: function(value) {
                if (value && value.length > 0) {
                    this.defaultSelectdOpyions = [];
                    this.selectedCommunity = [];
                    value.forEach(item => {
                        this.selectedCommunity.push(item.communityName);
                        this.defaultSelectdOpyions.push(item.communityId);
                    });
                } else {
                    this.defaultSelectdOpyions = [];
                    this.selectedCommunity = [];
                    this.$nextTick(() => {
                        this.$refs.treeRef.setCheckedKeys([]);
                    });
                }
            },
            deep: true,
            immediate: true
        },
        companyId: {
            handler: function() {
                this.getTreeList();
            },
            deep: true
        }
    },
    methods: {
        // 获取项目树
        async getTreeList() {
            const { code, data, msg } = await contractApi.getTreeList(this.companyId).catch(e => e);
            if (code !== 0) {
                return this.$msg.err(msg);
            }
            this.communityTreeList = data;
        },
        handleCheckChange(val, val1) {
            this.selectedCommunity = [];
            let selectdList = [];
            // this.selectedCommunity = val1.checkedNodes;
            for (let i = 0; i < val1.checkedNodes.length; i++) {
                if (!val1.checkedNodes[i].children) {
                    this.selectedCommunity.push(val1.checkedNodes[i].label);
                    selectdList.push({
                        communityName: val1.checkedNodes[i].label,
                        communityId: val1.checkedNodes[i].id
                    });
                }
            }
            this.$emit('input', selectdList);
        }
    },
    mounted() {
        this.getTreeList();
    }
};
</script>

<style lang="postcss">
.project-select {
    & .el-tag.el-tag--info .el-tag__close {
        display: none !important;
    }
    & .el-select .el-tag__close.el-icon-close::before {
        display: none;
    }
}
.project {
    & .el-select-dropdown__item {
        height: auto !important;
        line-height: auto !important;
    }
    & .el-select-dropdown__item.hover,
    & .el-select-dropdown__item:hover {
        background-color: #fff;
    }
    & .el-select-dropdown__item.selected {
        display: none;
    }
}
</style>
