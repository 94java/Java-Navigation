import { defineUserConfig } from "vuepress";
import theme from "./theme.js";


export default defineUserConfig({

  base: "/",

  locales: {
    "/": {
      // 设置正在使用的语言
      lang: "zh-CN",
      title: "Java-Navigation",
      description: "页面描述",
    },
  },

  theme,


  shouldPrefetch: false,

});
