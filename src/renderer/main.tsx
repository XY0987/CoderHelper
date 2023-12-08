import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import './userWoker'
import './index.scss'
import 'normalize.css'
import './style/index.scss'
import './style/theme.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Provider>
  </HashRouter>
)
