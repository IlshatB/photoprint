import jwt_decode from "jwt-decode"

const getToken = () => {
    const token = localStorage.getItem('authToken')
    return token
}

const useCurrentClient = () => {
    const token = getToken()
    const client = token ? jwt_decode(token) : {}

    return { client, isAuthenticated: Boolean(token), token }
}

export default useCurrentClient