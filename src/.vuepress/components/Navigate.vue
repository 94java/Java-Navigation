<template>

    <div class="navagate_container">

        <div class="nav_search_container">

            <div class="search_title">

                <a href="">搜索</a><input class="search" type="text" />

            </div>

        </div>

        <div class="nav_container">

            <div class="nav_item" v-for="nav in navList" :key="nav.title">

                <div class="nav_item_title">

                    <b>{{ nav.title }}</b>

                </div>

                <div class="nav_item_main">

                    <a class="nav_item_url" v-for="navItem in nav.arr" :key="navItem.id" :href="navItem.nav_url">

                        <div class="nav_item_text">{{ navItem.nav }}</div>

                    </a>

                </div>

            </div>

        </div>

    </div>

</template>

<script>

export default {

    name: "Navegate",

    data() {

        return {

            navList: [

                {

                    title: "动漫 | 漫画 | 兴趣",

                    arr: [

                        {

                            nav: "bilibili",

                            nav_url: "https://www.bilibili.com/",

                            id: "1",

                        },

                        {

                            nav: "风车动漫",

                            nav_url: "http://www.dmlaa.com",

                            id: "2",

                        },

                        {

                            nav: "OmoFun",

                            nav_url: "https://omofun.tv/",

                            id: "3",

                        },

                        {

                            nav: "Cupfox茶杯狐",

                            nav_url: "https://cupfox.app/",

                            id: "4",

                        },

                        {

                            nav: "5dm.one",

                            nav_url: "https://www.5dm.app/",

                            id: "5",

                        },

                        {

                            nav: "ACFun",

                            nav_url: "https://www.acfun.cn/",

                            id: "6",

                        },

                        {

                            nav: "搜漫",

                            nav_url: "https://www.soman.com/",

                            id: "7",

                        },

                    ],

                },

                {

                    title: "前端 | 文档",

                    arr: [

                        {

                            nav: "Vue文档",

                            nav_url: "https://cn.vuejs.org/",

                            id: "01",

                        },

                        {

                            nav: "React文档",

                            nav_url: "https://zh-hans.reactjs.org/",

                            id: "02",

                        },

                        {

                            nav: "MDN",

                            nav_url: "https://developer.mozilla.org/zh-CN/",

                            id: "03",

                        },

                        {

                            nav: "印记中文",

                            nav_url: "https://docschina.org/",

                            id: "04",

                        },

                        {

                            nav: "Koa Wiki",

                            nav_url: "https://github.com/koajs/koa/wiki",

                            id: "05",

                        },

                        {

                            nav: "Vue3 Wiki",

                            nav_url: "https://vue3js.cn/",

                            id: "06",

                        },

                        {

                            nav: "微信官方文档",

                            nav_url: "https://developers.weixin.qq.com/doc/",

                            id: "07",

                        },

                        {

                            nav: "Github中文排行榜",

                            nav_url:

                                "https://github.com/GrowingGit/GitHub-Chinese-Top-Charts",

                            id: "08",

                        },

                        {

                            nav: "前端学习路线",

                            nav_url: "https://objtube.github.io/front-end-roadmap/#/",

                            id: "09",

                        },

                    ],

                },

                {

                    title: "社区 | 托管代码",

                    arr: [

                        {

                            nav: "Github",

                            nav_url: "https://github.com/0Shino0",

                            id: "001",

                        },

                        {

                            nav: "Gitlab",

                            nav_url: "https://gitlab.com/0Shino0",

                            id: "002",

                        },

                        {

                            nav: "Npm",

                            nav_url: "https://www.npmjs.com/",

                            id: "003",

                        },

                        {

                            nav: "Gitee",

                            nav_url: "https://gitee.com/Shino00",

                            id: "004",

                        },

                        {

                            nav: "Coding",

                            nav_url: "https://coding.net/",

                            id: "005",

                        },

                        {

                            nav: "StackOverflow",

                            nav_url: "https://stackoverflow.com/users/19151371/yyshino",

                            id: "006",

                        },

                        {

                            nav: "segmentFault",

                            nav_url: "https://segmentfault.com/u/yyshino",

                            id: "007",

                        },

                        {

                            nav: "CSDN",

                            nav_url: "https://blog.csdn.net/qq_41095561?type=blog",

                            id: "008",

                        },

                        {

                            nav: "掘金社区",

                            nav_url: "https://juejin.cn/user/638180976492824",

                            id: "009",

                        },

                    ],

                },

                {

                    title: "工具 | Tools",

                    arr: [

                        {

                            nav: "Font Awesome",

                            nav_url: "https://fontawesome.com/icons",

                            id: "0001",

                        },

                        {

                            nav: "Vercel",

                            nav_url: "https://vercel.com/",

                            id: "0002",

                        },

                        {

                            nav: "BootCDN",

                            nav_url: "https://www.bootcdn.cn/",

                            id: "0003",

                        },

                        {

                            nav: "Fast Mock",

                            nav_url: "https://www.fastmock.site/#/",

                            id: "0004",

                        },

                        {

                            nav: "即时工具箱",

                            nav_url: "https://www.67tool.com/",

                            id: "0005",

                        },

                        {

                            nav: "学吧导航",

                            nav_url: "https://www.xue8nav.com/",

                            id: "0006",

                        },

                        {

                            nav: "animista动画库",

                            nav_url: "https://animista.net/",

                            id: "0007",

                        },

                        {

                            nav: "ProcessOn思维导图",

                            nav_url: "https://www.processon.com/",

                            id: "0008",

                        },

                        {

                            nav: "精准云工具",

                            nav_url: "https://jingzhunyun.com/",

                            id: "0009",

                        },

                    ],

                },

                {

                    title: "开源API | 白嫖",

                    arr: [

                        {

                            nav: "保罗Api",

                            nav_url: "https://api.paugram.com/help/netease",

                            id: "00001",

                        },

                        {

                            nav: "DogApi",

                            nav_url: "https://dog.ceo/dog-api/",

                            id: "00002",

                        },

                        {

                            nav: "CatApi",

                            nav_url: "https://thecatapi.com/",

                            id: "00003",

                        },

                        {

                            nav: "Random-data-api",

                            nav_url: "https://random-data-api.com/",

                            id: "00004",

                        },

                        {

                            nav: "Bilibili常用Api",

                            nav_url: "https://blog.csdn.net/zz_lkw/article/details/106856609",

                            id: "00005",

                        },

                        {

                            nav: "eduwork学习Api",

                            nav_url: "https://api.shop.eduwork.cn/index.html",

                            id: "00006",

                        },

                        {

                            nav: "网易云Api",

                            nav_url:

                                "https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi",

                            id: "00007",

                        },

                        {

                            nav: "zhihu Api",

                            nav_url: "https://github.com/TonnyL/Zhihu_Zhuanlan_APIs/wiki",

                            id: "00008",

                        },

                        {

                            nav: "新冠疫情Api",

                            nav_url: "https://www.cnblogs.com/Jerrycjc/p/15792807.html",

                            id: "00009",

                        },

                    ],

                },

                {

                    title: "后端 | 算法",

                    arr: [

                        {

                            nav: "LeetCode",

                            nav_url: "https://leetcode.cn/u/i3lissful-engelbartcwb/",

                            id: "000001",

                        },

                        {

                            nav: "前端算法",

                            nav_url: "https://www.yuque.com/morris-dlhjm/nnaevm",

                            id: "000002",

                        },

                        {

                            nav: "代码随想录",

                            nav_url: "https://programmercarl.com/",

                            id: "000003",

                        },

                        {

                            nav: "LABULADONG 的算法网站",

                            nav_url: "https://labuladong.gitee.io/algo/",

                            id: "000004",

                        },

                        {

                            nav: "Koa Wiki",

                            nav_url: "https://github.com/koajs/koa/wiki",

                            id: "000005",

                        },

                        {

                            nav: "Github Trend",

                            nav_url: "https://github.com/trending",

                            id: "000006",

                        },

                        {

                            nav: "Node.js Best Practices",

                            nav_url: "https://github.com/goldbergyoni/nodebestpractices",

                            id: "000007",

                        },

                    ],

                },

            ],

        };

    },

};

