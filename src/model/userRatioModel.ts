import { fetchQuery } from "../fetchQuery"
import { IQueryRequest, Result } from "../types"

interface UserRatio {
    totalRatio: Number
    totalUp: Number
    totalDown: Number
}


export default async function UserRatioModel(): Promise<Result<UserRatio>> {
    const query: IQueryRequest = {
        query: ` query {
                user{
                    auditRatio
                    totalUp
                    totalDown
                    email
                    login
                }
            }`
         ,variables:{}
    }
    
    const [data, error] = await fetchQuery(query)
    
    if (error){
        return [null, error]
    }

    // console.log(data)
    
    return [{
        // @ts-expect-error data is not null
        totalRatio: data.user[0].auditRatio,
        // @ts-expect-error data is not null
        totalUp: data.user[0].totalUp,
        // @ts-expect-error data is not null
            totalDown: data.user[0].tot