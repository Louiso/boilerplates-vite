import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import configureStore from '@/_app/store/configureStore'
import { store } from '@/app/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Root from './routes'
// import instances from './app/services/instance'

// const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Root />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
