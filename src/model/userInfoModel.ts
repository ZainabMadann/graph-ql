import { fetchQuery } from "../fetchQuery"
import { IQueryRequest, Result } from "../types"

interface UserInfo {
    FirstName: String
    LastName: String
    Level: number
}

interface Project {
    Captain: String
    Name:string
}


export default async function UserInfoModel(): Promise<Result<UserInfo>> {
    const id = await getUserId()
    
    const query: IQueryRequest = {
        query: ` query GetUserInfo($userId: Int) {
  event_user(where: {userId: {_eq: $userId}, eventId: {_eq: 20}}) {
    level
  }
  user(where: {id: {_eq: $userId}}) {
    firstName
    lastName
  }
}
            `
        , variables: { userId: id }
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
        // @ts-expect-error data is not null
        Level: data.event_user[0].level,
    }, null]
}

export async function getUserId(): Promise<number> {
    const query: IQueryRequest = {
        query: ` 
        query{
            user{
            id
        }
    }
    `
        , variables: {}
    }

    const [data, error] = await fetchQuery(query)

    if (error) {
        return 0
    }

    //@ts-ignore
    return data.user[0].id
}


export async function getLastProject(): Promise<string | null> {
    const query: IQueryRequest = {
        query: `      
query{
    transaction(
    where: { _and: [
        {type: { _eq: "xp" }},
        {object: {type: {_eq: "project"}}}
    ] }
    order_by: { createdAt: desc }
    limit:1
    ){
    id
    amount
        object{
        type
        id
        name
        updatedAt
    }
    }
}
    `
        , variables: {}
    }

    const [data, error] = await fetchQuery(query)

    if (error) {
        return null
    }

    //@ts-ignore
    return data.transaction[0].object.name
}



export async function getLastAudit(): Promise<Result<Project>> {
    const id = await getUserId()
    const query: IQueryRequest = {
        query: `      
query LastAudit($userId: Int) {
    audit(
    where: {auditorId: {_eq: $userId}, grade: {_is_null: false}}
    limit: 1
    order_by: {endAt: desc}
    ) {
    grade
    group {
        captainLogin
        object{
        name
        }
    }
    }
}
    `
    , variables: { userId: id }
    }

    const [data, error] = await fetchQuery(query)

    if (error) {
        return [null, error]
    }


    return [{
        // @ts-expect-error data is not null
        Captain: data.audit[0].group.captainLogin,
        // @ts-expect-error data is not null
        Name: data.audit[0].group.object.name
    }, null]
}

