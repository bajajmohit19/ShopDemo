import React, { Component } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Drawer,
  Popconfirm,
  Card,
  Tooltip,
  notification,
  Switch,
  Upload, Button, Icon
} from 'antd'
import Request from '../../../request'
import Color from 'color'
import _ from 'lodash'
import { connect } from 'react-redux'
//import styles from './styles.less'
import update from 'immutability-helper'

import { apiUrl } from '../../../settings'

// import { TableComp } from 'sz-react-utils-lite'
import TableComp from '../../../components/_utils/table'
import { getPushPathWrapper } from '../../../routes'

class AllInstitution extends Component {

  state = { visible: false, loading: false, disabled: true, uploadData: null, totalMakes: '' }


  reload = () => {
    this.table.current.reload()
  }
  apiRequest = (params, columns) => {
    return new Promise(async (resolve) => {
      let regExFilters = _.map(columns, x => x.key)
      let data = await Request.getAllMakes({ ...params, regExFilters })
      this.setState({ totalMakes: data.total })
      resolve(data)
    })
  }

  deleteMakes = async ({ _id }) => {

    this.setState({ loading: true })

    let resp = await Request.deleteMake({ _id })

    this.setState({ loading: false })

    this.reload()
    if (!resp.error) {
      notification.success({
        message: resp.message,
        duration: 20
      })
    } else {
      notification.error({
        message: resp.message,
        duration: 20,
        key: `${_id}-close`
      })
    }

  }

  constructor(props) {
    super(props)
    this.table = React.createRef()
  }

  render() {
    const { dispatch } = this.props
    const { visible, disabled, loading } = this.state
    const columns = [
      {
        title: 'Name',
        key: 'make',
        sorter: true,
        dataIndex: 'make',
        searchTextName: 'name',
        filterRegex: true
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 100,
        fixed: 'right',
        render: (val) => {
          return <div>

            <Tooltip title="Edit Details">
              <a href={`/make/edit/${val._id}`} target={'_blank'}>
                <Button shape="circle" icon="edit"/>
              </a>
            </Tooltip>

            <Tooltip title="Delete Make">
              <Popconfirm title="Are you sure delete this make?" onConfirm={() => {
                this.deleteMakes(val)
              }} onCancel={() => {
                console.log()
              }} okText="Yes" cancelText="No">
                <Button type="danger" shape="circle" icon="delete"/>
              </Popconfirm>

            </Tooltip>

          </div>

        }
      }
    ]


    return (
      <PageHeaderWrapper
        title={`All Makes : ${this.state.totalMakes}`}>

        <Card bordered={true}>
          <TableComp ref={this.table} columns={columns} extraProps={{ loading }}
                     apiRequest={(params) => this.apiRequest(params, columns)}/>
        </Card>

      </PageHeaderWrapper>)

  }

}


const mapStateToProps = ({ global }) => ({
  categories: global.categories
})
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllInstitution)
