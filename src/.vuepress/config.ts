import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "@vuepress/utils";
import theme from "./theme.js";
const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      // 设置正在使用的语言
      lang: "zh-CN",
      title: "Java-Navigation",
      description: "从自学角度出发，记录自学所得，并不断完善、更新。包含：Java基础知识体系、web开发用到的前端知识以及常用的各种框架和中间件，涵盖计算机基础、数据库、部署工具以及代码风格和规范的全栈知识体系（含面试和实战项目推荐）",
    },
  },
  plugins: [
    // 注册全局组件的插件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
    // 搜索插件
    // searchPlugin({
    //   // https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
    //   // 排除首页
    //   isSearchable: (page) => page.path !== "/",
    //   maxSuggestions: 10,
    //   hotKeys: ["s", "/"],
    //   // 用于在页面的搜索索引中添加额外字段
    //   getExtraFields: () => [],
    //   locales: {
    //     "/": {
    //       placeholder: "搜索",
    //     },
    //   },
    // }),
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
    }),
  ],
  theme,

  shouldPrefetch: false,

});
