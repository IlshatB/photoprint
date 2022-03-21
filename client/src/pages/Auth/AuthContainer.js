import { withLayout } from '../../hocs'
import Auth from './Auth'

const AuthContainer = () => {
    const AuthWithLayout = withLayout(Auth)

    return <AuthWithLayout />
}

export default AuthContainer