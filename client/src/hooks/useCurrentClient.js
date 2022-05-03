import jwt_decode from "jwt-decode"

const getToken = () => {
    const token = localStorage.getItem('authToken')
    return token
}

const setToken = token => {
    localStorage.setItem('authToken', token)
}

const exit = () => localStorage.clear()

const useCurrentClient = () => {
    const token = getToken()
    const client = token ? jwt_decode(token) : {}

    return { client, isAuthenticated: Boolean(token), token, setToken, exit }
}

export default useCurrentClient