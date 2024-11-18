export type Result<T> = readonly [T, null] | readonly [null, Error]

export interface IQueryRequest {
    query : string
    variables : {}
}