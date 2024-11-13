interface UserXP {
    totalRatio: Number
    totalUp: Number
    totalDown: Number
}

/**
 * 
 * @throws Throws and error when query fails
 */
export default async function UserXPModel(): Promise<UserXP> {
    const jwt = localStorage.getItem('jwt')
    const query = JSON.stringify({
        query:
            ` query {
                user{
                    auditRatio
                    totalUp
                    totalDown
                    email
                    login
                }
            }`
    })
    try {
        const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
            
            method: 'POST',
            headers: {
                'Authorization': `Basic ${jwt}`,
                'Content-Type': 'application/json',
            },
            body: query
        });
        
        if (!response.ok) {
            throw new Error('failed fetching user xp')
        }

        const data = await response.json()

        return data as UserXP
    } catch (error) {
        console.error('Error:', error)
        throw new Error('Could not fetch data')
    }
}