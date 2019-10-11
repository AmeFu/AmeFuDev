<template>
  <div class="category-wrap"  v-if="$categorys">
    <h4>文章分类</h4>
    <ul>
      <li v-for="_,key in $categorys" :key="key">
        <router-link class="category-item" :to="{ path: '/category/' + key }">
          <span class="category-text">{{key}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
.category-wrap
  h4
    font-size 1.2rem
    display inline-block
    padding-bottom 1px
    border-bottom 2px solid $accentColor
  ul
    padding 10px 0
    li
      cursor pointer
      display inline-block
      font-size 13px
      padding 4px 10px
      border-radius 8px
      margin 0 8px 8px 0
      background-color #f9f9f9
      color $accentColor
</style>
