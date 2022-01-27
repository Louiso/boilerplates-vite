import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import configureStore from '@/app/store/configureStore'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Root from './routes'

const store = configureStore()

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
