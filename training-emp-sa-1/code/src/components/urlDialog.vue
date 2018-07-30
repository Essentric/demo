<template>
  <div class="container">
    <el-dialog title="批量生成url" :visible.sync="urlDialogData.dialogTableVisible"
        :modal="tableModal" :close-on-click-modal="true" :modal-append-to-body="false">
      <div style="margin-bottom: 20px;">
        <el-input type="number" placeholder="请输入要生成URL的数量" :min="1" :max="999" v-model="num">
          <template slot="append">
            <el-button type="primary" @click="createURL">一键生成URL</el-button>
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
      count: 0, //  计数变量，统计递归的次数
    };
  },
  props: ['urlDialogData'],
  computed: {
    ...mapGetters(['authorization']),
  },
  watch: {
    urlDialogData: { // 关闭dialog的时候会将历史数据清空
      handler(val) {
        if (!val.dialogTableVisible) {
          this.urlData = [];
        }
      },
      deep: true,
    },
  },
  methods: {
    tips() {
      this.$message.success('已复制到粘贴板!');
    },
    onCopy() {
      this.tips();
    },
    createURL() {
      this.num = this.num.toString(); // 转换成字符串类型
      this.num = this.num.replace(/^0*/gi, ''); // 将前面的0去掉
      const reg = /^[0-9]+$/;
      if (reg.test(this.num)) { // 判断是否输入的是数字
        if (this.num > 0 && this.num <= 999) { // 如果是数字，判断是否在1~999以内的数字
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
            //  token已过期或不存在
            // console.log('刷新token');
            if (this.count < 1) { // 第一次请求失败,刷新token后重试
              this.$http.post('api/refresh-token', {}, {
                headers: {
                  Authorization: `Bearer${token}`,
                },
              }).then((res) => {
                this.$store.commit('changeAuthorization', res.headers.authorization);
                this.createURL();
              }).catch(() => {
                //  token已过期且不可再刷新
              });
              this.count = 0;
            } else { // 第二次失败,参数拼接有误
              this.$message({
                message: '请重试或联系管理员',
                type: 'error',
              });
            }
            this.count += 1;
          });
        } else { // 输入数字不在1~999内
          this.$message({
            message: '警告哦，请输入1~999内的数字哟',
            type: 'warning',
          });
          this.num = 1;
        }
      } else { // 输入不是数字
        this.$message({
          message: '警告哦，请输入合适的数字哟',
          type: 'warning',
        });
        this.num = 1;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
