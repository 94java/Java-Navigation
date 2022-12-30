import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "导航", icon: "discover", link: "/md/quick_nav" },
  {
    text: "Java",
    icon: "java",
    prefix: "/md/java",
    children: [
      { text: "基础", link: "/basic" },
      {
        text: "容器",
        link: "/collection",
      },
      {
        text: "并发",
        link: "/concurrency",
      },
      {
        text: "IO",
        link: "/io",
      },
      {
        text: "JVM",
        link: "/jvm",
      },
      {
        text: "新特性",
        link: "/new",
      },
      {
        text: "JavaWEB",
        link: "/javaweb",
      },
    ]
  },
  {
    text: "计算机基础",
    icon: "study",
    prefix: "/md/common",
    children: [
      { text: "计算机网络", link: "/network" },
      { text: "计算机组成原理", link: "/composition" },
      { text: "操作系统", link: "/os" },
      { text: "数据结构", link: "/structure" },
      { text: "算法", link: "/algorithm" },
    ]
  },
  {
    text: "Spring",
    icon: "emmet",
    prefix: "/md/spring",
    children: [
      {
        text: "Spring",
        link: "/framework",
      },
      {
        text: "SpringMVC",
        link: "/mvc",
      },
      {
        text: "SpringBoot",
        link: "/boot",
      },
      {
        text: "SpringCloud",
        link: "/cloud",
      },
    ],
  },
  {
    text: "数据库",
    icon: "mysql",
    prefix: "/md/database",
    children: [
      {
        text: "基础知识",
        children: [
          {
            text: "数据库原理", link: "/base",
          },
          {
            text: "SQL语法", link: "/sql",
          },
        ]
      },
      {
        text: "SQL数据库",
        children: [
          {
            text: "MySQL", link: "/mysql",
          },
        ]
      },
      {
        text: "NoSQL数据库",
        children: [
          {
            text: "Redis", link: "/redis",
          },
          {
            text: "MongoDB", link: "/mongodb",
          },
          {
            text: "ElasticSearch", link: "/elasticsearch",
          },
        ]
      },
    ],
  },
  {
    text: "框架|中间件",
    icon: "repair",
    prefix: "/md/frame",
    children: [
      {
        text: "常用框架",
        children: [
          {
            text: "MyBatis", link: "/mybatis",
          },
          {
            text: "MyBatis-Plus", link: "/mybatis_plus",
          },
          {
            text: "Dubbo", link: "/dubbo",
          },
        ]
      },
      {
        text: "中间件",
        children: [
          {
            text: "Zookeeper", link: "/zookeeper",
          },
          {
            text: "RabbitMQ", link: "/rabbitmq",
          },
        ]
      },
    ],
  },

  {
    text: "工具|部署",
    icon: "relation",
    prefix: "/md/tool",
    children: [
      {
        text: "部署",
        children: [
          {
            text: "Linux",
            link: "/linux",
          },
          {
            text: "Docker",
            link: "/docker",
          },
        ]
      },
      {
        text: "工具",
        children: [
          {
            text: "Maven",
            link: "/maven",
          },
          {
            text: "Git",
            link: "/git",
          },
        ]
      },
      {
        text: "Web 容器",
        children: [
          {
            text: "Tomcat", link: "/tomcat",
          },
          {
            text: "Nginx", link: "/nginx",
          },
        ]
      }
    ],
  },
  {
    text: "前端",
    icon: "leaf",
    prefix: "/md/front/",
    children: [
      { text: "HTML/CSS", link: "html" },
      { text: "移动端开发", link: "mobile" },
      { text: "JavaScript", link: "js" },
      { text: "jQuery", link: "jq" },
      { text: "Ajax", link: "ajax" },
      { text: "ES6", link: "es6" },
      { text: "Node.js", link: "node" },
      { text: "Vue", link: "vue" },
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
