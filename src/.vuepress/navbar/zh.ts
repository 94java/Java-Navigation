import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "导航", icon: "discover", link: "/" },
  {
    text: "Java",
    icon: "java",
    prefix: "/md/java",
    children: [
      {
        text: "基础",
        link: "/basic",
        activeMatch: "^/java/basic",
      },
      {
        text: "容器",
        link: "/collection",
        activeMatch: "^/java/collection"
      },
      {
        text: "并发",
        link: "/concurrency",
        activeMatch: "^/java/concurrency"
      },
      {
        text: "IO",
        link: "/io",
        activeMatch: "^/java/io"
      },
      {
        text: "JVM",
        link: "/jvm",
        activeMatch: "^/java/jvm"
      },
      {
        text: "新特性",
        link: "/new",
        activeMatch: "^/java/new"
      },
    ]
  },
  {
    text: "计算机基础",
    icon: "study",
    prefix: "/common/",
    children: [
      { text: "计算机网络", link: "/network", activeMatch: "^/java/network" },
      { text: "计算机组成原理", link: "/composition", activeMatch: "^/java/composition" },
      { text: "操作系统", link: "/os", activeMatch: "^/java/os" },
      { text: "数据结构", link: "/structure", activeMatch: "^/java/structure" },
      { text: "算法", link: "/algorithm", activeMatch: "^/java/algorithm" },
    ]
  },
  {
    text: "Spring",
    icon: "emmet",
    prefix: "/spring/",
    children: [
      {
        text: "SpringFramework",
        link: "/framework",
        activeMatch: "^/java/framework",
      },
      {
        text: "SpringMVC",
        link: "/network",
        activeMatch: "^/java/network",
      },
      {
        text: "SpringBoot",
        link: "/network",
        activeMatch: "^/java/network",
      },
    ],
  },
  {
    text: "数据库",
    icon: "mysql",
    prefix: "/zh/guide/",
    children: [
      {
        text: "基础知识",
        children: [
          {
            text: "数据库原理", link: "/",
          },
          {
            text: "SQL语法", link: "/",
          },
        ]
      },
      {
        text: "SQL数据库",
        children: [
          {
            text: "MySQL", link: "/",
          },
        ]
      },
      {
        text: "NoSQL数据库",
        children: [
          {
            text: "Redis", link: "/",
          },
          {
            text: "MongoDB", link: "/",
          },
          {
            text: "ElasticSearch", link: "/",
          },
        ]
      },
    ],
  },
  {
    text: "框架|中间件",
    icon: "repair",
    prefix: "/zh/guide/",
    children: [
      {
        text: "常用框架",
        children: [
          {
            text: "MyBatis", link: "/",
          },
          {
            text: "MyBatis-Plus", link: "/",
          },
          {
            text: "Dubbo", link: "/",
          },
        ]
      },
      {
        text: "中间件",
        children: [
          {
            text: "Zookeeper", link: "/",
          },
          {
            text: "RabbitMQ", link: "/",
          },
        ]
      },
    ],
  },

  {
    text: "工具|部署",
    icon: "relation",
    prefix: "/zh/guide/",
    children: [
      {
        text: "部署",
        children: [
          {
            text: "Linux",
            link: "/",
          },
          {
            text: "Docker",
            link: "/",
          },
        ]
      },
      {
        text: "工具",
        children: [
          {
            text: "Maven",
            link: "/",
          },
          {
            text: "Git",
            link: "/",
          },
        ]
      },
      {
        text: "Web 容器",
        children: [
          {
            text: "Tomcat", link: "/",
          },
          {
            text: "Nginx", link: "/",
          },
        ]
      }
    ],
  },
  {
    text: "前端",
    icon: "leaf",
    prefix: "/zh/guide/",
    children: [
      { text: "...", link: "/" },
    ],
  },
  {
    text: "架构",
    icon: "material",
    prefix: "/zh/guide/",
    children: [
      { text: "...", link: "/" },
    ],
  },
  {
    text: "风格|规范",
    icon: "note",
    prefix: "/zh/guide/",
    children: [
      { text: "...", link: "/" },
    ],
  },
  {
    text: "面试",
    link: "/zh/guide/README.md",
    icon: "editor",
    // 仅在 `/zh/guide/` 激活
    activeMatch: "^/zh/guide/$",
  },
  {
    text: "项目",
    link: "/zh/guide/README.md",
    icon: "creative",
    // 仅在 `/zh/guide/` 激活
    activeMatch: "^/zh/guide/$",
  },
]);
