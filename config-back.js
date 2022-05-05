const { searchPlugin } = require('@vuepress/plugin-search')
const { defaultTheme } = require('vuepress')
const { mdEnhance } = require('vuepress-plugin-md-enhance')
const { chokidar } = require('chokidar')
const { logger, path } from '@vuepress/utils'

// const { webpackBundler } = require('@vuepress/bundler-webpack')

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
        children: ['/tools/erd.md', '/group/bar.md'],
      },
    ],
  }),
  // bundler: webpackBundler({
  //   configureWebpack: (config, isServer) => {
  //     if (!isServer) {
  //       config.watch = false
  //       config.watchOptions.ignored = /.*/
  //     }
  //   },
  // }),
  plugins: [
    searchPlugin({}),
    mdEnhance({
      enableAll: true,
    }),
  ],
  onWatched: (_, watchers, restart) => {
    const confWatcher = chokidar.watch(
      ['./configuration/**/*.ts', '../en/**/*.md', '../zh/**/*.md'],
      {
        cwd: __dirname,
        ignoreInitial: true,
      }
    )
    confWatcher.on('change', async (file) => {
      logger.info(`file ${file} is modified`)
      await restart()
    })

    watchers.push(confWatcher)
  },
}
