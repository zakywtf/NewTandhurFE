export type ResponseBase<T> = {
    status: number,
    message: string,
    data: T
}