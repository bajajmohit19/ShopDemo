import React, { Component, PureComponent } from 'react'

import {
    Form,
    Button,
    Card,
    Icon,
    Tabs,
    Tooltip,
    Row,
    Steps,
    message,
    notification,
    Col,
    Select,
    Input,
    InputNumber,
    Table,
    Divider
} from 'antd'
import _ from 'lodash'

import { connect } from 'react-redux'
import styles from './style.less'

const Step = Steps.Step

const Option = Select.Option
const typeofDegree = {
    Diploma: [
        { key: 'Diploma Of Engineering', value: 'Diploma Of Engineering' },
        { key: 'Diploma Of Management', value: 'Diploma Of Management' }
    ],
    'Bachelor Degree': [
        { key: 'Bachelor of Agriculture', value: 'Bachelor of Agriculture' },
        { key: 'Bachelor of Arts', value: 'Bachelor of Arts' },
        {
            key: 'Bachelor of Ayurvedic Medicine & Surgery - BAMS',
            value: 'Bachelor of Ayurvedic Medicine & Surgery - BAMS'
        },
        {
            key: 'Bachelor of Business Administration',
            value: 'Bachelor of Business Administration'
        },
        { key: 'Bachelor of Commerce', value: 'Bachelor of Commerce' },
        {
            key: 'Bachelor of Computer Applications',
            value: 'Bachelor of Computer Applications'
        },
        {
            key: 'Bachelor of Computer Science',
            value: 'Bachelor of Computer Science'
        },
        {
            key: 'Bachelor of Dental Surgery - BDS',
            value: 'Bachelor of Dental Surgery - BDS'
        },

        { key: 'Bachelor of Design', value: 'Bachelor of Design' },
        { key: 'Bachelor of Education', value: 'Bachelor of Education' },
        { key: 'Bachelor of Engineering', value: 'Bachelor of Engineering' },
        { key: 'Bachelor of Fine Arts', value: 'Bachelor of Fine Arts' },
        { key: 'Bachelor of Home Science', value: 'Bachelor of Home Science' },

        {
            key: 'Bachelor of Homeopathic Medicine and Surgery - BHMS',
            value: 'Bachelor of Homeopathic Medicine and Surgery - BHMS'
        },
        { key: 'Bachelor of Laws', value: 'Bachelor of Laws' },
        {
            key: 'Bachelor of Mass Communications',
            value: 'Bachelor of Mass Communications'
        },
        {
            key: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
            value: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)'
        },
        { key: 'Bachelor of Nursing', value: 'Bachelor of Nursing' },
        { key: 'Bachelor of Pharmacy', value: 'Bachelor of Pharmacy' },
        { key: 'Bachelor of Physiotherapy', value: 'Bachelor of Physiotherapy' },
        { key: 'Bachelor of Science', value: 'Bachelor of Science' },
        { key: 'Bachelor of Social Work', value: 'Bachelor of Social Work' },
        { key: 'Bachelor of Technology', value: 'Bachelor of Technology' },
        {
            key: 'Bachelor of Veterinary Science & Animal Husbandry',
            value: 'Bachelor of Veterinary Science & Animal Husbandry'
        },
        { key: 'Doctor of Medicine', value: 'Doctor of Medicine' },
        {
            key: 'Doctor of Medicine in Homoeopathy',
            value: 'Doctor of Medicine in Homoeopathy'
        },
        { key: 'Doctor of Pharmacy', value: 'Doctor of Pharmacy' },
        { key: 'Doctorate of Medicine', value: 'Doctorate of Medicine' },
        {
            key: 'General Nursing & Midwifery (GNM)',
            value: 'General Nursing & Midwifery (GNM)'
        },
        { key: 'Bachelor of Journalism', value: 'Bachelor of Journalism' },
        { key: 'ITI', value: 'ITI' },
        { key: 'Other', value: 'Other' }
    ],
    masters: [
        { key: 'Master of Agriculture', value: 'Master of Agriculture' },
        { key: 'Master of Arts', value: 'Master of Arts' },
        {
            key: 'Master of Ayurvedic Medicine & Surgery - BAMS',
            value: 'Master of Ayurvedic Medicine & Surgery - BAMS'
        }
    ]
}

