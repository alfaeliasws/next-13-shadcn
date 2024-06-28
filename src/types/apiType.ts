import { OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

export type QueryType<T> = T

export type tokenLoginArray = {password: string, name: string, email: string}[]

export type genericForQueryType = MysqlArray | MysqlArray

export type MysqlArray = RowDataPacket[] | RowDataPacket[][] | ResultSetHeader[] | OkPacket[]
export type MysqlNotArray = OkPacket | ProcedureCallPacket

export type registerResult = {
    message: string,
    status: number,
    action:"register",
    success: number,
    data: {} | []
}
