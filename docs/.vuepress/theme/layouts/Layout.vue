<template>
  <div class="theme-container" :class="pageClasses">
    <Caidai />
    <Navbar v-if="!$page.frontmatter.home" @toggle-menu="toggleMenu" />
    <Slogan v-if="!$page.frontmatter.home" />
    <div class="content-wrap">
      <div class="inner-block">
        <div class="left-side">
          <Home v-if="$page.frontmatter.home"/>
          <Note v-else-if="$page.frontmatter.note"/>
          <Page v-else>
            <slot name="page-top" slot="top"/>
            <slot name="page-bottom" slot="bottom"/>
          </Page>
        </div>
        <aside class="right-side" v-if="!$page.frontmatter.home && !$page.frontmatter.intro && (Object.keys($categorys).length > 0 || Object.keys($tags).length > 0)">
          <Category v-if="Object.keys($categorys).length > 0" />
          <Tag v-if="Object.keys($tags).length > 0" />
          <Tree />
          <RouterSidebar />
        </aside>
      </div>
    </div>
    <Footerbar v-if="!$page.frontmatter.home" />
  </div>
</template>

<script>
import Home from '@theme/components/HomePage.vue'
import Note from '@theme/components/NoteList.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Footerbar from '@theme/components/Footerbar.vue'
import Category from '@theme/components/Category.vue'
import Tag from '@theme/components/Tag.vue'
import RouterSidebar from '@theme/components/RouterSidebar.vue'
import Slogan from '@theme/components/Slogan.vue'
import Caidai from '@theme/components/bg/Caidai.vue'
import Tree from '@theme/components/bg/Tree.vue'

export default {
  components: { Home, Note, Page, Navbar, Footerbar, Category, Tag, RouterSidebar, Slogan, Caidai, Tree },
  data () {
    return {
      isMenuOpen: false
    }
  },
  computed: {
    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'menu-open': this.isMenuOpen
        },
        userPageClass
      ]
    }
  },
  mounted () {
    this.$router.afterEach(() => {
      this.isMenuOpen = false
    })
  },
  methods: {
    toggleMenu (to) {
      this.isMenuOpen = typeof to === 'boolean' ? to : !this.isMenuOpen
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styles/config.styl'

.theme-container
  position relative
  padding-top 31px
  padding-bottom 50px
  min-height 100vh
  .particle, .MouseFollow 
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    opacity .4
    z-index -1
  .content-wrap
    .inner-block
      position relative
      display flex
      padding-top 20px
      justify-content space-between
      .left-side
        width $contentWidth
      .right-side
        width $themeContainerWidth - $contentWidth - 100px

@media (max-width: $MQMobile)
  .theme-container
    .content-wrap
      .inner-block
        padding: 20px 10px 0
        .left-side
          width: 100%;
        .right-side
          display: none
</style>

<style src="prismjs/themes/prism-tomorrow.css"></style>