@Form.create()
class Qualification extends PureComponent {
    state = {
        qualification: null,
        passingYear: null,
        percentage: null,
        maths: null,
        english: null,
        stream: [],
        major: null,
        backlogs: null,
        degreeType: null,
        current: 0
    }
    onSubmit = () => {
        let y = []
        let x = this.state



        y.push({
            qualification: x.qualification,
            passingYear: x.passingYear,
            percentage: x.percentage,
            maths: x.maths,
            english: x.english,
            stream: x.stream,
            major: x.major,
            backlogs: x.backlogs,
            degreeType: x.degreeType
        })


        this.props.handleSubmit(y)

        this.setState({
            passingYear: null,
            percentage: null,
            maths: null,
            english: null,
            stream: [],
            major: [],
            backlogs: null,
            degreeType: null
        })
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        const {
            form: { getFieldDecorator, getFieldValue }
        } = this.props

        const { hide } = this.props

        const submitFormLayout = {
            labelCol: {},
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 24, offset: 0 },
                md: { span: 24, offset: 0 }
            }
        }

        let { qualification } = this.state

        return (
            <div>
                <Row style={{ marginBottom: 10 }}>
                    <Col span={4} >
                        <label className={styles.test}>Qualification</label>
                        <Select
                            showSearch={true}
                            showAction={['focus', 'click']}
                            onChange={qualification => {
                                this.setState({
                                    qualification,
                                    passingYear: '',
                                    maths: '',
                                    english: '',
                                    percentage: '',
                                    degreeType: '',
                                    major: [],
                                    stream: [],
                                    backlogs: ''
                                })
                            }}>
                            <Option value={'X'}>X</Option>
                            <Option value={'XII'}>XII</Option>
                            <Option value={'Diploma'}>Diploma</Option>
                            <Option value={'Bachelor Degree'}>Bachelor Degree</Option>
                            <Option value={'Post Graduation'}>Post Graduation</Option>
                        </Select>
                    </Col>
                </Row>
                {qualification ? (
                    <div className={styles.qualItem}>

                        {
                            !hide ? <div className={styles.inputNumber}>
                                <label className={styles.test}>Passing year</label>
                                <InputNumber
                                    value={this.state.passingYear}
                                    maxLength={4}
                                    allowClear
                                    className={styles.input}
                                    onChange={py => {

                                        this.setState({ passingYear: py })
                                    }}
                                />
                            </div> : null
                        }


                        <div className={styles.inputNumber}>
                            <label className={styles.test}>% or Grade</label>
                            <InputNumber
                                value={this.state.percentage}
                                maxLength={2}
                                allowClear
                                // className={'inputNumber inputNumberNew'}

                                onChange={py => {
                                    this.setState({ percentage: py })
                                }}
                            />
                        </div>
                        {qualification == 'X' || qualification == 'XII' ? (
                            <React.Fragment>
                                <div
                                    className={styles.inputNumber}
                                >
                                    <label className={styles.test}>Math Score</label>
                                    <InputNumber
                                        value={this.state.maths}
                                        maxLength={2}
                                        allowClear
                                        // className={'inputNumber inputNumberNew'}

                                        onChange={py => {

                                            this.setState({ maths: py })
                                        }}
                                    />
                                </div>
                                <div
                                    className={styles.inputNumber}
                                >
                                    <label className={styles.test}>English Score</label>
                                    <InputNumber
                                        value={this.state.english}
                                        allowClear
                                        maxLength={2}
                                        // className={'inputNumber inputNumberNew'}
                                        // className={styles.inputNumber}

                                        onChange={py => {

                                            this.setState({ english: py })
                                        }}
                                    />
                                </div>
                            </React.Fragment>
                        ) : null}


                        {qualification != 'X' ? (
                            <React.Fragment>
                                {
                                    !hide ? <div 
                                    className={styles.minWidth}
                                    >
                                        <label className={styles.test}>Major Subjects</label>
                                        <Select
                                            mode="tags"

                                            placeholder="Tags Mode"
                                            value={this.state.major}
                                            onChange={ss => {
                                                this.setState({ major: ss })
                                            }}
                                        />
                                    </div> : null
                                }


                                {qualification != 'XII' && qualification == 'Diploma' ? (
                                    <React.Fragment>
                                        <div className={styles.inputNumber}>
                                            <label className={styles.test}>Backlogs</label>
                                            <InputNumber
                                                value={this.state.backlogs}
                                                allowClear
                                                // className={'inputNumber inputNumberNew'}
                                                className={styles.inputNumber}

                                                onChange={py => {
                                                    this.setState({ backlogs: py })
                                                }}
                                            />
                                        </div>
                                        <div 
                                        className={styles.minWidth}>
                                            <label className={styles.test}>Type Of Degree</label>{' '}
                                            <Select
                                                showSearch={true}
                                                value={this.state.degreeType}
                                                showAction={['focus', 'click']}
                                                dropdownMatchSelectWidth={false}
                                                onChange={degreeType => {
                                                    this.setState({ degreeType })
                                                }}>
                                                {typeofDegree.Diploma.map((val, index) => {
                                                    return (
                                                        <Option key={index} value={val.value}>
                                                            {val.value}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                    </React.Fragment>
                                ) : null}
                                {qualification != 'XII' &&
                                    qualification == 'Bachelor Degree' ? (
                                        <React.Fragment>
                                            <div 
                                            className={styles.inputNumber}
                                            >
                                                <label className={styles.test}>Backlogs</label>
                                                <InputNumber
                                                    value={this.state.backlogs}
                                                    allowClear
                                                    // className={'inputNumber inputNumberNew'}
                                                    // className={styles.inputNumber}

                                                    onChange={py => {

                                                        this.setState({ backlogs: py })
                                                    }}
                                                />
                                            </div>
                                            <div 
                                            className={styles.minWidth}
                                            >
                                                <label>Type Of Degree</label>
                                                <Select
                                                    showSearch={true}
                                                    value={this.state.degreeType}
                                                    showAction={['focus', 'click']}
                                                    dropdownMatchSelectWidth={false}
                                                    onChange={degreeType => {
                                                        this.setState({ degreeType })
                                                    }}>
                                                    {typeofDegree['Bachelor Degree'].map((val, index) => {
                                                        return (
                                                            <Option key={index} value={val.value}>
                                                                {val.value}
                                                            </Option>
                                                        )
                                                    })}
                                                </Select>
                                            </div>
                                        </React.Fragment>
                                    ) : null}
                                {qualification != 'XII' &&
                                    qualification == 'Post Graduation' ? (
                                        <React.Fragment>
                                            <div 
                                            className={styles.inputNumber}
                                            >
                                                <label className={styles.test}>Backlogs</label>
                                                <InputNumber
                                                    value={this.state.backlogs}
                                                    allowClear
                                                    // className={'inputNumber inputNumberNew'}
                                                    // className={styles.inputNumber}

                                                    onChange={py => {

                                                        this.setState({ backlogs: py })
                                                    }}
                                                />
                                            </div>
                                            <div
                                            className={styles.minWidth}>
                                                <label className={styles.test}>Type Of Degree</label>
                                                <Select
                                                    showSearch={true}
                                                    value={this.state.degreeType}
                                                    dropdownMatchSelectWidth={false}
                                                    showAction={['focus', 'click']}

                                                    onChange={degreeType => {
                                                        this.setState({ degreeType })
                                                    }}>
                                                    {typeofDegree.masters.map((val, index) => {
                                                        return (
                                                            <Option key={index} value={val.value}>
                                                                {val.value}
                                                            </Option>
                                                        )
                                                    })}
                                                </Select>
                                            </div>
                                        </React.Fragment>
                                    ) : null}
                            </React.Fragment>
                        ) : null}
                        {qualification != 'X' ? (
                            <React.Fragment>
                                <div
                                className={styles.minWidth}
                                    // style={{ width: '25%', marginLeft: '10px' }}
                                >
                                    <label className={styles.test}>Streams</label>

                                    <Select
                                        value={this.state.stream}
                                        showSearch={true}
                                        dropdownMatchSelectWidth={false}
                                        mode={'multiple'}
                                        onChange={streams => {
                                            this.setState({ stream: streams })
                                        }}>
                                        <Option value={'MEDICAL'}>MEDICAL</Option>
                                        <Option value={'NON-MEDICAL'}>NON-MEDICAL</Option>
                                        <Option value={'COMMERCE'}>COMMERCE</Option>
                                        <Option value={'ARTS'}>ARTS</Option>
                                    </Select>
                                </div>
                            </React.Fragment>
                        ) : null}

                        <div>
                            <Button
                                style={{
                                    marginBottom: '9px',
                                    marginTop: '21px',
                                    height: '30px',
                                    marginLeft: '10px'
                                }}
                                size={'small'}
                                type="primary"
                                onClick={this.onSubmit}> ADD </Button>

                        </div>

                    </div>

                ) : null}



                <Divider />

            </div>
        )
    }
}

const mapStateToProps = ({ global, router }) => ({
    loading: global.buttonLoading,
    categories: global.categories,
    search: router.location.search
})
const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Qualification)
