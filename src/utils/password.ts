// import { config } from "@/config/config"
// import jwt from 'jsonwebtoken'

// export function hashPassword(password: string): string{
//     const key: string | null = config.jwt1 === undefined ? null : config.jwt1

//     const encrypted: string | undefined = jwt.sign(password, key, { algorithm: 'HS256' })


//     return encrypted
// }

// export function verifyPassword(dbPassword: string, inputPassword: string): boolean{
//     const key: string | null = config.jwt1 === undefined ? null : config.jwt1

//     const verifyDBPassword = jwt.verify(dbPassword, key, {algorithms: ['HS256']});

//     if(verifyDBPassword === inputPassword){
//         return true
//     } else {
//         return false
//     }

// }