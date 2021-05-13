<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="讲师名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>
<script>
import teacher from '@/api/edu/teacher'

export default {
  data() { // 定义数据
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 7, // 每页记录数
      searchObj: {}// 查询条件
    }
  },
  created() { // 当页面加载时获取数据
    this.fetchData()
  },
  methods: {
    fetchData(page = 1) { // 调用api层获取数据库中的数据
      console.log('加载列表')
      // 当点击分页组件的切换按钮的时候，会传输一个当前页码的参数page
      // 解决分页无效问题
      this.page = page
      this.listLoading = true
      teacher.getPageList(this.page, this.limit, this.searchObj).then(response => {
        // debugger 设置断点调试
        if (response.success === true) {
          this.list = response.data.rows
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    removeDataById(id) {
      // debugger
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return teacher.removeById(id)
      }).then(() => { // 如果上一个then成功则执行此处的then回调
        this.fetchData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    }
  }

}
</script>

<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="app-container">&ndash;&gt;-->
<!--&lt;!&ndash;    讲师列表&ndash;&gt;-->

<!--&lt;!&ndash;    <el-table&ndash;&gt;-->
<!--&lt;!&ndash;      :data="tableData"&ndash;&gt;-->
<!--&lt;!&ndash;      style="width: 100%">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-table-column&ndash;&gt;-->
<!--&lt;!&ndash;        prop="date"&ndash;&gt;-->
<!--&lt;!&ndash;        label="Date"&ndash;&gt;-->
<!--&lt;!&ndash;        width="180">&ndash;&gt;-->
<!--&lt;!&ndash;      </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-table-column&ndash;&gt;-->
<!--&lt;!&ndash;        prop="name"&ndash;&gt;-->
<!--&lt;!&ndash;        label="Name"&ndash;&gt;-->
<!--&lt;!&ndash;        width="180">&ndash;&gt;-->
<!--&lt;!&ndash;      </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-table-column&ndash;&gt;-->
<!--&lt;!&ndash;        prop="address"&ndash;&gt;-->
<!--&lt;!&ndash;        label="Address">&ndash;&gt;-->
<!--&lt;!&ndash;      </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;    </el-table>&ndash;&gt;-->

<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->
<!--&lt;!&ndash;<script>&ndash;&gt;-->
<!--&lt;!&ndash;import teacher from '@/api/edu/teacher'&ndash;&gt;-->

<!--&lt;!&ndash;export default {&ndash;&gt;-->
<!--&lt;!&ndash;  data() { // 定义数据&ndash;&gt;-->
<!--&lt;!&ndash;    return {&ndash;&gt;-->
<!--&lt;!&ndash;      list: null&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  created() { // 当页面加载时获取数据&ndash;&gt;-->
<!--&lt;!&ndash;    this.fetchData()&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  methods: {&ndash;&gt;-->
<!--&lt;!&ndash;    fetchData() { // 调用api层获取数据库中的数据&ndash;&gt;-->
<!--&lt;!&ndash;      console.log(teacher.getList())&ndash;&gt;-->
<!--&lt;!&ndash;      // console.log('what')&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--<template>-->
<!--  <div class="app-container">-->
<!--    &lt;!&ndash;    <el-table&ndash;&gt;-->
<!--    &lt;!&ndash;      :data="list"&ndash;&gt;-->
<!--    &lt;!&ndash;      border&ndash;&gt;-->
<!--    &lt;!&ndash;      style="width: 100%"&ndash;&gt;-->
<!--    &lt;!&ndash;    >&ndash;&gt;-->
<!--    &lt;!&ndash;      <el-table-column&ndash;&gt;-->
<!--    &lt;!&ndash;        prop="id"&ndash;&gt;-->
<!--    &lt;!&ndash;        label="ID"&ndash;&gt;-->
<!--    &lt;!&ndash;        width="180"&ndash;&gt;-->
<!--    &lt;!&ndash;      />&ndash;&gt;-->
<!--    &lt;!&ndash;      <el-table-column&ndash;&gt;-->
<!--    &lt;!&ndash;        prop="name"&ndash;&gt;-->
<!--    &lt;!&ndash;        label="姓名"&ndash;&gt;-->
<!--    &lt;!&ndash;        width="180"&ndash;&gt;-->
<!--    &lt;!&ndash;      />&ndash;&gt;-->
<!--    &lt;!&ndash;      <el-table-column&ndash;&gt;-->
<!--    &lt;!&ndash;        prop="level"&ndash;&gt;-->
<!--    &lt;!&ndash;        label="级别"&ndash;&gt;-->
<!--    &lt;!&ndash;      />&ndash;&gt;-->

<!--    &lt;!&ndash;      <el-table-column&ndash;&gt;-->
<!--    &lt;!&ndash;        prop="level"&ndash;&gt;-->
<!--    &lt;!&ndash;        label="级别">&ndash;&gt;-->
<!--    &lt;!&ndash;        <template slot-scope="scope">&ndash;&gt;-->
<!--    &lt;!&ndash;          replacement content&ndash;&gt;-->
<!--    &lt;!&ndash;        </template>&ndash;&gt;-->
<!--    &lt;!&ndash;      </el-table-column>&ndash;&gt;-->

<!--    &lt;!&ndash;      <el-table-column&ndash;&gt;-->
<!--    &lt;!&ndash;        prop="level"&ndash;&gt;-->
<!--    &lt;!&ndash;        label="级别"&ndash;&gt;-->
<!--    &lt;!&ndash;      >&ndash;&gt;-->
<!--    &lt;!&ndash;        <template slot-scope="scope">&ndash;&gt;-->
<!--    &lt;!&ndash;          {{ scope.row.level === 1? '高级讲师' : '首席讲师' }}&ndash;&gt;-->
<!--    &lt;!&ndash;        </template>&ndash;&gt;-->
<!--    &lt;!&ndash;      </el-table-column>&ndash;&gt;-->

<!--    &lt;!&ndash;      <el-table-column prop="intro" label="资历" />&ndash;&gt;-->
<!--    &lt;!&ndash;      <el-table-column prop="gmtCreate" label="添加时间" width="160" />&ndash;&gt;-->
<!--    &lt;!&ndash;      <el-table-column prop="sort" label="排序" width="60" />&ndash;&gt;-->
<!--    &lt;!&ndash;      <el-table-column label="操作" width="200" align="center">&ndash;&gt;-->
<!--    &lt;!&ndash;        <template slot-scope="scope">&ndash;&gt;-->
<!--    &lt;!&ndash;          <router-link :to="'/edu/teacher/edit/'+scope.row.id">&ndash;&gt;-->
<!--    &lt;!&ndash;            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>&ndash;&gt;-->
<!--    &lt;!&ndash;          </router-link>&ndash;&gt;-->
<!--    &lt;!&ndash;          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除&ndash;&gt;-->
<!--    &lt;!&ndash;          </el-button>&ndash;&gt;-->
<!--    &lt;!&ndash;        </template>&ndash;&gt;-->
<!--    &lt;!&ndash;      </el-table-column>&ndash;&gt;-->

<!--    &lt;!&ndash;    </el-table>&ndash;&gt;-->

<!--    &lt;!&ndash;    &lt;!&ndash; 分页 &ndash;&gt;&ndash;&gt;-->
<!--    &lt;!&ndash;    <el-pagination&ndash;&gt;-->
<!--    &lt;!&ndash;      :current-page="page"&ndash;&gt;-->
<!--    &lt;!&ndash;      :page-size="limit"&ndash;&gt;-->
<!--    &lt;!&ndash;      :total="total"&ndash;&gt;-->
<!--    &lt;!&ndash;      style="padding: 30px 0; text-align: center;"&ndash;&gt;-->
<!--    &lt;!&ndash;      layout="total, prev, pager, next, jumper"&ndash;&gt;-->
<!--    &lt;!&ndash;      @current-change="fetchData"&ndash;&gt;-->
<!--    &lt;!&ndash;    />&ndash;&gt;-->

<!--    &lt;!&ndash;查询表单&ndash;&gt;-->
<!--    <el-form :inline="true" class="demo-form-inline">-->
<!--      <el-form-item>-->
<!--        <el-input v-model="searchObj.name" placeholder="讲师名" />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-select v-model="searchObj.level" clearable placeholder="讲师头衔">-->
<!--          <el-option :value="1" label="高级讲师" />-->
<!--          <el-option :value="2" label="首席讲师" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="添加时间">-->
<!--        <el-date-picker-->
<!--          v-model="searchObj.begin"-->
<!--          type="datetime"-->
<!--          placeholder="选择开始时间"-->
<!--          value-format="yyyy-MM-dd HH:mm:ss"-->
<!--          default-time="00:00:00"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-date-picker-->
<!--          v-model="searchObj.end"-->
<!--          type="datetime"-->
<!--          placeholder="选择截止时间"-->
<!--          value-format="yyyy-MM-dd HH:mm:ss"-->
<!--          default-time="00:00:00"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>-->
<!--      <el-button type="default" @click="resetData()">清空</el-button>-->
<!--    </el-form>-->

<!--    <el-table-->
<!--      v-loading="listLoading"-->
<!--      :data="list"-->
<!--      element-loading-text="数据加载中"-->
<!--      border-->
<!--      fit-->
<!--      highlight-current-row-->
<!--    >-->
<!--      <el-table-column-->
<!--        label="序号"-->
<!--        width="70"-->
<!--        align="center"-->
<!--      >-->
<!--        <template slot-scope="scope">-->
<!--          {{ (page - 1) * limit + scope.$index + 1 }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="name" label="名称" width="80" />-->
<!--      <el-table-column label="头衔" width="80">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.level===1?'高级讲师':'首席讲师' }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="intro" label="资历" />-->
<!--      <el-table-column prop="gmtCreate" label="添加时间" width="160" />-->
<!--      <el-table-column prop="sort" label="排序" width="60" />-->
<!--      <el-table-column label="操作" width="200" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <router-link :to="'/edu/teacher/edit/'+scope.row.id">-->
<!--            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>-->
<!--          </router-link>-->
<!--          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--    &lt;!&ndash; 分页 &ndash;&gt;-->
<!--    <el-pagination-->
<!--      :current-page="page"-->
<!--      :page-size="limit"-->
<!--      :total="total"-->
<!--      style="padding: 30px 0; text-align: center;"-->
<!--      layout="total, prev, pager, next, jumper"-->
<!--      @current-change="fetchData"-->
<!--    />-->

<!--    &lt;!&ndash;    </el-table>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--import teacher from '@/api/edu/teacher'-->

<!--export default {-->
<!--  // data() { // 定义数据-->
<!--  //   return {-->
<!--  //     list: null-->
<!--  //   }-->
<!--  // },-->

<!--  data() { // 定义数据-->
<!--    return {-->
<!--      listLoading: true, // 是否显示loading信息-->
<!--      list: null, // 数据列表-->
<!--      total: 0, // 总记录数-->
<!--      page: 1, // 页码-->
<!--      limit: 3, // 每页记录数-->
<!--      searchObj: {}// 查询条件-->
<!--    }-->
<!--  },-->

<!--  created() { // 当页面加载时获取数据-->
<!--    this.fetchData()-->
<!--  },-->
<!--  methods: {-->
<!--    // fetchData() { // 调用api层获取数据库中的数据-->
<!--    //   teacher.getList().then(response => {-->
<!--    //     console.log(response.data.items)-->
<!--    //     this.list = response.data.items-->
<!--    //   })-->
<!--    // }-->

<!--    fetchData(page = 1) { // 调用api层获取数据库中的数据-->
<!--      console.log('加载列表')-->
<!--      // 当点击分页组件的切换按钮的时候，会传输一个当前页码的参数page-->
<!--      // 解决分页无效问题-->
<!--      this.page = page-->
<!--      this.listLoading = true-->
<!--      teacher.getPageList(this.page, this.limit, this.searchObj).then(response => {-->
<!--        // debugger 设置断点调试-->
<!--        if (response.success === true) {-->
<!--          this.list = response.data.rows-->
<!--          this.total = response.data.total-->
<!--        }-->
<!--        this.listLoading = false-->
<!--      })-->
<!--    },-->
<!--    resetData() {-->
<!--      this.searchObj = {}-->
<!--      this.fetchData()-->
<!--    }-->

<!--  }-->
<!--}-->
<!--</script>-->
