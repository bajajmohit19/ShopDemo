import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styles from './GridContent.less'

class GridContent extends PureComponent {
  render () {
    const { contentWidth, children } = this.props
    let className = `${styles.main}`
    if (contentWidth === 'Fixed') {
      className = `${styles.main} ${styles.wide}`
    }
    return <div className={className}>{children}</div>
  }
}

export default connect(({ theme }) => ({
  contentWidth: theme.contentWidth
}))(GridContent)