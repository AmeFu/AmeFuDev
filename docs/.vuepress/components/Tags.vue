<template>
    <div class="tags">
        <h6>标签云</h6>
        <span v-for="item in tags" @click="handleChangeTag(item)">{{item}}</span>
        <span @click="handleChangeTag('all')">所有</span>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tags: []
      }
    },
    created() {
      console.log('tags', this.$site.pages)
      const tags = this.$site.pages.map(item => {
        return item.frontmatter && item.frontmatter.tags || ""
      })
      const tagsArr = tags.join(",").split(",").filter(i => i !== "")
      this.tags = [...new Set(tagsArr)]
    },
    methods: {
      // 点击标签更改列表
      handleChangeTag(tag) {
        this.$emit('change-tag',tag)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .tags {
        background rgba(255, 255, 255, .5)
        padding 10px
        box-sizing border-box
        &>h6 {
            margin: 0 0 10px;
            font-size: 16px;
        }
        &>span {
            cursor: pointer;
            display: inline-block;
            font-size: 13px;
            padding: 4px 10px;
            border-radius: 8px;
            margin: 0 8px 8px 0;
            background-color: #f9f9f9;
            color: #bbb;
        }
    }
</style>