const { searchPlugin } = require('@vuepress/plugin-search')
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
            children: ['/SQA/CI&CD/JenkinsLSN.md', '/SQA/CI&CD/CQMLSN.md'],
          },
          {
            text: 'CI&CD',
            children: ['/group/sub/foo.md', '/group/sub/bar.md'],
          },
        ],
      },
      {
        text: '中台产品研究',
        children: [
          {
            text: 'SubGroup',
            children: ['/group/sub/foo.md', '/group/sub/bar.md'],
          },
        ],
      },
      {
        text: '工具箱',
        children: ['/group/foo.md', '/group/bar.md'],
      },
    ],
  }),
  plugins: [
    ['mermaidjs', { gantt: { barHeight: 40 } }],
    searchPlugin({
      // 配置项
    }),
  ],
}
