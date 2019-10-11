<template>
  <div id="footer">
    <p>
      <span class="copyright">© copyright</span>
      |
      <NavLink v-for="item in links" class="friend-link" :item="item" :key="item.link" />
    </p>
  </div>
</template>
<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: "footerbar",
  components: { NavLink },
  data: () => ({
    links: [
      {
        text: 'Github',
        link: 'https://github.com/AmeFu'
      }
    ]
  })
}
</script>
<style lang="stylus">
#footer
  padding 15px
  font-size 13px
  text-align center
  position absolute
  bottom 0
  width 100%
  .friend-link
    margin-left 8px
    border-bottom: 1px dashed $borderColor
</style>
