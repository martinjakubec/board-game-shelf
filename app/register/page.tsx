"use client"

import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Input from "@/components/Input/Input"
import PageTitle from "@/components/PageTitle/PageTitle"
import { useEffect, useState } from "react"
import { isNewPasswordValid } from "../api/apiUtils/passwordValidator"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordRepeat, setPasswordRepeat] = useState<string>("")
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)

  const router = useRouter()

  const { status } = useSession()

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (shouldRedirect) {
      interval = setTimeout(() => {
        router.push("/login")
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [shouldRedirect, router])

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/shelf")
    }
  }, [status, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== passwordRepeat) {
      setErrorMessage("Passwords do not match.")
      return
    }
    if (!isNewPasswordValid(password)) {
      setErrorMessage("Password criteria not met.")
      return
    }
    try {
      if (username && password && passwordRepeat) {
        const signupRequest = await fetch("/api/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })
        const signupResponse = await signupRequest.json()
        if (signupResponse.error) {
          setErrorMessage(signupResponse.error)
          return
        }
        if (signupResponse.success) {
          setErrorMessage(null)
          setUsername("")
          setPassword("")
          setPasswordRepeat("")
          setSuccessMessage(
            "Account created successfully. You will be redirected to the login page in 3 seconds."
          )
          setShouldRedirect(true)
          return
        }
      }
    } catch (err) {
      setErrorMessage((err as Error).message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <PageTitle>Sign up</PageTitle>
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
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
        <p className="text-xs italic">
          (min. 10 characters, must contain a number, a lowercase <br /> and an
          uppercase letter and a special character)
        </p>
        <Input
          id="passwordRepeat"
          type="password"
          label="Repeat password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.currentTarget.value)}
          required
          withBorder
        />
        {successMessage && (
          <p className="text-lime-500 pb-4">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 pb-4">{errorMessage}</p>}
        <Button type="submit" text="Submit" />
      </Form>
    </div>
  )
}
