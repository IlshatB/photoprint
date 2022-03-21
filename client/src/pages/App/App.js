import { useRoutes } from 'react-router-dom'

import routes from './routes'

import './app.css'
import 'antd/dist/antd.css';

export default function App() {
  return useRoutes(routes)
}

