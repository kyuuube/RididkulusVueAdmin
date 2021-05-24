<template>
    <div
        ref="reference"
        :id="key"
        class="single-select-tree"
        @mouseenter="inputHover = true"
        @mouseleave="inputHover = false"
        @click="() => toggleDropDownVisible(true)"
        v-clickoutside="() => toggleDropDownVisible(false)"
    >
        <el-input
            ref="input"
            :disabled="isDisabled"
            :size="realSize"
            :value="inputValue"
            :placeholder="placeholder"
            :validate-event="false"
            :class="{ 'is-focus': dropDownVisible }"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
        >
            <template slot="suffix">
                <i v-if="clearBtnVisible" key="clear" class="el-input__icon el-icon-circle-close" @click.stop="handleClear"></i>
                <i
                    v-else
                    key="arrow-down"
                    :class="['el-select__caret', 'el-input__icon', 'el-icon-arrow-down', dropDownVisible && 'is-reverse']"
                    @click.stop="toggleDropDownVisible()"
                ></i>
            </template>
        </el-input>

        <transition name="el-zoom-in-top" @after-leave="handleDropdownLeave">
            <div v-show="dropDownVisible" ref="popper" :class="['el-popper', 'el-cascader__dropdown', popperClass, 'popper-drop-down']">
                <el-tree
                    :accordion="accordion"
                    :highlight-current="true"
                    :props="props"
                    @node-click="checkChange"
                    :style="`min-width:${treeWidth}px;`"
                    ref="panel"
                    :data="options"
                    :node-key="props.value"
                    :default-expanded-keys="defaultExpandedKeys.length > 0 ? defaultExpandedKeys : defaultShowNodes"
                    :default-expand-all="expand"
                    :expand-on-click-node="false"
                >
                </el-tree>
            </div>
        </transition>
    </div>
</template>

<script>
import Popper from 'element-ui/src/utils/vue-popper';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import Emitter from 'element-ui/src/mixins/emitter';
import Locale from 'element-ui/src/mixins/locale';
import Migrating from 'element-ui/src/mixins/migrating';
import { isDef } from 'element-ui/src/utils/shared';
import { isEqual, kebabCase } from 'element-ui/src/utils/util';
import { isUndefined } from 'element-ui/src/utils/types';
// util
import uuid from 'uuid';
import { isEmpty } from 'src/common/util';

