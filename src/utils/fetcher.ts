import { registerResult } from './../app/api/auth/register/route';
import { NextApiResponse } from "next";

export async function apiCall(url: string, method: string, values: {} | [], options: {}, needAuth: boolean){
    
    let data: Response | ""  = "";
    let result: registerResult;

    if(needAuth){
        data = await fetch(url, {
            method, 
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
            body: method === "POST" ? JSON.stringify(values) : "",
            ...options
        })
    } else {
        data = await fetch(url, {
            method, 
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: method === "POST" ? JSON.stringify(values) : "",
            ...options
        })
    }

    if(data){
        result = await data.json()
        if(JSON.stringify({}) === JSON.stringify(result)){
            return {success: 0, status: 204, data: []}
        } else {
            return result
        }

    }
}