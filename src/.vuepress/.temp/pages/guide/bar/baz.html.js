export const data = JSON.parse("{\"key\":\"v-177e1f06\",\"path\":\"/guide/bar/baz.html\",\"title\":\"Baz\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Baz\",\"icon\":\"info\",\"description\":\"功能详情...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/guide/bar/baz.html\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Baz\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"功能详情...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":9},\"autoDesc\":true,\"filePathRelative\":\"guide/bar/baz.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
