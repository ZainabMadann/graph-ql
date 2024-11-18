import { fetchQuery } from "../fetchQuery"
import { IQueryRequest, Result } from "../types"

interface UserInfo {
    FirstName: String
    LastName: String
}

export default async function UserInfoModel(): Promise<Result<UserInfo>> {
    const query: IQueryRequest = {
        query: ` query {
                    user{
                    firstName
                    lastName
                }
            }`
    }

    const [data, error] = await fetchQuery(query)

    if (error) {
        return [null, error]
    }


    return [{
        // @ts-expect-error data is not null
        FirstName: data.user[0].firstName,
        // @ts-expect-error data is not null
        LastName: data.user[0].lastName,
    }, null]
}