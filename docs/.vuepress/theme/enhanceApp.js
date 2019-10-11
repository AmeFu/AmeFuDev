import routes from './enhance/routes'
import mixin from './enhance/mixin'
import optionHandler from './enhance/optionHandle'
import filter from './enhance/filter.js'

// import getGitalk from "../common/getGitalk"
// import copy from '../common/copy'

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData // 站点元数据
  }) => {
    const { themeConfig, pages } = siteData
    Vue.use(mixin, { pages })
    Vue.use(optionHandler, { themeConfig })
    Vue.use(routes, { router, themeConfig })
    Vue.use(filter)
    // setTimeout(() => {
    //   try {
    //     document && (() => { //对document的判断是防止编译的时候报错
    //       getGitalk.call(this, siteData)
    //       copy()
    //     })()
    //   } catch (e) {
    //     console.error(e)
    //   }
    // },500)
}
