import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { urlToList } from '../_utils/pathTools'
import { getMenuMatches } from './SiderMenuUtils'
import { isUrl } from '../_utils/utils'
import styles from './index.less'

const { SubMenu } = Menu

const getIcon = icon => {
  if (typeof icon === 'string' && isUrl(icon)) {
    return <img src={icon} alt="icon" className={styles.icon} />
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />
    // return <Icon type={icon} component={() => <div>
    //   {/* <Icon type="mail" /> */}
    //   <div style={{ width: '100px',height:'20px', overflow: 'hidden' }}> <img src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" alt="Flowers in Chania"></img></div>
    //   <span>neha</span>
    // </div>} />

  }
  return icon
}

export default class BaseMenu extends PureComponent {

  /**
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {

    const { currentUser: { userType } } = this.props
    if (!menusData) {
      return []
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {

        let condition = true

        if (item.authority) {

          if (!item.authority.includes(userType)) {
            condition = false
          }
        }

        if (!item.dontShowOnMenu && condition) {
          return this.getSubMenuOrItem(item, parent)
        }

      })
      .filter(item => item)
  }

  // Get the currently selected menu
  getSelectedMenuKeys = pathname => {
    const { flatMenuKeys } = this.props
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
  }

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
                name
              )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      )
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
  }

  /**
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const { name } = item
    const itemPath = this.conversionPath(item.path)
    const icon = getIcon(item.icon)
    const { target } = item
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      )
    }
    const { location, isMobile, onCollapse } = this.props
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true)
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path
    }
    return `/${path || ''}`.replace(/\/+/g, '/')
  }

  render() {
    const {
      openKeys,
      navTheme,
      mode,
      location: { pathname },
      className,
      collapsed
    } = this.props
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname)
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    }
    let props = {}
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys
      }
    }
    const { handleOpenChange, style, menuData } = this.props
    const cls = classNames(className, {
      'top-nav-menu': mode === 'vertical'
    })

    return (
      <Menu
        key="Menu"
        mode={mode}
        theme={navTheme}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        style={style}
        className={cls}
        {...props}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    )
  }
}
