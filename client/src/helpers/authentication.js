import jwt_decode from "jwt-decode"

export const setUser = token => {
    console.log('setUser', token)
    localStorage.setItem('authToken', token)
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken')
    return Boolean(token)
}

export const authGuard = Boolean(localStorage.getItem('authToken'))

export const AuthGuard = ({ children }) => {
    const isAuthenticated= Boolean(localStorage.getItem('authToken'))

    return isAuthenticated ? children : null
}

export const GuestGuard = ({ children }) => {
    const isAuthenticated= Boolean(localStorage.getItem('authToken'))

    return !isAuthenticated ? children : null
}

export const guestGuard = !Boolean(localStorage.getItem('authToken'))

export const CurrentUser = () => {
    const token = localStorage.getItem('authToken')
    const { email } = jwt_decode(token)

    return {
        email
    }
    
}

export const exitUser = () => localStorage.clear()