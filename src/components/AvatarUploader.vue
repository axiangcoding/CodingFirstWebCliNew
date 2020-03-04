<template>
  <div class="avatar-body">
    <span>上传头像图片必须在 2M 以内，只能是 JPG 格式或者 PNG 格式!</span>
    <el-upload
      ref="upload"
      class="col avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      list-type="picture"
      :on-change="handleAvatarChange"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <!-- 上传后的回显 -->
      <img v-if="imageUrl" :src="imageUrl" class="col avatar-uploader" />
      <q-icon v-else size="25px" name="cloud_upload" class="col q-mx-xl q-my-xl"></q-icon>
    </el-upload>
    <q-btn rounded class="col q-mt-sm" v-if="imageUrl" @click="clearAvatar" color="negative">清空图片</q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: "",
      imageUrl: ""
    };
  },
  props: {
    // 触发上传
    doUpload: Boolean
  },
  watch: {
    doUpload(val) {
      if (val) {
        this.uploadAvatar();
      }
    }
  },
  methods: {
    clearAvatar() {
      this.imageUrl = "";
    },
    handleAvatarChange(file, fileList) {
      this.file = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 在上传前
    beforeAvatarUpload(file) {
      // 限制上传格式和大小
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 格式或者 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async uploadAvatar() {
      let formData = new FormData();
      formData.append("avatar", this.file);
      let data = await this.$axios.post("/upload/avatar", formData);
      this.imageUrl = process.env.API + "/image/avatar/" + data.datas[0];
      this.$emit("returnUrl", this.imageUrl);
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-body {
  border: 1px dashed #d9d9d9;
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    width: 120px;
    height: 120px;
  }
  .avatar-uploader {
    &:hover {
      border-color: $primary;
    }
  }
  .avatar {
    width: 120;
    height: 128px;
    border-radius: 5px;
  }
}
</style>
