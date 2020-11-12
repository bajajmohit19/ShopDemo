import React, { PureComponent } from 'react'
import { Spin, Tag, Menu, Icon, Avatar, Tooltip } from 'antd'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import NoticeIcon from '../NoticeIcon'
import HeaderSearch from '../HeaderSearch'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'


const blankAvatar = `data:image/png;base64,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`

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData () {
    const { notices = [] } = this.props
    if (notices.length === 0) {
      return {}
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice }
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow()
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold'
        }[newNotice.status]
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        )
      }
      return newNotice
    })
    return groupBy(newNotices, 'type')
  }

  getUnreadData = noticeData => {
    const unreadMsg = {}
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length
      }
    })
    return unreadMsg
  }

  changeReadState = clickedItem => {
    const { id } = clickedItem
    const { dispatch } = this.props
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id
    })
  }

  render () {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme
    } = this.props
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user"/>
          <span>account center</span>
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting"/>
          <span>user info</span>

        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle"/>
          <span>trigger error</span>

        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout">
          <Icon type="logout"/>
          <span>logout</span>

        </Menu.Item>
      </Menu>
    )
    const noticeData = this.getNoticeData()
    const unreadMsg = this.getUnreadData(noticeData)
    let className = styles.right

    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`
    }
    return (
      <div className={className}>
        {/*<HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={'Search Anything Here'}
          dataSource={[]}
          onSearch={value => {
            console.log('input', value)
          }}
          onPressEnter={value => {
            console.log('enter', value)
          }}
        />*/}

        {/*<NoticeIcon
          className={styles.action}
          count={11}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps) // eslint-disable-line
            this.changeReadState(item, tabProps)
          }}
          locale={{
            emptyText: 'No notifications',
            clear: 'Clear'
          }}
          onClear={onNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          clearClose
        >
          <NoticeIcon.Tab
            count={unreadMsg.notification}
            list={noticeData.notification}
            title={'Notification'}
            name="notification"
            emptyText={'You have viewed all notifications.'}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            count={unreadMsg.message}
            list={noticeData.message}
            title={'Message'}
            name="message"
            emptyText={'You have viewed all Messages.'}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
        </NoticeIcon>*/}

        {currentUser.email ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar ? currentUser.avatar : blankAvatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.email}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }}/>
        )}

      </div>
    )
  }
}
