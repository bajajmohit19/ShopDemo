import React, {Component} from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
    Drawer,
    Popconfirm,
    Card,
    Tooltip,
    DatePicker,
    notification,
    Select,
    Switch,
    Upload, Button, Icon
} from 'antd'
import Request from '../../../request'
import Color from 'color'
import _ from 'lodash'
import {connect} from 'react-redux'
//import styles from './styles.less'
import update from 'immutability-helper'

import {apiUrl} from '../../../settings'

// import { TableComp } from 'sz-react-utils-lite'
import TableComp from '../../../components/_utils/table'
import {getPushPathWrapper, getUrlParams} from '../../../routes'
const Option = Select.Option

class AllRequirements extends Component {

    state = {
        visible: false,
        loading: false,
        disabled: true,
        uploadData: null,
        totalRequirements: '',
        allDealers: [],
        dealerIds: '',
        time: {
            key: 'createdAt',
            from: null,
            to: null
        }
    }


    reload = () => {
        this.table.current.reload()
    }
    apiRequest = (params, columns, dealerId) => {
        return new Promise(async (resolve) => {
            let regExFilters = _.map(columns, x => x.key)
            if (!!dealerId) {
                params.dealerId = [dealerId]
            }
            if (this.state.dealerIds) {
                params.dealerId = this.state.dealerIds
            }
            let data = await Request.getAllRequirements({...params, regExFilters, dateFilter: this.state.time})
            this.setState({totalRequirements: data.total})

            resolve(data)
        })
    }

    deleteMakes = async ({_id}) => {

        this.setState({loading: true})

        await Request.deleteMake({_id})

        this.setState({loading: false})

        this.reload()

        notification.success({
            message: 'Deleted Successfully',
            duration: 20,
            key: `${_id}-close`
        })

    }

    constructor(props) {
        super(props)
        this.table = React.createRef()
    }


    async componentWillMount() {
        let {data: allDealers} = await
            Request.getAllDealers({count: 10000})


        this.setState({
            allDealers
        })

        let data = await getUrlParams('requirements.dealerRequirements', this.props.pathname)
        if (data && data.id) {
            this.setState({
                dealerId: data.id
            }, () => {
                this.reload()
            })
        }


    }


    render() {
        const {dispatch} = this.props
        const {visible, disabled, loading, dealerId, allDealers} = this.state
        const columns = [
            {
                title: 'DealerName',
                key: 'name',
                sorter: true,
                dataIndex: 'dealerId',
                searchTextName: 'name',
                filterRegex: true,
                render: (val, record) => {
                    return (<div>{record.dealerId ? record.dealerId.dealershipName : ''}</div>)

                }
            },
            {
                title: 'carModel',
                key: 'model',
                sorter: true,
                dataIndex: 'model.name',
                searchTextName: 'modelName',
                filterRegex: true
            },
            {
                title: 'carName',
                key: 'name',
                sorter: true,
                dataIndex: 'make.name',
                searchTextName: 'name',
                filterRegex: true
            },
            {
                title: 'ManufacturinngYear',
                key: 'year',
                sorter: true,
                dataIndex: 'manufactureYear',
                searchTextName: 'manufactureYear',
                filterRegex: true
            },
            {
                title: 'FuelType',
                key: 'fuel',
                sorter: true,
                dataIndex: 'fuelType.name',
                searchTextName: 'fuelType',
                filterRegex: true
            },

            {
                title: 'Variant',
                key: 'variant',
                sorter: true,
                dataIndex: 'variant.name',
                searchTextName: 'variant',
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
                            <Button shape="circle" onClick={() => {
                                dispatch(getPushPathWrapper('makesandmodels.editMake', {id: val._id}))
                            }} icon="edit"/>
                        </Tooltip>

                        <Tooltip title="Edit Details">
                            <Popconfirm title="Are you sure delete this task?" onConfirm={() => {
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
                title={`All Requirements : ${this.state.totalRequirements}`}>

                <Card style={{marginBottom: 10}}>

                    <h5>SEARCH BY DEALER</h5>
                    <Select
                        showSearch
                        allowClear
                        style={{width: 200}}
                        value={this.state.dealerIds}
                        placeholder='Select Dealer'
                        onChange={(dealer) => {
                            this.setState({dealerIds: dealer.toString()}, () => {

                                this.table.current.reload()

                            })
                        }}

                        filterOption={(input, option) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }}
                    >
                        {
                            allDealers.map((val, idn) => {
                                return (
                                    <Option key={idn} value={val._id}>{val.dealershipName}</Option>
                                )
                            })
                        }

                    </Select>


                </Card>
                <Card bordered={true}>
                    <TableComp ref={this.table} columns={columns} extraProps={{loading, scroll: {x: 1000}}}
                               apiRequest={(params) => this.apiRequest(params, columns, dealerId)}/>
                </Card>

            </PageHeaderWrapper>)

    }

}


const mapStateToProps = ({global, router}) => ({
    categories: global.categories,
    pathname: router.location.pathname,

})
const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllRequirements)
