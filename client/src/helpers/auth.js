export const setUser = token => {
    console.log('setUser', token)
    localStorage.setItem('authToken', token)
}

export const setClient= token => {
    localStorage.setItem('authToken', token)

}

export const exitClient = () => {
    localStorage.clear()
}
