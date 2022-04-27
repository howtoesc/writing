const { defaultTheme } = require('vuepress')

module.exports = {
  theme: defaultTheme({
    repo: 'howtoesc/writing',
    repoLabel: 'Repo',
    sidebarDepth: 5,
    logo: '/images/logo.png',
    navbar: [
      {
        text: '软件质量控制',
        children: [
          {
            text: 'ALM平台',
            children: [
              '/SQA/ALM/GitLabStudyNotes.md',
              '/SQA/ALM/ZenDaoStudyNotes.md',
            ],
          },
          {
            text: 'CI&CD',
            children: ['/group/sub/foo.md', '/group/sub/bar.md'],
          },
        ],
      },
      {
        text: 'B端产品研究',
        children: [
          {
            text: 'SubGroup',
            children: ['/group/sub/foo.md', '/group/sub/bar.md'],
          },
        ],
      },
      // NavbarItem
      {
        text: 'Foo',
        link: '/foo/',
      },
      // NavbarGroup
      {
        text: 'Group',
        children: ['/group/foo.md', '/group/bar.md'],
      },
      // 字符串 - 页面文件路径
      '/bar/README.md',
    ],
  }),
  plugins: ['vuepress-plugin-mermaidjs', 'mermaidjs'],
}
