import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { withLayout } from '../../hocs'
import { setClient } from '../../helpers'

import Authorize from './components/Authorize'
import Auth from './Auth'

const AuthContainer = () => {
    const navigate = useNavigate()

    const handleLogin = async values => {
        try {
            const { data } = await axios.post('/api/auth/signin', values, { headers: { "Content-Type": "application/json" } })
            setClient(data.token)
            navigate('/home')
        } catch (e) {
            console.log(e)
        }
    }

    const handleSignup = async values => {
        const { password, confirm } = values

        try {
            if (password !== confirm) throw new Error('Пароли не совпадают')
            const { data } = await axios.post('/api/auth/signup', values, { headers: { "Content-Type": "application/json" } })
            setClient(data.token)
            navigate('/home')
        } catch (e) {
            console.log(e)
        }
    }

    const AuthWithLayout = withLayout(Auth)
    return <AuthWithLayout onLogin={handleLogin} onSignup={handleSignup} />
}

export default AuthContainer

AuthContainer.Authorize = Authorize