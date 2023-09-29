"use client"

import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Input from "@/components/Input/Input"
import PageTitle from "@/components/PageTitle/PageTitle"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import {  useEffect, useState } from "react"

export default function SignIn() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          setErrorMessage("Invalid username or password.")
          break
        default:
          setErrorMessage("An error occurred while signing in.")
      }
    } else {
      setErrorMessage(null)
    }
  }, [error])

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(username, password);
    
    await signIn("credentials", {
      username,
      password,
      callbackUrl: `${window.location.origin}/shelf`,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <PageTitle>Login</PageTitle>
      <Form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <Input
          id="username"
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
          withBorder
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          withBorder
        />
        {error && <p className="error">{errorMessage}</p>}
        <Button type="submit" text="Sign in" />
      </Form>
    </div>
  )
}
