export function isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt')
    if (token == null ){
        return false
    }
    return true
}