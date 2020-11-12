import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Form,
  Input,
  DatePicker,

  Select,
  Button,
  Card,
  Icon,
  notification
} from 'antd'
import _ from 'lodash'
import moment from 'moment'
// import {FormUtils as GetAllFormFields} from 'sz-react-utils-lite'
import GetAllFormFields from '../../../components/_utils/formUtils'

import { hideLoader, showLoader } from '../../../modules/actions'

import Request from '../../../request'
import { connect } from 'react-redux'
import { createMatchSelector } from 'connected-react-router'
import { getUrlParams } from '../../../routes'

const Option = Select.Option
const Search = Input.Search

@Form.create()
class AddModel extends PureComponent {

  state = {
    id: null,
    makes: []
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props
    const { id } = this.state
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, valData) => {
      if (!err) {

        dispatch(showLoader())

        let x = null
        if (id) {
          x = await Request.editModel({
            ...valData,
            makeId: this.state.makeId,
            modelId: this.state.modelId,
            _id: id
          })
        } else {
          x = await Request.addModel(valData)
        }

        dispatch(hideLoader())

        if (!x.error) {
          notification.success({
            message: id ? `Updated Successfully` : 'Added successfully'
          })
          if (!id) {
            this.props.form.resetFields()
          }
        } else {
          notification.error({
            message: 'Error Saving',
            description: x.message
          })
        }

      }
    })
  }


  async componentDidMount() {
    Request
      .getAllMakes()
      .then(({ data, error, message }) => {

        if (!error) {
          this.setState({
            makes: data
          })


        } else {

          notification.error({
            message: 'Error Getting Data',
            description: message
          })

        }
      })
    let data1 = await getUrlParams('models.editModel', this.props.pathname)

    if (data1 && data1.id && data1.makeId) {
      this.setState({
        makeId: data1.makeId,
        modelId: data1.id

      })
      Request
        .getMake({ id: data1.makeId })
        .then(({ data, error, message }) => {
          if (!error) {
            this.setState({
              id: data.makeId
            })
            this.props.form.setFieldsValue({
              make: data.make
            })
            Request.getModel({ id: data1.id })
              .then(({ data, error, message }) => {
                if (!error) {
                  this.setState({
                    id: data._id
                  })


                  this.props.form.setFieldsValue({
                    carModel: data.model[0].carModel
                  })

                } else {

                  notification.error({
                    message: 'Error Getting Data',
                    description: message
                  })

                }
              })

          } else {

            notification.error({
              message: 'Error Getting Data',
              description: message
            })

          }
        })
    }
  }


  render() {

    const { form: { getFieldDecorator, getFieldValue, setFieldsValue } } = this.props
    const { id } = this.state


    let inputTypes = {

      fields: [
        {
          key: 'make',
          type: 'select',
          disabled: false,
          placeholder: 'Enter Your Make',
          keyAccessor: x => x._id,
          valueAccessor: x => x.make,
          options: this.state.makes,
          onChange: (make) => {
            setFieldsValue({ make })
          }
        },
        {
          key: 'carModel', type: 'text', placeholder: 'Enter Your Model'

        }

      ]

    }

    const formItemLayout = {
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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
        md: { span: 12, offset: 8 }
      }
    }

    return (
      <PageHeaderWrapper title={id ? 'Edit Model' : 'Add New Model '}>
        <Card bordered={true}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

            <GetAllFormFields inputSchema={inputTypes} formItemLayout={formItemLayout}
                              getFieldDecorator={getFieldDecorator}/>

            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>

              <Button type="primary" htmlType="submit" loading={this.props.loading}>
                SAVE
              </Button>
            </Form.Item>

          </Form>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

const mapStateToProps = ({ global, router }) => ({
  loading: global.buttonLoading,
  categories: global.categories,
  pathname: router.location.pathname,
  router
})
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddModel)
