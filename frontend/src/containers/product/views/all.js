import React, { useState, useEffect, useRef } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
    Button,
    Card,
    Popconfirm,
    Tooltip,
    Tag
} from 'antd'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { TableComp } from 'sz-react-utils-lite';
import { notification } from 'antd';
import { listAllProduct } from '../action/productAction';
import { getPushPathWrapper, getUrlPushWrapper } from '../../../routes'
import { timeStampFormat } from '../../../settings'
import moment from 'moment'


const ListAllProducts = () => {
    const { totalProducts } = useSelector((state) => ({
        totalProducts: state.productReducers.totalProducts,
    }));

    const tableRef = useRef()
    const dispatch = useDispatch();
    const apiRequest = (params) => {
        return new Promise(async (resolve) => {
            resolve(dispatch(listAllProduct({ ...params, regExFilters: ['productName', 'price', 'quantity', 'description'] })))
        });
    }
    const [itemNo, setItemNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const confirmDelete = async (id) => {

    }
    useEffect(() => {
        dispatch(listAllProduct()).then(d => {
        }).catch(err => {
        })
    }, [])

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: 50,
            key: 'sno',
            render: (value, item, index) => (itemNo - 1) * 10 + index + 1
        },
        {
            title: 'Name',
            dataIndex: 'productName',
            // width: 150,
            key: 'productName',
            searchTextName: 'productName',

        },
        {
            title: 'Price',
            dataIndex: 'price',
            // width: 150,
            key: 'price',
            searchTextName: 'price',


        },
        {
            title: 'Quantity',
            key: 'quantity',
            // width: 150,
            dataIndex: 'quantity',
            searchTextName: 'quantity',
        },
        {
            title: 'Description',
            key: 'description',
            // width: 150,
            dataIndex: 'description',
            searchTextName: 'description',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            // width: 100,
            key: 'createdAt',
            searchTextName: 'createdAt',
            render: (val, record) => {
                return <Tag>{moment(val).format(timeStampFormat)}</Tag>
            }

        },

        {
            key: 'actions',
            title: 'Actions',
            fixed: 'right',
            width: 80,
            render: (text, record) => {
                return <React.Fragment>
                    <Tooltip title="Edit">
                        <Button
                            shape="circle"
                            style={{ marginRight: 6 }}
                            size="small"
                            onClick={() => {
                               console.log("this is edit")
                            }}
                            icon="edit"
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            shape="circle"
                            style={{ marginRight: 6 }}
                            size="small"
                            onClick={() => {
                                confirmDelete(record._id)
                            }}
                            icon="delete"
                        />
                    </Tooltip>

                </React.Fragment>

            }
        }
    ]


    return (
        <PageHeaderWrapper
            title={`All Products: ${totalProducts || 0}`}>
            <Card bordered={true} >
                <Button onClick={() => dispatch(getPushPathWrapper('product.addProduct'))}>Add Product</Button>
                <TableComp columns={columns}
                    apiRequest={apiRequest}
                    ref={tableRef}
                    extraProps={{ scroll: { x: 600 } }}
                    pagination={{
                        defaultPageSize: 10,
                        pageSizeOptions: ['10', '25', '50', '100', '500'],
                        showSizeChanger: false
                    }}
                />
            </Card>
        </PageHeaderWrapper>
    )
}

export default ListAllProducts;
