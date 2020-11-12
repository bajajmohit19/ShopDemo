import React, { Component } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Drawer,
  Popconfirm,
  Card,
  Tooltip,
  notification,
  Empty,
  Select,
  Upload, Button, Icon
} from 'antd'
import Request from '../../../request'
import Color from 'color'
import _ from 'lodash'
import { connect } from 'react-redux'
//import styles from './styles.less'
import update from 'immutability-helper'
import List from '../add/index'

import { apiUrl } from '../../../settings'

// import {TableComp} from 'sz-react-utils-lite'
import TableComp from '../../../components/_utils/table'
import { getPushPathWrapper } from '../../../routes'
// import Option from "react-draft-wysiwyg/src/components/Option/index";

const Option = Select.Option


class AllModel extends Component {

  state = {
    visible: false,
    loading: false,
    disabled: true,
    uploadData: null,
    allModels: [],
    allMakes: [],
    make: '',
    totalModel: ''
  }

  reload = () => {
    this.table.current.reload()
  }

  deleteModels = async (data) => {
    this.setState({ loading: true })

    let resp = await Request.deleteModel(data)

    this.setState({ loading: false })

    if (!resp.error) {
      this.getMakeList()
      notification.success({
        message: 'Deleted Successfully',
        duration: 20,
        key: `${data.val._id}-close`
      })

    } else {
      notification.error({
        message: resp.message,
        duration: 20
      })
    }


  }

  constructor(props) {
    super(props)
    this.table = React.createRef()
  }

  async componentWillMount() {

    let { data: allMakes } = await Request.getAllMakes()
    this.setState({
      allMakes
    })

  }

  getMakeList() {
    Request.getAllModels({ make: this.state.make })
      .then(({ data, count }) => {
        if (data) {
          this.setState({
            allModels: data.model,
            loading: false,
            totalModel: count
          })
        }

      })
  }

  render() {

    const { dispatch } = this.props
    const { visible, disabled, loading, allMakes, make, totalModel } = this.state
    const columns = [
      {
        title: 'Name',
        key: 'carModel',
        sorter: true,
        dataIndex: 'carModel',
        searchTextName: 'carModel',
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

              <a href={`/model/edit/${val._id}/${make}`} target={'_blank'}>
                <Button shape="circle" icon="edit"/>
              </a>
            </Tooltip>
            <Tooltip title="Delete Model">
              <Popconfirm title="Are you sure delete this model?" onConfirm={() => {
                this.deleteModels({ val, make })
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
        title={`All Models : ${totalModel}`}>

        <Card bordered={true}>

          <div>
            <label style={{ marginRight: 20 }}> Select Make:</label>
            <Select showSearch
                    filterOption={(input, option) => {
                      return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }}
                    value={this.state.make} style={{ width: 200 }} onChange={(make) => {
              this.setState({ make: make.toString() }, () => {
                this.getMakeList()
              })


            }} className="form-control">

              {allMakes.map((val, index) => {
                return <Option key={index} value={val._id}>{val.make}</Option>
              })}

            </Select>
          </div>

          {this.state.make ? <TableComp ref={this.table}
                                        columns={columns}
                                        loading={this.state.loading}
                                        dataSource={this.state.allModels}/> : <Empty/>}

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
)(AllModel)
