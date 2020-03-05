<template>
  <q-page>
    <q-banner class="text-white bg-positive">TIP：本地评测指的是题目的评测由自主开发的评测机进行测评（LJ指的是Local Judge不是辣鸡）</q-banner>
    <q-card class="my-card">
      <q-card-section class="bg-blue">
        <div class="text-h6 text-white">
          <q-avatar color="secondary">LJ</q-avatar>本地评测
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-sm row items-center">
        <q-input
          v-model="filter.searchName"
          standout
          dense
          class="q-mr-md"
          label="昵称"
          placeholder="注意是昵称不是用户名"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-input
          v-model="filter.searchProId"
          standout
          dense
          class="q-mr-md"
          label="题号"
          placeholder="输入题号"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-input
          v-model="filter.searchTitle"
          standout
          dense
          class="q-mr-md"
          label="标题"
          placeholder="输入标题，可模糊查询"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-select
          filled
          dense
          class="q-mr-md"
          v-model="filter.searchTag"
          :options="tagOptions"
          option-value="id"
          option-label="name"
          emit-value
          map-options
          label="搜索标签"
          style="min-width: 200px; max-width: 300px"
        >
          <template v-if="filter.searchTag" v-slot:append>
            <q-icon name="cancel" @click.stop="filter.searchTag = ''" class="cursor-pointer" />
          </template>
        </q-select>
        <q-btn class="q-mr-md" color="primary" round icon="search" @click="getProblem()"></q-btn>
        <q-btn color="negative" round icon="clear_all" @click="cleanFilter()">
          <q-tooltip>重置筛选</q-tooltip>
        </q-btn>
      </q-card-section>
      <!-- <q-card-section>
        <el-pagination
          layout="sizes, prev, pager, next, jumper"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.totalRows"
          @size-change="sizeChange"
          @current-change="switchPage"
        ></el-pagination>
        <el-table :data="data" v-loading="loading">
          <el-table-column
            v-if="this.$store.getters['global/getIsLogin']"
            label="是否解决"
            min-width="20%"
          >
            <template slot-scope="scope">
              <q-chip
                v-if="scope.row.isSolved==='yes'"
                dense
                color="green"
                text-color="white"
                icon="check"
              >已解决</q-chip>
              <q-chip
                v-else-if="scope.row.isSolved==='no'"
                dense
                color="red"
                text-color="white"
                icon="close"
              >未解决</q-chip>
            </template>
          </el-table-column>
          <el-table-column label="#" min-width="25%">
            <template slot-scope="scope">
              <span class="text-orange text-weight-bold">{{scope.row.problemId}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Title" label="题目标题" min-width="60%">
            <template slot-scope="scope">
              <q-btn flat color="primary" :label="scope.row.title" />
            </template>
          </el-table-column>
          <el-table-column label="通过率（通过人数/总提交数）" min-width="50%">
            <template slot-scope="scope">
              <span class="text-secondary text-weight-bold">{{scope.row.ratio}}</span>
            </template>
          </el-table-column>
          <el-table-column label="题目难度" min-width="20%">
            <template slot-scope="scope">
              <q-chip
                v-if="scope.row.difficult==='简单'"
                dense
                color="green"
                text-color="white"
              >{{scope.row.difficult}}</q-chip>
              <q-chip
                v-else-if="scope.row.difficult==='中等'"
                dense
                color="orange"
                text-color="white"
              >{{scope.row.difficult}}</q-chip>
              <q-chip
                v-else-if="scope.row.difficult==='困难'"
                dense
                color="red"
                text-color="white"
              >{{scope.row.difficult}}</q-chip>
            </template>
          </el-table-column>
          <el-table-column label="题目来源" prop="belongToOj" min-width="25%">
            <template slot-scope="scope">
              <span class="text-info text-weight-bold">{{scope.row.belongToOj}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="row">
          <q-space />
          <el-pagination
            class="col-auto"
            layout="prev, pager, next, jumper"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            :total="pagination.totalRows"
            @size-change="sizeChange"
            @current-change="switchPage"
          ></el-pagination>
        </div>
      </q-card-section>-->
    </q-card>
    <br />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      data: {
        searchName: ""
      },
      filter: {},
      pagination: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 95%;
  margin: auto;
  margin-top: 20px;
}
</style>
