import { showLoginPage } from "./view/loginview"

// export function logoutHandler(){
//     localStorage.removeItem('jwt')
//     showLoginPage()
// }
export async function logoutHandler(){
    const jwt = localStorage.getItem('jwt')

    try {
        const response = await fetch('https://learn.reboot01.com/api/auth/signout', {
            
            method: 'POST',
            headers: {
                'x-jwt-token': `${jwt}`,
            }
        });

        localStorage.removeItem('jwt')
        
        if (!response.ok) {
            throw new Error('Logout failed')
        }

    } catch (error) {
        console.error(error)
    }
    showLoginPage()
}