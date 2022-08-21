<template>
    <div class="top">
        <el-input v-model="title" style="width: 200px;" suffix-icon="Search" placeholder="请输入标题" />
        <el-button type="warning" @click="search">搜索</el-button>
        <el-button type="warning" @click="reset" style="margin:0">重置</el-button>
        <el-button type="primary" @click="add" style="margin-left:20px">发布</el-button>
    </div>
    <el-scrollbar>
        <el-table :data="tableData" border stripe>
            <el-table-column prop="name" label="名字" />
            <el-table-column prop="title" label="标题" />
            <el-table-column show-overflow-tooltip prop="text" label="内容" />
            <el-table-column prop="type" label="分类" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="success" @click="editTable(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="deleteBlog(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin:50px 0 0 30% ;">
            <el-pagination background @current-change="handleCurrentChange" :page-sizes="[5, 10, 20, 50]"
                :page-size="pageSize" :current-page="page" layout="total, sizes, prev, pager, next, jumper"
                :total="total" @size-change="handleSizeChange">
            </el-pagination>
        </div>
    </el-scrollbar>

    <!-- 新增弹框对话框 -->
    <el-dialog v-model="dialogFormVisible" title="新增博客" width="60%" center destroy-on-close>
        <el-form label-width="55px">
            <el-form-item label="名字">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="form.type" style="width: 100%;">
                    <div v-for="item in elOption" :key="item">
                        <el-option :label=item.label :value=item.value />
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="内容">
                <div style="border: 1px solid #ccc;">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                        :mode="mode" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="form.text" :defaultConfig="editorConfig"
                        :mode="mode" @onCreated="onCreated" />
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="sureAdd()">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 编辑弹框对话框 -->
    <el-dialog v-model="editDialogFormVisible" title="新增博客" width="60%" center destroy-on-close>
        <el-form label-width="55px">
            <el-form-item label="名字">
                <el-input v-model="editForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="editForm.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="editForm.type" style="width: 100%;">
                    <div v-for="item in elOption" :key="item">
                        <el-option :label=item.label :value=item.value />
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="内容">
                <div style="border: 1px solid #ccc;">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorEdit" :defaultConfig="toolbarConfig"
                        :mode="mode" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="editForm.text"
                        :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="sureEdit()">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { technologypage, addBlog, deleteBlog, updateBlog } from '../api/technology'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

export default {
    name: 'artcle',
    components: { Editor, Toolbar },
    data() {
        return {
            store: this.$store,
            tableData: [],
            form: [],
            editForm: [],
            name: '',
            title: '',
            text: '',
            input: '',
            total: 0,
            page: 1,
            pageSize: 10,
            dialogFormVisible: false,
            editDialogFormVisible: false,
            editor: null,
            editorEdit: null,
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default',
            elOption: [
                {
                    label: "Vue",
                    value: "Vue"
                }, {
                    label: "react",
                    value: "react"
                }, {
                    label: "angular",
                    value: "angular"
                }, {
                    label: "js",
                    value: "js"
                }, {
                    label: "其他",
                    value: "其他"
                }
            ],

        }
    },
    created() {
        this.Load()
    },
    mounted() {
        this.store.commit('getUty')
    },
    updated() {
        this.store.commit('getUty')
    },
    methods: {
        Load() {
            let obj = {
                current: this.page,
                size: this.pageSize,
                title: this.title
            }
            technologypage(obj).then(res => {
                this.tableData = res.data.records
                this.total = res.data.total
            })
        },
        search() {
            this.Load()
        },
        reset() {
            this.title = ""
            this.Load()
        },
        add() {
            if (!this.store.state.isAdd) {
                this.$message.error("权限不够")
            } else {
                this.dialogFormVisible = true
                this.form = {}
            }
        },
        sureAdd() {
            addBlog(this.form).then(res => {
                if (res) {
                    this.$message.success("发布成功")
                    this.dialogFormVisible = false
                } else {
                    this.$message.error("发布失败")
                    this.dialogFormVisible = false
                }
                this.Load()
            })
        },
        editTable(row) {
            if (!this.store.state.isEdit) {
                this.$message.error("权限不够")
            } else {
                this.editForm = row
                this.editDialogFormVisible = true
            }
        },
        sureEdit() {
            updateBlog(this.editForm).then(res => {
                if (res.code === 1) {
                    this.$message.success("更新成功")
                    this.editDialogFormVisible = false
                } else {
                    this.$message.error("更新失败")
                    this.editDialogFormVisible = false
                    this.Load()
                }
            })
        },
        deleteBlog(id) {
            if (!this.store.state.isDelete) {
                this.$message.error("权限不够")
            } else {
                deleteBlog({ id: id }).then(res => {
                    if (res.code === 1) {
                        this.$message.success("删除成功")
                        this.Load()
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            }
        },
        handleCurrentChange(page) {
            this.page = page
            this.Load()
        },
        handleSizeChange(size) {
            this.pageSize = size
            this.Load()
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            this.editorEdit = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器

        const editorEdit = this.editorEdit
        if (editorEdit == null) return
        editorEdit.destroy() // 组件销毁时，及时销毁编辑器
    },
}
</script>

<style scoped>
.top {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 20px 0 20px 20px
}
</style>