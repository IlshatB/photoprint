
import { isAuthenticated } from '../../helpers'

import Auth from '../../pages/Auth/AuthContainer'

const AuthGuard = ({ children }) => {
    return isAuthenticated() ? children : <Auth.Authorize />
}

export default AuthGuard