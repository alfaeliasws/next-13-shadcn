"use client"

import * as React from "react"
import * as ls from 'local-storage';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { apiCall } from "@/utils/fetcher"
import { useRouter } from 'next/navigation'
// import { hashPassword } from "@/utils/password"
import useDeleteLs from "@/utils/useDeleteLs";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginAuthForm({ className, ...props }: UserAuthFormProps) {
  const { useState } = React;
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useDeleteLs()

  async function login() {
    
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    
    setIsLoading(true)

    const res = await apiCall('/api/auth/login', "POST", {email, password} , {}, false)

    if(res?.status === 1){
      ls.set("token", res?.data?.token )
      router.push("/")
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <form onSubmit={onSubmit}> */}
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e)=>setEmail(prev => e.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              />
            <Input
              id="password"
              value={password}
              onChange={(e)=>setPassword(prev => e.target.value)}
              placeholder="Password"
              type="password"
              disabled={isLoading}
              />
          </div>
          <Button disabled={isLoading || email === "" || !password } 
            onClick={(e)=>{
              e.preventDefault
              login()
            }}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login with Email
          </Button>
        </div>
      {/* </form> */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  )
}