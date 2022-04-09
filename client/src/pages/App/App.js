import { useRoutes } from 'react-router-dom'

import routes from './routes'

import 'antd/dist/antd.min.css'
import 'antd-css-utilities/utility.min.css'
import './app.css'

export default function App() {
  return useRoutes(routes)
}

