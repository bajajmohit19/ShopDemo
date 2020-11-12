const CracoAntDesignPlugin = require('craco-antd')
const slash = require('slash2')
const WebpackBar = require('webpackbar')


module.exports = {
  babel: {
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          // https://babeljs.io/blog/2018/09/17/decorators
          // https://github.com/mobxjs/mobx/issues/1352
          legacy: true
        }
      ]
    ]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            '@primary-color': 'blue',
            '@font-size-base': '13px',
            '@menu-inline-toplevel-item-height': '40px',
            '@menu-item-height': '25px',
            '@table-padding-vertical': '10px',
            '@card-head-padding': '10px',
            '@card-inner-head-padding': '10px',
            '@card-padding-base': '18px',
            '@layout-header-height': '48px',
            '@page-header-padding-vertical': '10px',
            '@line-height-base': '1.2',
            '@padding-lg': '18px',
            '@padding-md': '12px',
            '@padding-sm': '8px',
            '@padding-xs': '5px',
            // '@form-item-margin-bottom': '12px'
            
            },
          // strictMath: true,
          // noIeCompat: true,
          javascriptEnabled: true
        },
        cssLoaderOptions: {
          modules: true,
          // localIdentName: '[local]',
          getLocalIdent: (context, localIdentName, localName) => {
            if (
              context.resourcePath.includes('node_modules') ||
              context.resourcePath.includes('ant.design.pro.less') ||
              context.resourcePath.includes('global.less')
            ) {
              return localName
            }
            const match = context.resourcePath.match(/src(.*)/)
            if (match && match[1]) {
              const antdProPath = match[1].replace('.less', '')
              const arr = slash(antdProPath)
                .split('/')
                .map(a => a.replace(/([A-Z])/g, '-$1'))
                .map(a => a.toLowerCase())
              return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-')
            }
            return localName
          }
        }
      }
    }
  ],
  webpack: {
    configure: {
      plugins: [
        new WebpackBar({ profile: true })
      ]
    }
  }
}