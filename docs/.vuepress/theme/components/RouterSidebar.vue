<template>
    <div>
        
    </div>
</template>

<script>
import { resolveSidebarItems } from '../util'
export default {
    data () {
        return {}
    },
    computed: {
        sidebarItems () {
            return resolveSidebarItems(
                this.$page,
                this.$page.regularPath,
                this.$site,
                this.$localePath
            )
        }
    },
    mounted() {
        // console.log(this.$page)
        // console.log(this.sidebarItems)
    }
}
</script>

<style lang="stylus" scoped>
    
</style>