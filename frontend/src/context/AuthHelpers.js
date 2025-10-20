export function getToken() {
    return localStorage.getItem('token')
}
export function getTokenExpiry() {
    const t = localStorage.getItem('tokenExpiry')
    return t ? Number(t) : null
}
export function clearAuth() {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiry')
    localStorage.removeItem('user')
}