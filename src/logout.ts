import { showLoginPage } from "./view/loginview"

export function logoutHandler(){
    localStorage.removeItem('jwt')
    showLoginPage()
}