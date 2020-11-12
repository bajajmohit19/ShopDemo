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
  Upload, Button, Icon,
  Row,
  Col,
  Input
} from 'antd'
import Request from '../../../request'
import Color from 'color'
import _ from 'lodash'
import { connect } from 'react-redux'
import styles from './styles.less'
import update from 'immutability-helper'
import List from '../add/index'

import { apiUrl } from '../../../settings'

// import {TableComp} from 'sz-react-utils-lite'
import TableComp from '../../../components/_utils/table'
import { getPushPathWrapper } from '../../../routes'
// import Option from "react-draft-wysiwyg/src/components/Option/index";

const Option = Select.Option


class AllFuelType extends Component {

  state = {
    visible: false,
    loading: false,
    disabled: true,
    uploadData: null,
    allModels: [],
    allFuel: [],
    allMakes: [],
    allVariants: [],
    allVariantsYear: [],
    fuel: '',
    make: '',
    model: '',
    totalVariant: '',
    totalYear: 0,
    visibleYearModal: false,
    addYearModal: false,
    variantYear: ''
  }

  reload = () => {
    this.table.current.reload()
  }

  deleteVariant = async (data) => {
    this.setState({ loading: true })

    let resp = await Request.deleteVariant(data)

    this.setState({ loading: false })

    this.reload()
    if (!resp.error) {

      notification.success({
        message: resp.message,
        duration: 20,
        key: `${data.val._id}-close`
      })
      this.getVariantFxn()
    } else {

      notification.error({
        message: resp.message,
        duration: 20
      })
    }

  }
  deleteVariantYear = async (data) => {
    // this.setState({ loading: true })
    let obj = {
      modelId: this.state.model,
      makeId: this.state.make,
      fuelTypeId: this.state.fuel,
      variantId: this.state.variantId,
      year: data.year
    }
    let resp = await Request.deleteVariantYear(obj)

    this.setState({ loading: false })

    this.reload()
    if (!resp.error) {

      notification.success({
        message: resp.message,
        duration: 20
      })
      this.visibleYearModalFxn()
    } else {

      notification.error({
        message: resp.message,
        duration: 20
      })
    }

  }
  onClose = () => {
    this.setState({
      visibleYearModal: false
    })
  }
  addYearOnClose = () => {
    this.setState({
      addYearModal: false
    })
  }

  constructor(props) {
    super(props)
    this.table = React.createRef()
  }

  async componentWillMount() {

    let { data: allMakes } = await Request.getAllMakes({ results: 1000 })

    this.setState({
      allMakes
    })

  }

  getVariantFxn() {
    let obj = {
      model: this.state.model,
      make: this.state.make,
      fuel: this.state.fuel
    }
    Request.getAllVariants(obj)
      .then(({ data }) => {
        let allVariants = []
        if (data && data.variants && data.variants.length) {
          allVariants = data.variants
        }
        this.setState({
          allVariants: allVariants,
          totalVariant: data.count ? data.count : 0,
          loading: false
        })
      })
  }

  visibleYearModalFxn() {
    this.setState({ loading: true })
    let obj = {
      model: this.state.model,
      make: this.state.make,
      fuel: this.state.fuel,
      variant: this.state.variantId
    }
    Request.getAllVariantsYear(obj)
      .then(({ data }) => {
        this.setState({
          allVariantsYear: data.years,
          totalYear: data.count,
          loading: false,
          visibleYearModal: true
        })
      })
  }

  submitYear() {
    if (!this.state.variantYear) {
      notification.warning({
        message: 'Enter variant year',
        duration: 20
      })
      return
    }
    this.setState({ loading: true })
    let obj = {
      modelId: this.state.model,
      makeId: this.state.make,
      fuelTypeId: this.state.fuel,
      variantId: this.state.variantId,
      year: this.state.variantYear
    }
    Request.addVariantYear(obj)
      .then((resp) => {
        if (!resp.error) {
          notification.success({
            message: resp.message,
            duration: 20
          })
          this.setState({
            variantYear: '',
            loading: false,
            addYearModal: false
          })
          this.visibleYearModalFxn()
        } else {
          notification.error({
            message: resp.message,
            duration: 20
          })
        }
      })
  }

