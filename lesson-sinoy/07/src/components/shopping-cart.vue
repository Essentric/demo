<template>
  <el-container>
    <el-header>
      <div class="my-header">
        <h3>我的购物车({{getCount}})</h3>
        <a href="javascript:;" class="btn-edit" @click="handleEditAll" v-if="!editAll">编辑</a>
        <a href="javascript:;" class="btn-edit" @click="handleEditAll" v-if="editAll">确定</a>
      </div>
    </el-header>
    <el-main>
      <el-row class="goods" v-for="(stores, key) in dataInfo" :key="key">
        <el-col :span="24" class="store-name">
          <el-row>
            <el-col :span="12">
              <input type="checkbox" v-model="stores.storeSelect" @change="changeStoresSelect(stores.storeSelect, stores)">
              <a href="javascript:;">{{stores.storeName}} ></a>
            </el-col>
            <el-col :span="6" :offset="6" style="text-align:right;padding-right:1em">
              <a href="javascript:;" class="get-coupon">领券</a>
              <i style="color: #eee;">|</i>
              <a href="javascript:;">编辑</a>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" class="goods-info" v-for="(goods, index) in stores.goods" :key="index">
          <el-col :span="8" class="pic">
            <input class="goods-checkbox" type="checkbox" v-model="goods.goodsSelect" @change="changeGoodsSelect(goods.goodsSelect, stores)">
            <a href="javascript:;" style="margin-left:2em;width:100%;height:100%"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530945037524&di=914d7711636e8c7fb7cf8702372b02d6&imgtype=0&src=http%3A%2F%2Fimg14.360buyimg.com%2Fn4%2Fg7%2FM03%2F05%2F12%2FrBEHZlBJyNYIAAAAAAFJgkuWxI0AABFkgG4mrMAAUma420.jpg" alt=""></a>
          </el-col>
          <el-col :span="16" class="desc" style="padding-right:1em">
            <a href="javascript:;">
              <p>{{goods.description}}</p>
              <span style="color: #f00;position:absolute;bottom: .5em">￥ {{goods.price}}</span>
              <span style="position:absolute;right: 1em;bottom: .5em" v-if="!editAll">x {{goods.count}}</span>
              <el-input-number style="position:absolute;right: 1em;bottom: .5em"
              v-if="editAll"
              :min="0"
              size="mini"
              v-model="goods.count"
              @change="handleChangeCount($event, key, index)"></el-input-number>
            </a>
          </el-col>
        </el-col>
      </el-row>
    </el-main>
    <el-footer style="height: auto;">
      <el-row class="submit">
        <el-col :span="4">
          <input type="checkbox" v-model="selectAll" @change="changeAllSelect(selectAll)">
        </el-col>
        <el-col :span="20" style="text-align:right">
          <span>合计: <span style="color: #f00">￥{{totalPrice.toFixed(2)}}</span></span>
          <a href="javascript:;" style="margin-left: 1em;padding: 1em 2em;background: orange; color:#fff">结算</a>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'shopping-cart',
  data () {
    return {
      editAll: false,
      totalPrice: 0,
      selectAll: false,
      dataInfo: [{
        storeSelect: false,
        storeName: '杂七杂八批发生活',
        goods: [{
          goodsSelect: false,
          description: '双肩包男士背包男韩版潮旅行电脑男潮包PU时尚潮流皮休闲学生书包',
          price: 99.8,
          count: 1
        }, {
          goodsSelect: false,
          description: '双肩包男士背包男韩版潮旅行电脑男潮包PU时尚潮流皮休闲学生书包',
          price: 98.8,
          count: 1
        }, {
          goodsSelect: false,
          description: '双肩包男士背包男韩版潮旅行电脑男潮包PU时尚潮流皮休闲学生书包',
          price: 97.8,
          count: 1
        }]
      }, {
        storeSelect: false,
        storeName: '杂七杂八批发生活',
        goods: [{
          goodsSelect: false,
          description: '双肩包男士背包男韩版潮旅行电脑男潮包PU时尚潮流皮休闲学生书包',
          price: 96.8,
          count: 1
        }, {
          goodsSelect: false,
          description: '双肩包男士背包男韩版潮旅行电脑男潮包PU时尚潮流皮休闲学生书包',
          price: 95.8,
          count: 1
        }]
      }]
    }
  },
  watch: {
    dataInfo: {
      handler: function () {
        this.totalPrice = 0
        for (const stores of this.dataInfo) {
          for (const goods of stores.goods) {
            if (goods.goodsSelect === true) {
              this.totalPrice += goods.price * goods.count
            }
          }
        }
      },
      deep: true
    }
  },
  computed: {
    getCount () {
      let count = 0
      for (const stores of this.dataInfo) {
        for (const goods of stores.goods) {
          count += goods.count
        }
      }
      return count
    }
  },
  methods: {
    handleChangeCount (val, key, index) {
      console.log(val, key, index)
      if (val === 0) {
        this.$confirm('移出购物车?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dataInfo[key].goods.splice(index, 1)
          this.$message({
            type: 'success',
            message: '已移除!'
          })
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '操作已取消!'
          })
          this.dataInfo[key].goods[index].count = 1
        })
      }
    },
    handleEditAll () {
      this.editAll = !this.editAll
    },
    changeGoodsSelect (val, stores) {
      const flag = stores.goods.every((ele) => {
        return ele.goodsSelect === true
      })
      if (flag === true) {
        stores.storeSelect = true
      } else {
        stores.storeSelect = false
        this.selectAll = false
      }
    },
    changeStoresSelect (val, stores) {
      if (val === true) {
        stores.goods.forEach((element) => {
          element.goodsSelect = true
        })
      } else {
        stores.goods.forEach((element) => {
          element.goodsSelect = false
        })
      }
      const flag = this.dataInfo.every((stores) => {
        return stores.storeSelect === true
      })
      if (flag === true) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    changeAllSelect (val) {
      if (val === true) {
        for (const stores of this.dataInfo) {
          stores.storeSelect = true
          for (const goods of stores.goods) {
            goods.goodsSelect = true
          }
        }
      } else {
        for (const stores of this.dataInfo) {
          stores.storeSelect = false
          for (const goods of stores.goods) {
            goods.goodsSelect = false
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
  color: #000;
}
p {
  padding: 0;
  margin: 0;
}
.el-container {
  height: 100%;
  width: 100%;
  padding: 0;
}
.el-header {
  position: fixed;
  z-index: 9;
  top: 0;
  padding: 0;
  /* margin-bottom: 3em; */
  width: 100%;
  background: #281B35;
}
.el-main {
  background: #FAFAFA;
  padding: 0;
  margin-top: 4.3em;
  margin-bottom: 3em;
}
.goods {
  background: #fff;
  margin: .5em 0;
  /* margin-bottom: 3em; */
}
.store-name {
  padding: 1em 0;
  border-bottom: 1px solid #eee;
}
.goods-info {
  position: relative;
}
.checkbox {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.desc {
  padding: .5em 1em;
}
.el-checkbox-group {
  display: inline-block;
  text-align: center;
}
.goods-checkbox {
  position: absolute;
  top: 50%;
}
h3 {
  text-align: center;
  color: #fff;
}
.btn-edit {
  color: #fff;
  position: absolute;
  top: 50%;
  right: 1em;
  transform: translateY(-50%);
}
.el-footer {
  padding: 0;
  clear: both;
  position: fixed;
  z-index: 999;
  bottom: 0;
  width: 100%;
  height: 3em;
  background: #fff;
}
.submit {
  padding: 1em 0 1em .5em;
}
</style>
