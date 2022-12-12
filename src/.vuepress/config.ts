import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({

  base: "/java-navigation/",

  locales: {
    "/": {
      // 设置正在使用的语言
      lang: "zh-CN",
      title: "Java-Navigation",
      description: "从自学角度出发，记录自学所得，并不断完善、更新。包含：Java基础知识体系、web开发用到的前端知识以及常用的各种框架和中间件，涵盖计算机基础、数据库、部署工具以及代码风格和规范的全栈知识体系（含面试和实战项目推荐）",
    },
  },

  theme,

  plugins: [
    // 注册全局组件的插件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],
  shouldPrefetch: false,

});
