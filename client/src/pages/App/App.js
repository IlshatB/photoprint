import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { loginClient } from '../../store/client/actions'
import { useCurrentClient } from '../../hooks'

import routes from './routes'

import 'antd/dist/antd.min.css'
import 'antd-css-utilities/utility.min.css'
import './app.css'

export default function App() {
  const { id } = useSelector(store => store.client)
  const { token } =  useCurrentClient()
  const dispatch = useDispatch()

  useEffect(() => {
    if (token && !id) {
      dispatch(loginClient(token))
    }
  }, [token, id, dispatch])

  return useRoutes(routes)
}

