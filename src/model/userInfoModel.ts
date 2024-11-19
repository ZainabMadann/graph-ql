import { fetchQuery } from "../fetchQuery"
import { IQueryRequest, Result } from "../types"

interface UserInfo {
    FirstName: String
    LastName: String
    Level: number
}

interface Project {
    Captain: String
    Name: string
}

interface Skill {
    amount: number
    type: string
}

interface Progress {
    Amount: number
    Date: string
    ProjectName: string
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

export async function getBestSkills(): Promise<Result<Skill[]>> {
    const id = await getUserId()
    const query: IQueryRequest = {
        query: `      
query skills($userId: Int) {
  user(where: {id: {_eq: $userId}}) {
    transactions(
      order_by: [{type: desc}, {amount: desc}]
      distinct_on: [type]
      where: {userId: {_eq: $userId}, 
      type: {_in: ["skill_js", "skill_go", "skill_html", "skill_prog", "skill_front-end", "skill_back-end"]}}
    ) {
      type
      amount
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
    //@ts-ignore
    const user = data.user[0]
    if (!user || !user.transactions) {
        console.error('No skill data found.')
        throw new Error('No skills available for this user.')
    }

    const skills: Skill[] = user.transactions.map((transaction: any) => ({
        type: transaction.type,
        amount: transaction.amount,
    }))

    return [skills, null]
}


export async function getUserProgress(): Promise<Result<Progress[]>> {
    const query: IQueryRequest = {
        query: `      
query{
  transaction(
    where: { _and: [
      {type: { _eq: "xp" }},
      {object: {type: {_eq: "project"}}}
    ] }
    order_by: { createdAt: asc }
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
        return [null, error]
    }
    //@ts-ignore
    const transactions = data?.transaction || [];
    const progress: Progress[] = transactions.map((transaction: any) => ({
        Amount: transaction.amount,
        Date: transaction.object.updatedAt,
        ProjectName: transaction.object.name
    }));

    return [progress, null]
}
