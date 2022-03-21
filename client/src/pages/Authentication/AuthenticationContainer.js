
import { withPageWrapper } from '../../hocs'
import Authentication from './Authentication'

const AuthenticationContainer = () => {
    const AuthenticationWithPageWrapper = withPageWrapper(Authentication)

    const handleRegister = values => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(values)
            resolve('register')
        }, 1000)
    })

    const handleLogin = values => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(values)
            resolve('login')
        }, 1000)
    })


    return <AuthenticationWithPageWrapper onRegister={handleRegister} onLogin={handleLogin} />
    
}

export default AuthenticationContainer