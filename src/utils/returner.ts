import { NextResponse } from "next/server";

export function returner(message: string, status:number, action: string, success: number, data: any){
    try {
        // Get all admins using Prisma  
            return NextResponse.json({
                    message,
                    status,
                    action,
                    success,
                    data
                    }, {
                    status: 200,
            });
        
        } catch (error) {

        return NextResponse.json(
            { 
                error, 
                message,
                status:204,
                action,
                success:0,
                data:[]
            },
            {
            status: 500,
            }
        );
    }
}