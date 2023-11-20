import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
)
