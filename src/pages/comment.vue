<template>
    <!-- <div class="top">
        <el-input v-model="name" style="width: 200px;" suffix-icon="Search" placeholder="请输入作者名" />
        <el-button type="warning" @click="search">搜索</el-button>
        <el-button type="warning" @click="reset" style="margin:0">重置</el-button>
        <el-button type="primary" @click="add" style="margin-left:20px">发布</el-button>
    </div> -->
    <el-scrollbar>
        <el-table :data="tableData" border stripe>
            <el-table-column prop="technologyId" label="所属文章ID" width="150" />
            <el-table-column prop="comment" label="评论内容" />
            <el-table-column label="操作" width="350">
                <template #default="scope">
                    <el-button type="danger" @click="deleteComment(scope.row.id)">删除
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
</template>

<script>
import { selectComment, deleteComment } from '../api/technology'
export default {
    name: 'comment',
    data() {
        return {
            store: this.$store,
            tableData: [],
            total: 0,
            page: 1,
            pageSize: 10,
        }
    },
    created() {
        this.load()
    },
    mounted() {
        this.store.commit('getUty')
    },
    updated() {
        this.store.commit('getUty')
    },
    methods: {
        load() {
            let obj = {
                current: this.page,
                size: this.pageSize
            }
            selectComment(obj).then(res => {
                this.tableData = res.data.records
                this.total = res.data.total
            })
        },
        deleteComment(id) {
            if (!this.store.state.isDelete) {
                this.$message.error("权限不够")
            } else {
                deleteComment({ id: id }).then(res => {
                    if (res.code === 1) {
                        this.$message.success("删除成功")
                        this.load()
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            }
        },
        handleCurrentChange(page) {
            this.page = page
            this.load()
        },
        handleSizeChange(size) {
            this.pageSize = size
            this.load()
        },
    }
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