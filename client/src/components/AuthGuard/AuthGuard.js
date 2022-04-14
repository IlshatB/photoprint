
import { useCurrentClient} from '../../hooks'

import Auth from '../../pages/Auth/AuthContainer'

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useCurrentClient()
    return isAuthenticated ? children : <Auth.Authorize />
}

export default AuthGuard