import { logoutHandler } from "./logout";
import { IQueryRequest, Result } from "./types";

export async function fetchQuery(query:IQueryRequest): Promise<Result<object>> {
    const jwt = localStorage.getItem('jwt')
    try {
        const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
            
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(query)
        });
        
        if (!response.ok) {
            throw new Error('failed fetching data')
        }

        const data = await response.json()

        if ('errors' in data) {
            logoutHandler()
            return [null, new Error(data.errors[0].message)]
        }

        return [data.data, null]
    } catch (error) {
        if (error instanceof Error && error.message.includes('JWTExpired')) {
            logoutHandler()
        }
        return [null, error as Error]
    } 
}