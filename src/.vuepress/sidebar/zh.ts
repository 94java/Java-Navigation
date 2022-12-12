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
});
