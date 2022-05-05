import { searchPlugin } from '@vuepress/plugin-search'
import { defaultTheme } from 'vuepress'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'

export default {
  pagePatterns: [
    '**/*.md',
    '!**/.~*.md',
    '!.vuepress',
    '!**/node_modules',
    '!node_modules',
  ],

  theme: defaultTheme({
    // const { webpackBundler } = require('@vuepress/bundler-webpack')
    lang: 'zh-CN',
    repo: 'howtoesc/writing',
    repoLabel: 'Repo',
    sidebarDepth: 5,
    logo: '/images/logo2.png',
    navbar: [
      {
        text: '软件质量控制',
        children: [
          {
            text: '理论研究',
            children: ['/SQA/SE/seThinking.md'],
          },
          {
            text: 'ALM平台',
            children: [
              '/SQA/ALM/GitLabStudyNotes.md',
              '/SQA/ALM/ZenDaoStudyNotes.md',
              '/SQA/ALM/RedmineStudy.md',
            ],
          },
          {
            text: 'CI&CD',
            children: ['/SQA/CI&CD/JenkinsLSN.md', '/SQA/CI&CD/CQMLSN.md'],
          },
        ],
      },
      {
        text: '中台产品研究',
        children: [
          {
            text: '后端界面',
            children: ['/ZT/interface.md', '/ZT/push.md'],
          },
        ],
      },
      {
        text: '工具箱',
        children: [
          {
            text: '各种小工具',
            children: [
               '/tools/dev/dockerTips.md',
            ],
          },
          {
            text: '个人兴趣',
            children: [
                '/tools/interesting/myDesktop0.md',
                '/tools/interesting/erd.md'
            ],
          },
        ],
      },
    ],
  }),
  plugins: [
    searchPlugin({}),
    mdEnhancePlugin({
      // 启用 mermaid
      mermaid: true,
    }),
  ],
}
