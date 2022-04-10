import { withLayout } from '../../hocs'

import Authorize from './components/Authorize'
import Auth from './Auth'

const AuthContainer = () => {
    const AuthWithLayout = withLayout(Auth)

    return <AuthWithLayout />
}

export default AuthContainer

AuthContainer.Authorize = Authorize