const MigratingProps = {
    expandTrigger: {
        newProp: 'expandTrigger',
        type: String
    },
    changeOnSelect: {
        newProp: 'checkStrictly',
        type: Boolean
    },
    hoverThreshold: {
        newProp: 'hoverThreshold',
        type: Number
    }
};
const PopperMixin = {
    props: {
        placement: {
            type: String,
            default: 'bottom-start'
        },
        appendToBody: Popper.props.appendToBody,
        visibleArrow: {
            type: Boolean,
            default: true
        },
        arrowOffset: Popper.props.arrowOffset,
        offset: Popper.props.offset,
        boundariesPadding: Popper.props.boundariesPadding,
        popperOptions: Popper.props.popperOptions
    },
    methods: Popper.methods,
    data: Popper.data,
    beforeDestroy: Popper.beforeDestroy
};
export default {
    name: 'single-select-tree',
    // components: {TheTreeBaseEle},
    directives: { Clickoutside },
    mixins: [PopperMixin, Emitter, Locale, Migrating],
    props: {
        value: {},
        size: String,
        props: {
            type: Object,
            default: () => {
                return {
                    value: 'id',
                    label: 'label',
                    children: 'children'
                };
            }
        },
        options: Array,
        popperClass: String,
        disabled: Boolean,
        clearable: Boolean,
        placeholder: {
            type: String,
            default: () => '请选择'
        },
        expand: {
            type: Boolean,
            default: false
        },
        defaultExpandedKeys: {
            type: Array,
            default: () => []
        },
        accordion: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            key: null,
            oldNodeList: [],
            store: [],
            checkedValue: this.value || null,
            inputValue: null,
            dropDownVisible: false,
            inputHover: false,
            checked: '',
            presentText: '',
            treeWidth: 100,
            defaultShowNodes: []
        };
    },
    watch: {
        value(val) {
            if (!isEqual(val, this.checkedValue)) {
                this.checkedValue = val;
                this.computePresentText();
            }
            if (val === '' || val === null) {
                this.inputValue = '';
                this.presentText = '';
            }
        },
        checkedValue: {
            handler: function(val) {
                const { value } = this;
                if (!isEqual(val, value) || isUndefined(value)) {
                    this.$emit('input', val);
                    this.$emit('change', val);
                }
            },
            deep: true
        },
        options: {
            handler: function() {
                if (this.options && this.options.length > 0) {
                    this.computePresentText();
                    this.inputValue = this.presentText;
                }
                this.options.forEach(item => {
                    this.defaultShowNodes.push(item.id);
                    // console.log(item.id)
                });
            },
            // immediate: true,
            deep: true
        },
        presentText(val) {
            this.inputValue = val;
        },
        presentTags(val, oldVal) {
            if (val.length || oldVal.length) {
                this.$nextTick(this.updateStyle);
            }
        },
        filtering() {
            this.$nextTick(this.updatePopper);
        }
    },
    computed: {
        realSize() {
            const _elFormItemSize = (this.elFormItem || {}).elFormItemSize;
            return this.size || _elFormItemSize || (this.$ELEMENT || {}).size;
        },
        isDisabled() {
            return this.disabled || (this.elForm || {}).disabled;
        },
        clearBtnVisible() {
            if (!this.clearable || this.isDisabled || !this.inputHover) {
                return false;
            }
            return !!this.presentText;
        },
        panel() {
            return this.$refs.panel;
        },
        config() {
            const config = this.props || {};
            const { $attrs } = this;

            Object.keys(MigratingProps).forEach(oldProp => {
                const { newProp, type } = MigratingProps[oldProp];
                let oldValue = $attrs[oldProp] || $attrs[kebabCase(oldProp)];
                if (isDef(oldProp) && !isDef(config[newProp])) {
                    if (type === Boolean && oldValue === '') {
                        oldValue = true;
                    }
                    config[newProp] = oldValue;
                }
            });

            return config;
        }
    },
    methods: {
        handleDropdownLeave() {
            this.inputValue = this.presentText;
        },
        handleFocus(e) {
            this.$emit('focus', e);
        },
        handleBlur(e) {
            this.$emit('blur', e);
        },
        handleInput(val, event) {
            !this.dropDownVisible && this.toggleDropDownVisible(true);

            if (event && event.isComposing) return;
            if (val) {
                this.filterHandler();
            } else {
                this.filtering = false;
            }
        },
        handleClear() {
            this.inputValue = '';
            this.presentText = '';
            this.checkedValue = '';
            this.clearCheckedNodes();
            this.panel.setCurrentKey(null);
        },
        toggleDropDownVisible(visible) {
            if (this.isDisabled) return;

            const { dropDownVisible } = this;
            const { input } = this.$refs;
            visible = isDef(visible) ? visible : !dropDownVisible;
            if (visible !== dropDownVisible) {
                this.dropDownVisible = visible;
                if (visible) {
                    this.$nextTick(() => {
                        this.updatePopper();
                        // this.panel.scrollIntoView();
                    });
                }
                input.$refs.input.setAttribute('aria-expanded', visible);
                this.$emit('visible-change', visible);
            }
        },
        checkChange(v) {
            this.checkedValue = v[this.props.value];
            this.presentText = v[this.props.label];
            this.dropDownVisible = false;
        },
        clearCheckedNodes() {
            this.checkedValue = null;
        },
        computePresentContent() {
            this.$nextTick(() => {
                this.computePresentText();
                if (this.dropDownVisible) {
                    this.toggleDropDownVisible(false);
                }
            });
        },
        computePresentText() {
            const node = this.getNode(this.checkedValue, this.options);
            if (node) {
                this.presentText = node[this.props.label];
            } else {
                console.warn('没有找到节点');
            }
        },
        getNode(id, nodes) {
            for (const node of nodes) {
                if (id == node[this.props.value]) {
                    return node;
                }
                if (node[this.props.children] && node[this.props.children].length > 0) {
                    const result = this.getNode(id, node[this.props.children]);
                    if (result === null) {
                        continue;
                    } else {
                        return result;
                    }
                }
            }
            return null;
        }
    },
    async mounted() {
        this.key = 'rk-' + uuid();
        this.$nextTick(() => {
            if (!isEmpty(this.value)) {
                this.checkedValue = this.value;
                this.computePresentText();
                this.inputValue = this.presentText;
            }
            const c = document.querySelector('#' + this.key);
            this.treeWidth = c.clientWidth - 6;
        });
    }
};
</script>

<style lang="postcss">
.single-select-tree {
    /*width: 100%;*/
    cursor: pointer;
    display: inline-block;
    & .el-input__inner {
        cursor: pointer;
    }
    & .is-reverse {
        transform: rotateZ(3.142rad);
    }
}
.popper-drop-down {
    z-index: 999999 !important;
    max-height: 450px;
    overflow-y: scroll;
}

.popper-drop-down::-webkit-scrollbar {
    width: 6px;
    background-color: #ffffff;
}

.popper-drop-down::-webkit-scrollbar-track {
    background-color: #ffffff;
}

.popper-drop-down::-webkit-scrollbar-thumb {
    background: #e9eceb;
    border-radius: 6px;
}

/*.box8::-webkit-scrollbar-button:start {*/
/*    background: url(./imgs/up.png) no-repeat;*/
/*    background-size: 12px 12px;*/
/*}*/

/*.box8::-webkit-scrollbar-button:end {*/
/*    background: url(./imgs/down.png) no-repeat;*/
/*    background-size: 12px 12px;*/
/*}*/
</style>
