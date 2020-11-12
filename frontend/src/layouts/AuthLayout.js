import React, { Fragment } from 'react'
import { Icon } from 'antd'
import styles from './AuthLayout.less'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import GlobalFooter from '../components/GlobalFooter'
import { subTitle, pageTitle } from '../settings'


const links = [
  {
    key: 'help',
    title: 'HELP',
    href: ''
  }
]

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright"/> 2018
  </Fragment>
)

class UserLayout extends React.PureComponent {

  render () {
    const { children } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo}/>
                <span className={styles.title}>{pageTitle}</span>
              </Link>
            </div>
            <div className={styles.desc}>{subTitle}</div>
          </div>
          {children}
        </div>
        <GlobalFooter links={links} copyright={copyright}/>
      </div>
    )
  }
}

export default UserLayout