</script>

<style lang="stylus">

body {

  /*

  搜索框

  */

  .navagate_container {

    a {

      text-decoration: none;

    }

    .nav_search_container {

      width: 300px;

      margin: 50px auto;

      background-color: rgba(193, 167, 167, 0.589);

      border-radius: 20px;

      .search_title {

        a {

          display: inline-block;

          height: 34px;

          line-height: 30px;

          margin: 0 15px;

        }

        .search {

          width: 220px;

          height: 20px;

          padding: 10px;

          border: none;

          border-radius: 10px;

          text-decoration: none;

          background-color: rgba(233, 221, 221, 0);

          border-radius: 20px;

        }

        .search:focus {

          outline: none;

        }

      }

    }

    /*

    导航区

    */

    .nav_container {

      display: flex;

      flex-wrap: wrap;

      align-content: start;

      justify-content: center;

      align-content: flex-start;

      .nav_item {

        text-align: center;

        margin: 20px 40px;

        border-radius: 5px;

        .nav_item_title {

          margin: 10px;

        }

        .nav_item_main {

          padding: 20px;

          width: 300px;

          border-radius: 20px;

          display: grid;

          grid-template-columns: repeat(3, 1fr);

          gap: 5px;

          box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);

          .nav_item_url {

            text-decoration: none;

          }

          .nav_item_url:hover {

            -webkit-animation: nav_item_url 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

            animation: nav_item_url 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

          }

          @keyframes nav_item_url {

            0% {

              -webkit-transform: translateZ(0) translateY(0);

              transform: translateZ(0) translateY(0);

            }

            100% {

              -webkit-transform: translateZ(20px) translateY(-20px);

              transform: translateZ(20px) translateY(-20px);

            }

          }

          @keyframes nav_item_url {

            0% {

              -webkit-transform: translateZ(0) translateY(0);

              transform: translateZ(0) translateY(0);

            }

            100% {

              -webkit-transform: translateZ(20px) translateY(-20px);

              transform: translateZ(20px) translateY(-20px);

            }

          }

          /*

              CSS gap 属性是用来设置网格行与列之间的间隙（gutters），该属性是 row-gap 和 column-gap 的简写形式。

          */

          .nav_item_text {

            width: 96.662px;

            line-height: 90px;

            border-radius: 20px;

            // border: 1px solid #E7E7E7;

            box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);

            text-align: center;

            overflow: hidden;

            text-overflow: ellipsis;

            white-space: nowrap;

          }

        }

        .nav_item_main:hover {

          box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);

        }

      }

    }

  }

}

</style>
