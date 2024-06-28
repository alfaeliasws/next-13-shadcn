"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { apiCall } from "@/utils/fetcher"
import { useRouter } from 'next/navigation'
// import { hashPassword } from "@/utils/password"
import useDeleteLs from "@/utils/useDeleteLs"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { useState } = React;
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  useDeleteLs()

  async function register() {
    
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    
    setIsLoading(true)

    // const encrypted = hashPassword(password)

    if(confirmPassword === password){
      
      const res = await apiCall('/api/auth/register', "POST", {email, password, name} , {}, false)

      if(res?.status === 1){
        console.log("hit this")
        router.push("/login")
      }

    } else {
      setIsLoading(false)
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
              id="name"
              placeholder="Your Name"
              type="text"
              value={name}
              onChange={(e)=>setName(prev => e.target.value)}
              autoCapitalize="none"
              disabled={isLoading}
            />
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
            <Input
              id="confirm_password"
              onChange={(e)=>setConfirmPassword(prev => e.target.value)}
              value={confirmPassword}
              placeholder="Confirm Password"
              type="password"
              disabled={isLoading}
            />
          </div>
          {
            password && confirmPassword && password !== confirmPassword ?
            <p style={{color:"red", fontSize:"0.8em"}}>Password and Confirmed Password is not the same!</p> :
            <></>
          }
          <Button disabled={isLoading || (password !== confirmPassword) || email === "" || !password || !confirmPassword } 
            onClick={(e)=>{
              e.preventDefault
              register()
            }}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register with Email
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