import jwt_decode from "jwt-decode"

const getToken = () => {
    const token = localStorage.getItem('authToken')
    return token
}

const useCurrentUser = () => {
    const token = getToken()
    const { email } = jwt_decode(token)

    const user = { email }

    return { user }
}

export default useCurrentUser