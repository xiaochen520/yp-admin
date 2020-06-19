<template>
    <div class="order">
        <div class="filter">
            <span style="margin-left: 10px">类型：</span>
            <el-select @change="changeTeacher" v-model="filterType" placeholder="请选择类型">
                <el-option v-for="item in typeArr" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
            </el-select>
            <el-button style="margin-left: 10px" @click="filterClick" type="primary">搜索</el-button>
            <!-- <el-button style="float: right" @click="addOrder" type="primary">添加转铺信息</el-button> -->
        </div>
        <el-table :loading="isLoad" :data="tbArr" border style="width: 100%">
            <el-table-column align="center" prop="id" label="订单ID" width="180">
            </el-table-column>
            <el-table-column align="center" prop="order_status" label="订单状态">
                <template slot-scope="scope">
                    {{scope.row.order_status == 0 ? "未支付" : "已支付"}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="userInfo.nick_name" label="支付用户">
            </el-table-column>
            <el-table-column align="center" prop="area" label="支付类型">
                <template slot-scope="scope">
                    {{scope.row.type == 1 ? checkIn(scope.row.category) : scope.row.type == 2 ? checkTop(scope.row.category): scope.row.type == 3 ? '求租手机号显示' : '刷新'}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="create_time" label="支付时间">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
            <el-pagination :current-page.sync="page" @current-change="changePage" background
                layout="prev, pager, next, total" :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import { getDd, removeOrder } from '@/api'

    export default {
        data() {
            return {
                query: {
                    title: "",
                    mobile: ""
                },
                isLoad: false,
                pageSize: 10,
                page: 1,
                filterType: 1,
                typeArr: [
                    {
                        label: "商家入驻",
                        id: 1
                    },
                    {
                        label: "店铺转让置顶",
                        id: 2
                    },
                    {
                        label: "求租手机号显示",
                        id: 3
                    },
                    {
                        label: "店铺转让刷新",
                        id: 4
                    }
                ],
                total: 0,
                tbArr: []
            }
        },
        mounted() {
            this.getOrder();
        },
        methods: {
            checkIn(category) {
                let res = category == 1 ? '商家入驻（半年）' : '商家入驻（一年）';
                return res;
            },
            checkTop(category) {
                let res = '';
                if(category == 0) {
                    res = '店铺转让(不置顶)';
                } else if(category == 1) {
                    res = '店铺转让(置顶一天)';
                }else if(category == 2) {
                    res = '店铺转让(置顶一周)';
                }else if(category == 3) {
                    res = '店铺转让(置顶一月)';
                }
                return res;
            },
            filterClick() {
                this.page = 1;
                this.getOrder();
            },
            goEdit(row) {
                let parms = {
                    id: row.id,
                    'title': row.title,
                    'area': row.area,
                    'zj': row.zj,
                    'province': row.province,
                    'city': row.city,
                    'region': row.region,
                    'address_desc': row.address_desc,
                    'name': row.name,
                    'mobile': row.mobile,
                    'content': row.content,
                    'photos': row.photos,
                    'type': row.type
                };
                this.$router.push({ path: "/add", query: parms });
            },
            removeOrder(row) {
                this.$confirm("将要该条记录？, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        removeOrder({ id: row.id }).then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    message: "删除成功",
                                    type: "success",
                                    duration: 1500,
                                    onClose: () => {
                                        this.getOrder();
                                    }
                                });
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            addOrder() {
                this.$router.push("/add");
            },
            changePage(page) {
                this.page = page;
                this.getOrder();
            },
            changeTeacher() {
                this.page = 1;
                this.getOrder();
            },
            // getTeacherFilter() {
            //   getTeacherFilter().then(res => {
            //     if (res.code == 200) {
            //       this.teacherArr = res.data;
            //     }
            //   });
            // },
            getOrder() {
                this.isLoad = true;
                this.tbArr = [];
                let parms = {
                    page: this.page,
                    limit: this.pageSize,
                    type: this.filterType
                }
                getDd(parms).then(res => {
                    this.isLoad = false;
                    if (res.code == 200) {
                        this.total = res.data.total;
                        this.tbArr = res.data.data;
                    }
                }).catch(err => {
                    this.isLoad = false;
                    console.log(err);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order {
        padding: 20px;

        .filter {
            padding: 10px 0;
            margin-bottom: 20px;
        }

        .page {
            padding: 15px 0;
            text-align: right;
        }
    }
</style>