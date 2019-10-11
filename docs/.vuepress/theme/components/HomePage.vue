<template>
    <div class="fullScreen homePage">
        <ColofulTouch class="colofulTouch" />
        <div class="enter-wrap">
            <span class="img-wrap">
                <img src="https://unsplash.it/200/200" alt="">
                <!--<img src="http://placeimg.com/200/200/any" alt="">-->
            </span>
            <p class="HitoKoto">
                <span class="text">{{hitokoto}}{{from}}</span>
                <span class="change" @click="getHitoKoto" title="Hitokoto-一言">换一换</span>
            </p>
            <a href="./note" class="enter">进入</a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import ColofulTouch from '@theme/components/bg/ColorfulTouch'
  export default {
    components: { ColofulTouch },
    data() {
      return {
        loading: true,
        count: 0,
        homeImgList: [],
        imgList: ['/img/hn.gif', '/img/hn-1.gif', '/img/hn-2.gif', '/img/hn-3.gif', '/img/hn-4.gif', '/img/hn-5.gif', '/img/10.gif', '/img/10-1.gif'],
        hitokoto: '',
        from: ''
      }
    },
    created() {
    },
    mounted() {
      this.getHitoKoto()
      // this.getBg()
    },
    methods: {
      getHitoKoto() {
        axios.get('https://v1.hitokoto.cn/').then((res) => {
            this.hitokoto = res.data.hitokoto
            this.from = res.data && res.data.from ? ' —— ' + res.data.from : ''
        })
      },
      getBg() {
        axios.get('https://acg.toubiec.cn/random?return=json').then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .colofulTouch {
        position fixed
        top 0
        left 0
        width 100%
        height 100%
    }
    .homePage {
        color rgba(255,255,255,0.65)
        background-color $bgDark
        background-image url("/img/star-bg.svg"),linear-gradient(#191c20, #24292e 15%)
        background-repeat repeat-x
        background-position center 0, 0 0, 0 0
        background-size cover
    }
    *::selection {
        background #3eaf7c
        color #fff
    }
    *::-moz-selection {
        background #3eaf7c
        color #fff
    }
    .fullScreen {
        // background #fff url("https://acg.toubiec.cn/random.php") no-repeat center
        // background-size cover
        width 100vw
        height: 100vh
        position fixed
        top 0
        left 0
        margin 0!important
    }
    @-webkit-keyframes radar {
        to {
            -webkit-transform scale(2.5)
            transform scale(2.5)
            box-shadow inset 0 0 0 1px hsla(0,0%,100%,0)
        }
    }
    @keyframes radar {
        to {
            -webkit-transform scale(2.5)
            transform scale(2.5)
            box-shadow inset 0 0 0 1px hsla(0,0%,100%,0)
        }
    }
    .enter-wrap {
        text-align center
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        z-index 10
        .HitoKoto {
            position relative
            padding .5rem
            padding-top 1.35rem
            margin 4rem
            border-radius 0.625rem
            .text {
                color #fff
            }
            .change {
                border-radius 0.625rem
                box-sizing border-box
                position absolute
                left 0
                top 0
                width 100%
                min-width 1rem
                font-size 0.75rem
                height 0.75rem
                line-height 0.75rem
                background $accentColor
                color #fff
                text-align center
                cursor pointer
            }
        }
        .img-wrap {
            background-blend-mode screen
            display inline-block
            position relative
            &:before, &:after {
                z-index -1
                content ""
                box-sizing border-box
                position absolute
                left 0
                top 0
                width 100%
                height 100%
                box-shadow inset 0 0 0 1px hsla(0,0%,100%,.2)
                border-radius 50%
                -webkit-animation: radar 4s linear infinite
                animation radar 4s linear infinite
              }
            &:before {
                -webkit-animation-delay -2s
                animation-delay -2s
            }
            img {
                width 8rem
                height 8rem
                border-radius 50%
                object-fit cover
            }
        }
        .enter {
            font-size 24px
        }
    }
</style>
