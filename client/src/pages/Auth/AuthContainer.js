import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { withLayout } from '../../hocs'

import { loginClient } from '../../store/client/actions'

import ForgotPassword from './components/ForgotPassword'
import Authorize from './components/Authorize'
import Reset from './components/Reset'
import Auth from './Auth'

const AuthContainer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async values => {
        try {
            const { data } = await axios.post('/api/auth/signin', values, { headers: { "Content-Type": "application/json" } })
            dispatch(loginClient(data.token))
            navigate('/home')
        } catch (e) {
            return Promise.reject(e.response.data)
        }
    }

    const handleSignup = async values => {
        const { password, confirm } = values

        try {
            if (password !== confirm) throw new Error('Пароли не совпадают')
            const { data } = await axios.post('/api/auth/signup', values, { headers: { "Content-Type": "application/json" } })
            dispatch(loginClient(data.token))

            navigate('/home')
        } catch (e) {
            return Promise.reject(e.response.data)
        }
    }

    const AuthWithLayout = withLayout(Auth)
    return <AuthWithLayout onLogin={handleLogin} onSignup={handleSignup} />
}

export default AuthContainer

AuthContainer.ForgotPassword = ForgotPassword
AuthContainer.Authorize = Authorize
AuthContainer.Reset = Reset