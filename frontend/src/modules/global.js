const initialState = {
  currentUser: {
    email: null
  },
  token: null,
  notices: [
    {
      'id': '000000001',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      'title': '你收到了 14 份新周报',
      'datetime': '2017-08-09',
      'type': 'notification'
    },
    {
      'id': '000000002',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      'title': '你推荐的 曲妮妮 已通过第三轮面试',
      'datetime': '2017-08-08',
      'type': 'notification'
    },
    {
      'id': '000000003',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      'title': '这种模板可以区分多种通知类型',
      'datetime': '2017-08-07',
      'read': true,
      'type': 'notification'
    },
    {
      'id': '000000004',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      'title': '左侧图标用于区分不同的类型',
      'datetime': '2017-08-07',
      'type': 'message'
    },
    {
      'id': '000000005',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      'title': '内容不要超过两行字，超出时自动截断',
      'datetime': '2017-08-07',
      'type': 'notification'
    },
    {
      'id': '000000006',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      'title': '曲丽丽 评论了你',
      'description': '描述信息描述信息描述信息',
      'datetime': '2017-08-07',
      'type': 'message',
      'clickClose': true
    },
    {
      'id': '000000007',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      'title': '朱偏右 回复了你',
      'description': '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      'datetime': '2017-08-07',
      'type': 'message',
      'clickClose': true
    },
    {
      'id': '000000008',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      'title': '标题',
      'description': '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      'datetime': '2017-08-07',
      'type': 'message',
      'clickClose': true
    },
    {
      'id': '000000009',
      'title': '任务名称',
      'description': '任务需要在 2017-01-12 20:00 前启动',
      'extra': '未开始',
      'status': 'todo',
      'type': 'event'
    },
    {
      'id': '000000010',
      'title': '第三方紧急代码变更',
      'description': '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      'extra': '马上到期',
      'status': 'urgent',
      'type': 'event'
    },
    {
      'id': '000000011',
      'title': '信息安全考试',
      'description': '指派竹尔于 2017-01-09 前完成更新并发布',
      'extra': '已耗时 8 天',
      'status': 'doing',
      'type': 'event'
    },
    {
      'id': '000000012',
      'title': 'ishaan sharma ',
      'description': '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      'extra': '进行中',
      'status': 'processing',
      'type': 'notification'
    }
  ],
  buttonLoading: false,
  categories: [
    'Information Technology',
    'Education',
    'Finance',
    'E-Commerce',
    'Web Application',
    'Cooperate',
    'Personal',
    'Medical'
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.user
      }

    case 'LOGOUT':
      return {
        ...state,
        currentUser: {}
      }

    case 'SHOW_BTN_LOADING':
      return {
        ...state,
        buttonLoading: true
      }

    case 'HIDE_BTN_LOADING':
      return {
        ...state,
        buttonLoading: false
      }


    case 'SET_AUTH_TOKEN':
      return {
        ...state,
        token: action.token
      }

    default:
      return state
  }
}