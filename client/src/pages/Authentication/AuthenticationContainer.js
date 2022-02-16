
import withPageWrapper from '../../hocs/withPageWrapper/withPageWrapper'

import Authentication from './Authentication'

const AuthenticationContainer = () => {
    const AuthenticationWithPageWrapper = withPageWrapper(Authentication)

    return <AuthenticationWithPageWrapper />
    
}

export default AuthenticationContainer