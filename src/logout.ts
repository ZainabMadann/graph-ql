import { showLoginPage } from "./view/loginview"

// export function logoutHandler(){
//     localStorage.removeItem('jwt')
//     showLoginPage()
// }
export async function logoutHandler(){
    const jwt = localStorage.getItem('jwt')

    try {
        const response = await fetch('https://learn.reboot01.com/api/auth/expire', {
            
            method: 'GET',
            headers: {
                'x-jwt-token': `${jwt}`,
            }
        });

        localStorage.removeItem('jwt')
        
        if (!response.ok) {
            throw new Error('Logout failed')
        }

        showLoginPage()
    } catch (error) {
        console.error('Error:', error);
        alert('logout failed.')
    }
    
}