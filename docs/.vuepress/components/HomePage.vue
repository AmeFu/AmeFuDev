<template>
    <div class="fullScreen">
        <div class="enter-wrap">
            <span class="img-wrap">
                <img src="https://unsplash.it/200/200" alt="">
                <!--<img src="http://placeimg.com/200/200/any" alt="">-->
            </span>
            <p class="HitoKoto">
                <span class="text">{{hitokoto}}{{from}}</span>
                <span class="change" @click="getHitoKoto" title="Hitokoto-一言">换一换</span>
            </p>
            <a href="./note">
                <button class="enter">进入</button>
            </a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
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
            console.log(res)
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
    *::selection {
        background #3eaf7c
        color #fff
    }
    *::-moz-selection {
        background #3eaf7c
        color #fff
    }
    .fullScreen {
        background #fff url("https://acg.toubiec.cn/random.php") no-repeat center
        background-size cover
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
            background rgba(255, 255, 255, .5)
            padding .5rem
            padding-top 1.35rem
            margin 4rem
            border-radius 0.625rem
            .text {

            }
            .change {
                border-radius 0.625rem
                box-sizing border-box
                position absolute
                left 0
                top 0
                width 100%
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
        button {
            position: relative;
            background: transparent;
            border-color: transparent;
            width: 100px;
            height: 50px;
            color: #3eaf7c;
            font-size: 40px;
            text-align: center;
            margin: 100px auto;
            border-bottom: 2px solid #3eaf7c;
            cursor: pointer;
            text-shadow: 0 0 5px #fff;
            outline: none;

            &::before
            &::after {
                position: absolute;
                content: "";
                left: 50%;
            }

            &::before {
                width: 5px;
                height: 30px;
                background: #3eaf7c;
                bottom: 50px;
                transform: translateX(-50%);
                animation: jump1 1s linear infinite;
            }
            &::after {
                width: 15px;
                height: 15px;
                border-bottom: 5px solid #3eaf7c;
                border-right: 5px solid #3eaf7c;
                bottom: 40px;
                transform: rotate(45deg) translateX(calc(-50% - 4px));
                animation: jump2 1s linear infinite;
            }

            &:hover {
                transform: skewY(5deg);
                &::before,
                &::after {
                    position: absolute;
                    content: "";
                    width: 4px;
                    height: 6px;
                    border: none;
                    border-radius: 50%;
                    background: #3eaf7c;
                    bottom : -6px;
                    left: 0;
                    transform: translate(0, 0);
                }
                &::before {
                    animation: move 5.5s ease-in-out infinite;
                }

                &::after {
                    animation: move 5.5s ease-in-out 1s infinite;
                }
            }
        }

        @keyframes jump1 {
            0% {
                bottom: 50px;
            }
            50% {
                bottom: 60px;
            }
            100% {
                bottom: 50px;
            }
        }

        @keyframes jump2 {
            0% {
                bottom: 40px;
            }
            50% {
                bottom: 50px;
            }
            100% {
                bottom: 40px;
            }
        }

        @keyframes move {
            80% {
                height: 8px;
                bottom : -10px;
                transform: translate(95px, 0px);
            }
            93% {
                transform: translate(95px, 3px);
                opacity: 1;
            }
            100% {
                transform: translate(95px, 15px);
                opacity: 0;
            }
        }
    }
</style>
