import { isArray } from '../util'

const install = (Vue, { pages }) => {
  let tagsMap = {}
  let categorysMap = {}
  let top = []
  const posts = pages.filter(item => {
    if (item.frontmatter.description === undefined) {
      return false
    }
    return item.path.indexOf('/note/') > -1
  })
  .sort((item1, item2) => {
      return new Date(item2.lastUpdated).getTime() - new Date(item1.lastUpdated).getTime()
  })
  .map((item, index)=> {
    if (typeof(item.frontmatter.categorys) == "string") {
      item.frontmatter.categorys = item.frontmatter.categorys.split(',')
    }
    if (typeof(item.frontmatter.tags) == "string") {
      item.frontmatter.tags = item.frontmatter.tags.split(',')
    }
    item.index = index
    return item
  })

  posts.forEach(item => {
    if (item.frontmatter.top !== undefined) {
      top.push(item)
    }

    let categorys = item.frontmatter.categorys
    if (!categorys) {
      categorys = []
    }
    categorys.forEach(cate => {
      if (!categorysMap[cate]) {
        categorysMap[cate] = [item]
      } else {
        categorysMap[cate].push(item)
      }
    })

    let tags = item.frontmatter.tags
    if (tags) {
      if (!isArray(tags)) {
        tags = [tags]
      }
    } else {
      tags = []
    }
    tags.forEach(tag => {
      if (!tagsMap[tag]) {
        tagsMap[tag] = [item]
      } else {
        tagsMap[tag].push(item)
      }
    })
  })

  Vue.mixin({
    computed: {
      $tops () {
        return top.sort((item1, item2) => item2.frontmatter.top - item1.frontmatter.top)
      },
      $posts () {
        return posts
      },
      $tags () {
        return tagsMap
      },
      $categorys () {
        return categorysMap
      }
    }
  })
}

export default { install }
