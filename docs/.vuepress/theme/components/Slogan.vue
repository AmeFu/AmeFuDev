<template>
  <div class="slogan-wrap" id="large-header">
    <div class="inner-block">
      <h2 class="name">一言 Hitokoto</h2>
      <p class="intro">{{intro}}</p>
      <SearchBox class="search-box" v-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"/>
    </div>
    <Stars class="stars" />
  </div>
</template>
<script>
import SearchBox from '@theme/components/SearchBox'
import Stars from '@theme/components/bg/Stars'
const axios = require('axios')
export default {
  components: { SearchBox, Stars },
  data () {
    return {
      intro: '',
    }
  },
  mounted () {
    this.getHitikoto()
  },
  methods: {
    async getHitikoto () {
      try {
        const result = await axios.get(`https://v1.hitokoto.cn/`)
        this.intro = result.data.hitokoto
        if (result.data.from) {
          this.intro += ' —— ' + result.data.from
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.slogan-wrap
  position relative
  color #fff
  border-bottom 1px solid #eee
  padding 40px 0
  overflow hidden
  .stars {
    background radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)
  }
  .pointLine, .stars {
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    z-index: -1
  }
  .inner-block
    position relative
  .name
    font-size 2rem
    font-weight normal
    margin-bottom 10px
  .intro
    color rgba(255,255,255,0.65)
    max-width 500px
  .search-box
    position absolute
    top 10px
    right 0
@media (max-width: $MQMobile)
  .slogan-wrap
    .inner-block
      padding 20px 10px
    .search-box
      display: none;
</style>
