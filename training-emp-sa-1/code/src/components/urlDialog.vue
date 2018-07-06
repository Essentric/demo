<template>
  <div class="container">
    <el-dialog title="批量生成url" :visible.sync="urlDialogData.dialogTableVisible"
        :modal="tableModal" :close-on-click-modal="true" :modal-append-to-body="false">
      <div style="margin-bottom: 20px;">
        <el-input type="number" placeholder="请输入要生成URL的数量" :min="1" :max="999" v-model="num">
          <template slot="append">
            <el-button type="primary" @click="createURL(num)">一键生成URL</el-button>
          </template>
        </el-input>
      </div>
      <el-table :data="urlData">
        <el-table-column property="id" label="ID" width=""></el-table-column>
        <el-table-column class="url" property="url" label="URL" width="">
          <template slot-scope="scope">
            <el-input readonly="readonly" v-model=scope.row.url>
              <el-tooltip slot="append" class="item" effect="dark" content="一键复制" placement="top">
                <el-button icon="el-icon-document"
                  v-clipboard:copy=scope.row.url
                  v-clipboard:success="onCopy">
                </el-button>
              </el-tooltip>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'urlDialog',
  data() {
    return {
      urlData: [],
      tableModal: true,
      num: 1,
    };
  },
  props: ['urlDialogData'],
  computed: {
    ...mapGetters(['authorization']),
  },
  methods: {
    tips() {
      this.$message.success('已复制到粘贴板!');
    },
    onCopy() {
      this.tips();
    },
    createURL(value) {
      if (value.length !== 0) {
        this.urlData = [];
        const token = this.authorization;
        this.$http.get('api/url/generate', {
          params: {
            survey_id: this.urlDialogData.id,
            num: this.num,
          },
          headers: {
            Authorization: `Bearer${token}`,
          },
        }).then((req) => {
          req.data.forEach((element, index) => {
            this.urlData.push({ id: index + 1, url: element.substring(7) });
            this.num = '1';
          });
        }).catch(() => { //  发送链接失败，刷新token
          this.$alert('获取链接失败,点击刷新重试,或重新登录', '错误', {
            confirmButtonText: '刷新',
            callback: (action) => {
              if (action === 'confirm') { //  如果用户点击刷新
                this.refreshToken().then(() => {
                  this.$message({
                    type: 'success',
                    message: '刷新成功，请继续操作',
                  });
                });
              }
            },
          });
        });
      }
    },
    refreshToken() {
      const token = this.authorization;
      this.$http.post('api/refresh-token', {}, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      }).then((req) => {
        this.$store.dispatch('changeAuthorization', req.headers.authorization);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