  render() {

    const { dispatch } = this.props
    const { visible, disabled, loading, allMakes, allModels, allFuel, model, fuel, make, totalVariant } = this.state
    const columns = [
      {
        title: 'Name',
        key: 'name',
        sorter: true,
        dataIndex: 'variantName',
        searchTextName: 'name',
        filterRegex: true
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 200,
        fixed: 'right',
        render: (val, record) => {
          return <div>
            <Tooltip title="Edit Details">
              <a href={`/variant/edit/${val._id}/${make}/${model}/${fuel}`} target={'_blank'}>
                <Button shape="circle" icon="edit"/>
              </a>
            </Tooltip>
            <Tooltip title="Delete Variant">
              <Popconfirm title="Are you sure delete this variant?" onConfirm={() => {
                this.deleteVariant({ val, make, fuel, model })
              }} onCancel={() => {
                console.log()
              }} okText="Yes" cancelText="No">
                <Button type="danger" shape="circle" icon="delete"/>
              </Popconfirm>
            </Tooltip>

            <Tooltip title="Variant Year">
              <Button type="success" shape="circle" icon="eye"
                      onClick={() => this.setState({ variantId: val._id }, () => {
                        this.visibleYearModalFxn()
                      })}/>
            </Tooltip>

          </div>

        }
      }
    ]
    const columnsYear = [
      {
        title: 'Year',
        key: 'year',
        dataIndex: 'year'
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 150,
        fixed: 'right',
        render: (val) => {
          return <div>
            <Tooltip title="Delete Variant">
              <Popconfirm title="Are you sure delete this variant year?" onConfirm={() => {
                this.deleteVariantYear(val)
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
        title={`All Variants : ${totalVariant}`}>

        <Card bordered={true}>

          <div style={{ marginBottom: 31 }}>
            <label style={{ marginRight: 20 }}>Select Make:</label>
            <Select showSearch
                    filterOption={(input, option) => {
                      return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }}
                    value={this.state.make} style={{ width: 200 }} onChange={(make) => {
              this.setState({ make: make.toString(), model: '', fuel: '' })
              Request.getAllModels({ make, results: 1000 })
                .then(({ data }) => {
                  this.setState({
                    allModels: data.model,
                    loading: false
                  })
                })

            }} className="form-control">

              {allMakes.map((val, index) => {
                return <Option key={index} value={val._id}>{val.make}</Option>
              })}

            </Select>
          </div>
          <div style={{ marginBottom: 31 }}>
            <label style={{ marginRight: 16 }}>Select Model:</label>
            <Select showSearch
                    filterOption={(input, option) => {
                      return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }}
                    value={this.state.model} style={{ width: 200 }} onChange={(model) => {
              this.setState({ model: model.toString(), fuel: '' })
              Request.getAllFuels({ model, make })
                .then(({ data }) => {
                  this.setState({
                    allFuel: data.fuelTypes,
                    loading: false
                  })
                })

            }} className="form-control">
              {allModels.map((val, index) => {
                return <Option key={index} value={val._id}>{val.carModel}</Option>
              })}

            </Select>
          </div>
          <div>
            <label style={{ marginRight: 30 }}>Select Fuel:</label>
            <Select showSearch
                    filterOption={(input, option) => {
                      return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }}
                    value={this.state.fuel} style={{ width: 200 }} onChange={(fuel) => {
              this.setState({ fuel: fuel.toString() }, () => {
                this.getVariantFxn()
              })


            }} className="form-control">
              {allFuel.map((val, index) => {
                return <Option key={index} value={val._id}>{val.fuelName}</Option>
              })}

            </Select>
          </div>
          {this.state.fuel ? <TableComp ref={this.table}
                                        columns={columns}
                                        loading={this.state.loading}
                                        dataSource={this.state.allVariants}/> : <Empty/>}

        </Card>

        <Drawer
          title="Variant Year"
          placement="right"
          width={1000}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visibleYearModal}>
          <Card>
            <Row>
              <Col style={{ textAlign: 'right' }}>
                <Button type="success" onClick={() => this.setState({ addYearModal: true })}>Add Year</Button>
              </Col>
            </Row>
            <TableComp columns={columnsYear}
                       loading={this.state.loading}
                       dataSource={this.state.allVariantsYear}/>
          </Card>
        </Drawer>

        <Drawer
          title="Add Variant Year"
          placement="right"
          width={600}
          closable={true}
          onClose={this.addYearOnClose}
          visible={this.state.addYearModal}>
          <Card>
            <Row>
              <Col span={8}>
                <h4>Variant Year *</h4>
              </Col>
              <Col span={16}>
                <Input placeholder="Enter Variant Year" value={this.state.variantYear}
                       onChange={(e) => this.setState({ variantYear: e.target.value })}/>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={() => this.submitYear()}>Submit</Button>
              </Col>
            </Row>
          </Card>
        </Drawer>


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
)(AllFuelType)
