<template>
  <div :class="$style.index">
    <carousel :carouselList="carouselList" />
    <div :class="$style.container">
      <el-row :gutter="20">
        <el-col :span="17">
          <el-card shadow="never">
            <h3 :class="$style['topics-title']">相关话题</h3>
            <topics :topicsList="topicsList" />
          </el-card>
          <el-card
            :class="$style['card-block']"
            v-for="item in periodicalList"
            :key="item._id"
            shadow="never"
          >
            <block :periodicalData="item" />
          </el-card>
          <more @more="more()" />
        </el-col>
        <el-col :span="7">
          <side
            :popularList="popularList"
            :advertisementData="advertisementData"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import carousel from '~/components/carousel'
import topics from '~/components/common/topics'
import block from '~/components/periodical/block'
import side from '~/components/periodical/side/index'
import more from '~/components/button/more'

export default {
  components: {
    carousel,
    topics,
    block,
    side,
    more
  },
  data() {
    return {
      page: 2,
      isLoading: false
    }
  },
  async asyncData(ctx) {
    const carouselListRes = await ctx.$axios({
      method: 'get',
      url: '/api/carousel',
      params: {
        page: 1,
        per_page: 5
      }
    })
    const periodicalListRes = await ctx.$axios({
      method: 'get',
      url: '/api/periodical',
      params: {
        page: 1,
        per_page: 5
      }
    })
    const topicsListRes = await ctx.$axios({
      method: 'get',
      url: '/api/topics',
      params: {
        page: 1,
        per_page: 18,
        popular: true
      }
    })
    const popularListRes = await ctx.$axios({
      method: 'get',
      url: '/api/periodical',
      params: {
        page: 1,
        per_page: 5,
        popular: true
      }
    })
    const advertisementListRes = await ctx.$axios({
      method: 'get',
      url: '/api/advertisement',
      params: {
        page: 1,
        per_page: 1
      }
    })
    return {
      periodicalList: periodicalListRes.data,
      carouselList: carouselListRes.data,
      topicsList: topicsListRes.data,
      popularList: popularListRes.data,
      advertisementData: advertisementListRes.data[0]
    }
  },
  methods: {
    async more() {
      if (this.isLoading === false) {
        this.isLoading = true
        const res = await this.$axios({
          method: 'get',
          url: '/api/periodical',
          params: {
            page: this.page,
            per_page: 5
          }
        })
        this.page = this.page + 1
        if (res.data.length) {
          if (res.data.length === 5) {
            this.isLoading = false
          }
          this.periodicalList = this.periodicalList.concat(res.data)
        } else {
          this.$message('没有啦，明天上新，欢迎再来！')
        }
      } else {
        this.$message('没有啦，明天上新，欢迎再来！')
      }
    }
  },
  head() {
    return {
      title: '首页'
    }
  }
}
</script>

<style lang="scss" module>
.index {
  .container {
    width: 1024px;
    margin: 0 auto;
    padding: 26px 0;
    .topics-title {
      margin-top: 0;
    }
    .card-block {
      margin-top: 20px;
    }
  }
}
</style>
