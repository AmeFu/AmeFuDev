const CategoryLayout = () => import('@theme/layouts/CategoryLayout')
const TagLayout = () => import('@theme/layouts/TagLayout')

const CATEGORYPATH = '/category/'
const TAGPATH = '/tag/'

const install = (Vue, { router }) => {
  let routes = []
  routes.push({
    path: `${CATEGORYPATH}:category?`,
    component: CategoryLayout,
    meta: { tag: true }
  },{
    path: `${TAGPATH}:tag?`,
    component: TagLayout,
    meta: { tag: true }
  })
  router.addRoutes(routes)
}

export default { install }
