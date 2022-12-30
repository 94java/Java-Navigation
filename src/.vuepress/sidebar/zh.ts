import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/md/java/": [
    {
      text: "Java",
      icon: "guide",
      collapsible: true,
      children: "structure"
    }
  ],
  "/md/spring/": [
    {
      text: "Spring",
      icon: "guide",
      collapsible: true,
      children: "structure"
    }
  ],
  "/md/database/": [
    {
      text: "数据库",
      icon: "guide",
      collapsible: true,
      children: "structure"
    }
  ],
  "/md/frame/": [
    {
      text: "框架 | 中间件",
      icon: "guide",
      collapsible: true,
      children: "structure"
    }
  ],
  "/md/tool/": [
    {
      text: "工具 | 部署",
      icon: "guide",
      collapsible: true,
      children: "structure"
    }
  ],
  "/md/front/": [
    {
      text: "前端",
      icon: "guide",
      collapsible: true,
      children: "structure"
    }
  ],
  "/md/common/": [
    {
      text: "计算机基础",
      icon: "guide",
      collapsible: true,
      children: "structure"
    }
  ],
});
