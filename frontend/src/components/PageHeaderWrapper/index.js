import React from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader'
import { connect } from 'react-redux'
import GridContent from './GridContent'
import styles from './index.less'
import MenuContext from '../../layouts/MenuContext'

const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          home={'Home'}
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={item => {
            return item.title
          }}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
)

export default connect(({ theme }) => ({
  contentWidth: theme.contentWidth
}))(PageHeaderWrapper)
