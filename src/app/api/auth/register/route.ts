import { MysqlArray, MysqlNotArray, QueryType } from '@/types/apiType';
import query from '@/config/db';
import { validateFilter } from '@/utils/helper';
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export type registerResult = {
    message: string,
    status: number,
    action:"register",
    success: number,
    data: any
}

export async function POST(req: Request) {
    const request = await req.json()
    let data: [] | {} = [];
    let message: string = ""
    let status: number = 1
    let success: number = 204
    const { email, phone, name, password } = request  

    const validate = `SELECT id FROM users WHERE (email='${email}' ${phone ? `OR phone=${phone}` : ``}) AND deleted_at IS NULL; --`;

    const fetchQueryValidate = await query(validate);

    const dataValidate = validateFilter(fetchQueryValidate)

    let registerResult: {id: number}[] | QueryType<MysqlArray | MysqlNotArray> = [];
    
    if(JSON.stringify(dataValidate) === JSON.stringify([])){ 
        
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)

      const queryRegister = `INSERT INTO users SET name='${name}', email='${email}', password='${hash}', salt='${salt}' ${phone ? `, phone='${phone}'` : ``};`
      registerResult = await query(queryRegister)

      data = registerResult
      message = "Register Success"
      status = 1
      success = 200
    
    } else {
        
      data = []
      message = "Email Is Registered"
      status = 0
      success = 204
    
    }

    try {
      // Get all admins using Prisma  
        return NextResponse.json({
                message,
                status,
                action:"register",
                success,
                data
                }, {
                status: 200,
        });
    
    } catch (error) {

    return NextResponse.json(
        { 
            error: "Failed to register", 
            message:"Failed to register",
            status:204,
            action:"register",
            success:0,
            data:[]
        },
        {
          status: 500,
        }
      );
    }
  }
