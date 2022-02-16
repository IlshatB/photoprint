import { useRoutes } from 'react-router-dom'

import routes from './routes'

export default function App() {
  console.log('0000')

  return useRoutes(routes)
}

