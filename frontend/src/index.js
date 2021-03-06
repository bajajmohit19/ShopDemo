import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import Store, { history } from './store'
import App from './containers/app'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import common from './common.less'
const { store, persistor } = Store()

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  target
)
