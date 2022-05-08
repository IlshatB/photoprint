
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useCurrentClient} from '../../hooks'
import { loginClient } from '../../store/client/actions'

import Auth from '../../pages/Auth/AuthContainer'

const AuthGuard = ({ children }) => {
    const { isAuthenticated, token } = useCurrentClient()
    const { id } = useSelector(store => store.client)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!id) {
            dispatch(loginClient(token))
        }
    }, [id, dispatch, token])

    return isAuthenticated ? children : <Auth.Authorize />
}

export default AuthGuard