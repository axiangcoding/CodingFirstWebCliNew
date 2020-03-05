<template>
  <q-page>
    <q-banner
      class="text-white bg-warning"
    >TIP：Virtual Judge题库内的题目均从Virtual Judge平台获取，如果加载较慢请稍等，因为有可能是他们服务器压力太大</q-banner>
    <q-card class="my-card">
      <q-card-section class="bg-blue">
        <div class="text-h6 text-white">
          <q-avatar color="secondary">
            <img src="https://vjudge.net/static/images/logo.ico" />
          </q-avatar>Virtual Judge 题库
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-sm row items-center">
        <q-select
          filled
          dense
          class="q-mr-md"
          v-model="filter.searchOJId"
          :options="OJs"
          option-value="id"
          option-label="name"
          emit-value
          map-options
          label="搜索OJ名"
          style="min-width: 150px;"
        >
          <template v-if="filter.searchTag" v-slot:append>
            <q-icon name="cancel" @click.stop="filter.searchTag = ''" class="cursor-pointer" />
          </template>
        </q-select>
        <q-input
          v-model="filter.searchProId"
          standout
          dense
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
          dense
          class="q-mr-md"
          label="标题"
          placeholder="输入标题，可模糊查询"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-input
          v-model="filter.searchResouce"
          standout
          dense
          class="q-mr-md"
          label="来源"
          placeholder="输入来源，可模糊查询"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn class="q-mr-md" color="primary" round icon="search" @click="getVJProblem()"></q-btn>
        <q-btn color="negative" round icon="clear_all" @click="cleanFilter()">
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
          <el-table-column label="OJ名" prop="originOJ" min-width="15%">
            <template slot-scope="scope">
              <span class="text-dark text-weight-bold">{{scope.row.originOJ}}</span>
            </template>
          </el-table-column>
          <el-table-column label="题号" prop="originProb" min-width="20%">
            <template slot-scope="scope">
              <span class="text-warning text-weight-bold">{{scope.row.originProb}}</span>
            </template>
          </el-table-column>
          <el-table-column label="题目标题" min-width="40%">
            <template slot-scope="scope">
              <q-btn
                flat
                color="primary"
                :label="scope.row.title"
                @click="toVJSubmit(scope.row.originOJ,scope.row.originProb)"
              />
            </template>
          </el-table-column>
          <el-table-column label="更新时间" min-width="30%">
            <template slot-scope="scope">
              <!-- <i class="el-icon-success" v-if="scope.row.status===0"></i>
              <i class="el-icon-loading" v-else-if="scope.row.status===1"></i>
              <i class="el-icon-warning" v-else></i>-->
              <span class="text-secondary text-weight-bold">{{formatDate(scope.row.triggerTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="题目源（访问链接请注意安全）" min-width="40%">
            <template slot-scope="scope">
              <span class="text-negative text-weight-bold" v-html="scope.row.source"></span>
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
import { date } from "quasar";
export default {
  data() {
    return {
      loading: false,
      filter: {
        searchOJId: "All",
        searchProId: "",
        searchTitle: "",
        searchResource: ""
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalRows: 0
      },
      OJs: [],
      data: []
    };
  },
  mounted() {
    this.getVJProblem();
    this.getOJs();
  },
  methods: {
    cleanFilter() {
      (this.filter.searchProId = ""), (this.filter.searchOJId = "All");
      this.filter.searchTitle = "";
      this.filter.searchResource = "";
    },
    switchPage(val) {
      this.pagination.currentPage = val;
      this.getVJProblem();
    },
    sizeChange(val) {
      this.pagination.pageSize = val;
      this.getVJProblem();
    },
    formatDate(val) {
      return date.formatDate(val, "YYYY-MM-DD HH:mm:ss");
    },
    // 获取OJ列表
    async getOJs() {
      let data = await this.$axios.get("/vj/util/ojs");
      let OJs = data.datas[0];
      this.OJs.push("All");
      for (let key in OJs) {
        this.OJs.push(key);
      }
    },
    async getVJProblem() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append("pageNum", this.pagination.currentPage);
      params.append("pageSize", this.pagination.pageSize);
      params.append("OJId", this.filter.searchOJId);
      params.append("category", "all");
      params.append("probNum", this.filter.searchProId);
      params.append("title", this.filter.searchTitle);
      params.append("source", this.filter.searchResource);
      let data = await this.$axios.get("/vj/problem/list", params).catch(() => {
        this.loading = false;
      });
      if (data.code === 10000) {
        this.data = data.datas[0].data;
        this.pagination.totalRows = data.datas[0].recordsTotal;
        this.$q.notify({
          message: "与Virtual Judge同步成功",
          caption: `同步时间为：${date.formatDate(
            data.datas[1],
            "YYYY-MM-DD HH:mm:ss"
          )}`,
          color: "positive",
          icon: "check"
        });
      } else {
        this.$q.notify({
          message: "与Virtual Judge同步失败",
          caption: `同步时间为：${date.formatDate(
            data.datas[1],
            "YYYY-MM-DD HH:mm:ss"
          )}`,
          color: "negative",
          icon: "error"
        });
      }
      this.loading = false;
    }
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
