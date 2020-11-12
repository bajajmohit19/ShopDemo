import React, { useState, useEffect } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import { Form, Select, Button, Card, notification, Spin, Row, Col, Upload, Avatar, message, Modal } from 'antd'
import _ from 'lodash'
import { FormUtils as GetAllFormFields } from 'sz-react-utils-lite'
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../action/productAction'
import { uploadUrl } from '../../../settings'
import { getPushPathWrapper, getUrlPushWrapper } from '../../../routes'

const AddState = (props) => {
    const { form: { getFieldDecorator, setFieldsValue, getFieldValue, resetFields } } = props
    const [state, setState] = useState({ fileList: [], imageUrl: '', imageData: '', deleteImage: false, imageUrl: null, imageData: null, previewVisible: false, reset: false })
    const dispatch = useDispatch()
    const { productLoader } = useSelector(state => ({
        productLoader: state.productReducers.productLoader,
    }));

    let inputTypes = {
        fields: [
            {
                key: 'productName', label: 'Name',
                required: true,
            },
            { key: 'description', label: 'Description', required: true },
            { key: 'price', label: 'Price', required: true },
            { key: 'quantity', label: 'Quantity', required: true },


        ]
    }

    const submitFormLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 10, offset: 7 },
            md: { span: 12, offset: 8 }
        }
    }
    const formItemLayout = {
        // labelCol: {
        //     xs: { span: 0 },
        //     sm: { span: 0 },
        //     md: { span: 0 }
        // },
        // wrapperCol: {
        //     xs: { span: 24 },
        //     sm: { span: 24 },
        //     md: { span: 24 }
        // }
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
            md: { span: 8 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
            md: { span: 12 }
        }
    }
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
    const onRemove = info => {
        if (info.status == 'removed') {
            setState(() => ({ ...state, imageUrl: null, imageData: null, fileList: [], deleteImage: true, previewImage: '', previewVisible: false }))
        }
    }
    const handlePreview = async file => {
        console.log("call")
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        console.log(file)

        setState(() => (
            {
                ...state,
                previewImage: file.url || file.preview,
                previewVisible: true
            }
        )

        )
    }
    const handleChangeImage = info => {
        console.log(info)
        if (info.file.status === 'uploading') {
            setState(() => ({
                ...state,
                fileList: [{ ...info.file }],
                loading: true,
                webcamData: null,
                saveImage: null,
                reset: false
            }))
            return
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                setState(() => (
                    {
                        ...state,
                        imageUrl,
                        loading: false,
                        imageData: info.file.response.file,
                        flag1: true
                    }),
                )
            )
        }
    }
    const handleCancel = () => {

        setState(() => ({ ...state, previewVisible: false }))
    }

    const handleSubmit = e => {
        const { form } = props
        e.preventDefault();
        form.validateFieldsAndScroll(async (err, valData) => {
            if (state.fileList) {
                valData.image = state.fileList[0].response.file
            }
            console.log(valData)

            if (!err) {
                let data = await dispatch(addProducts(valData));
                if (data && !data.error) {
                    form.resetFields();
                    setState(() => ({...state, fileList:[]}))
                    dispatch(getPushPathWrapper('product.allProduct'))
                }
            } else {
                notification.warning({
                    message: 'Fill All Required Fields'
                })
            }
        })
    }

    // useEffect(() => {
    //     dispatch(listAllCountries({ results: 1000000 }));
    // }, [])
    const uploadButton = (
        <div id='avatar'>
            <Avatar
                shape="square"
                size={60}
                icon={state.loadingImage ? 'loading' : 'upload'}
            />
        </div>
    )
    return (
        <div>
            <PageHeaderWrapper
                title={'Add New Product'}
            >

                <Card bordered={true} title={'Add Product'}>
                    <Form onSubmit={handleSubmit} style={{ marginTop: 8, textAlign: 'left' }} {...formItemLayout}>
                        <GetAllFormFields
                            inputSchema={inputTypes}
                            formItemLayout={formItemLayout}
                            getFieldDecorator={getFieldDecorator}
                        />
                        <Form.Item
                            label="Product Image"
                            {...formItemLayout}
                            style={{ marginTop: 32 }}>
                            {(
                                <>
                                    <Upload
                                        className="clearfix"
                                        name="avatar"
                                        action={uploadUrl}
                                        beforeUpload={beforeUpload}
                                        fileList={state.fileList || []}
                                        onRemove={onRemove}
                                        showUploadList={true}
                                        listType="picture-card"
                                        onPreview={handlePreview}
                                        onChange={handleChangeImage}>
                                        {state.imageUrl && state.imageData ? null : uploadButton}
                                    </Upload>

                                    <Modal
                                        visible={state.previewVisible}
                                        footer={null}
                                        onCancel={handleCancel}>
                                        <img
                                            alt="avatar"
                                            style={{ width: '100%' }}
                                            src={state.previewImage}
                                        />
                                    </Modal>


                                </>
                            )}

                            {state.reset ? (
                                <div>
                                    <Button
                                        style={{ display: 'inline-block' }}
                                        type="primary"
                                        onClick={this.resetState}
                                        id={'remove-picture'}>
                                        Remove Picture
                      </Button>
                                </div>
                            ) : null}
                        </Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Form.Item style={{ marginTop: 32 }} {...submitFormLayout}>
                                <Button type="primary" htmlType="submit" loading={productLoader} >
                                    ADD
                                  </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        </div>
    )
}
const WrappedState = Form.create()(AddState)
export default WrappedState