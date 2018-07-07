<template>
  <el-container>
    <el-header>
      <h3>我的购物车({{goodsData.length}})</h3>
      <a href="javascript:;" class="btn-edit">编辑</a>
    </el-header>
    <el-main>
      <el-row class="goods" v-for="(goods, key) in goodsData" :key="key">
        <el-col :span="24" class="store-name">
          <el-row>
            <el-col :span="12">
              <el-checkbox-group v-model="goods.goodsList">
                <el-checkbox></el-checkbox>
              </el-checkbox-group>
              <a href="javascript:;">{{goods.storeName}} ></a>
            </el-col>
            <el-col :span="6" :offset="6" style="text-align:right;padding-right:1em">
              <a href="javascript:;" class="get-coupon">领券</a>
              <i style="color: #eee;">|</i>
              <a href="javascript:;">编辑</a>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" class="goods-info">
          <el-col :span="8" class="pic">
            <el-checkbox-group v-model="goods.goodsList" class="checkbox">
              <el-checkbox></el-checkbox>
            </el-checkbox-group>
            <a href="javascript:;" style="margin-left:2em;width:100%;height:100%"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530945037524&di=914d7711636e8c7fb7cf8702372b02d6&imgtype=0&src=http%3A%2F%2Fimg14.360buyimg.com%2Fn4%2Fg7%2FM03%2F05%2F12%2FrBEHZlBJyNYIAAAAAAFJgkuWxI0AABFkgG4mrMAAUma420.jpg" alt=""></a>
          </el-col>
          <el-col :span="16" class="desc" style="padding-right:1em">
            <a href="javascript:;">
              <p>{{goods.description}}</p>
              <p>
                <span style="color: #f00">￥ {{goods.price}}</span>
                <span style="float: right">x {{goods.count}}</span>
              </p>
            </a>
          </el-col>
        </el-col>
      </el-row>
      <div class="my-submit">
        <el-row class="submit">
          <el-col :span="4">
            <el-checkbox-group>
              <el-checkbox>全选</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="20" style="text-align:right">
            <span>合计: <span style="color: #f00">￥998</span></span>
            <a href="javascript:;" style="height:100%;margin-left: 1em;padding: 1em 2em;border:1px solid #f00; background: orange; color:#fff">结算</a>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      goodsData: [{
        storeName: '杂七杂八批发生活',
        description: '双肩包男士背包男韩版潮旅行电脑男潮包PU时尚潮流皮休闲学生书包',
        price: 99.8,
        count: 1,
        goodsList: []
      }, {
        storeName: '杂七杂八批发生活',
        description: '双肩包男士背包男韩版潮旅行电脑男潮包PU时尚潮流皮休闲学生书包',
        price: 99.8,
        count: 1,
        goodsList: []
      }, {
        storeName: '杂七杂八批发生活',
        description: '双肩包男士背包男韩版潮旅行电脑男潮包PU时尚潮流皮休闲学生书包',
        price: 99.8,
        count: 1,
        goodsList: []
      }, {
        storeName: '杂七杂八批发生活',
        description: '双肩包男士背包男韩版潮旅行电脑男潮包PU时尚潮流皮休闲学生书包',
        price: 99.8,
        count: 1,
        goodsList: []
      }]
    }
  },
  computed: {},
  methods: {}
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
  width: 100%;
  padding: 0;
}
.el-header {
  position: relative;
  padding: 0;
  width: 100%;
  background: #281B35;
}
.el-main {
  background: #FAFAFA;
  padding: 0;
}
.goods {
  background: #fff;
  margin: .5em 0;
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
.el-checkbox {
  width: 1.5em;
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
.my-submit {
  position: fixed;
  bottom: 0;
  border-top: 1px solid #eee;
  width: 100%;
  background: #fff;
}
.submit {
  padding: 1em 0;
}
</style>
