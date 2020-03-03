<template>
  <q-page>
    <q-banner class="text-white bg-positive">TIP：本地题库指的是题目题面和样例均保留在本地的题目集，但不代表所有题目都是我们自己出的哦</q-banner>
    <q-card class="my-card">
      <q-card-section class="bg-blue">
        <div class="text-h6 text-white">本地题库</div>
      </q-card-section>
      <q-card-section class="q-gutter-sm row items-center">
        <q-input
          v-model="filter.searchProId"
          standout
          class="q-mr-md"
          label="题号"
          placeholder="输入题号，可模糊查询"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-input
          v-model="filter.searchTitle"
          standout
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
        <q-btn color="negative" round icon="clear_all" @click="clearSearch()">
          <q-tooltip>重置筛选</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-card-section>
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
      </q-card-section>
    </q-card>
    <br />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      filter: {
        searchProId: "",
        searchTitle: "",
        searchTag: ""
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalRows: 0
      },
      data: [],
      tagOptions: []
    };
  },
  mounted() {
    this.getProblem();
    this.getProblemTags();
  },
  methods: {
    clearSearch() {
      this.filter.searchProId = "";
      this.filter.searchTitle = "";
      this.filter.searchTag = "";
    },
    switchPage(val) {
      this.pagination.currentPage = val;
      this.getProblem();
    },
    sizeChange(val) {
      this.pagination.pageSize = val;
      this.getProblem();
    },
    async getProblem() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append("pageNum", this.pagination.currentPage);
      params.append("pageSize", this.pagination.pageSize);
      params.append("searchProId", this.filter.searchProId);
      params.append("tagId", this.filter.searchTag);
      params.append("title", this.filter.searchTitle);
      params.append("username", this.$store.getters["global/getUsername"]);
      // params.append("isStar", this.myCollection);
      let data = await this.$axios.get("/problem/list", params);
      this.data = data.datas[0];
      this.pagination.totalRows = data.datas[1];
      this.loading = false;
    },
    async getProblemTags() {
      let params = new URLSearchParams();
      let data = await this.$axios.get("/problem_tag/all", params);
      this.tagOptions = data.datas[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 90%;
  margin: auto;
  margin-top: 20px;
}
</style>
