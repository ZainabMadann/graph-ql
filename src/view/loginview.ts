
import van from "vanjs-core";
import { showHomePage } from "./homeview";

const { div, form, input, button } = van.tags

export function showLoginPage() {
    document.body.innerHTML = ''

    document.body.appendChild(loginView())
}

function loginView(): HTMLDivElement {

    return div(
        { id: 'wrapper' }, 
        div(
            form(
                { id: 'loginbox', onsubmit: loginHandler },
                input({ id: 'username', type: 'text', placeholder: 'Email or Username', required: true }),
                input({ id: 'password', type: 'password', placeholder: 'Password', required: true }),
                button({ id: 'loginbutton', textContent: 'SUBMIT', type: 'submit' })
            )
        )
    )
}

async function loginHandler(e: SubmitEvent) {
    e.preventDefault()
    
    const username = document.getElementById('username') as HTMLInputElement | null
    const password = document.getElementById('password') as HTMLInputElement | null

    if (!username){
        console.log('username is not there')
        return
    }

    if (!password){
        console.log('password is not there')
        return
    }

    const credentials = btoa(`${username.value}:${password.value}`)

    try {
        const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
            
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
            }
        });
        
        if (!response.ok) {
            throw new Error('Login failed')
        }

        const data = await response.text()
        localStorage.setItem('jwt', data.slice(1, -1))
        showHomePage()
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials and try again.')
    }
}