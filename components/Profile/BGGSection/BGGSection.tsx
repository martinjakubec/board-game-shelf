import { ApiError, ApiSuccess } from "@/app/api/apiUtils/apiUtils"
import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Input from "@/components/Input/Input"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"

interface BGGSectionProps {
  username: string
}

export default function BGGSection({ username }: BGGSectionProps) {
  const [inputBggUsername, setInputBggUsername] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")

  const {
    data: bggUsername,
    isLoading,
    refetch,
  } = useQuery("user", async (): Promise<string> => {
    const request = await fetch(`/api/user/bggUsername/${username}`)
    const response: ApiSuccess<{ bggUsername: string }> | ApiError =
      await request.json()
    if (response.success) {
      return response.data.bggUsername
    }
    throw new Error(response.error)
  }, {
    enabled: !!username,
  })

  useEffect(() => {
    setInputBggUsername(bggUsername || "")
  }, [bggUsername])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const bggChangeRequest = await fetch(`/api/user/bggUsername/`, {
        method: "POST",
        body: JSON.stringify({ bggUsername: inputBggUsername }),
      })
      const bggChangeResponse = await bggChangeRequest.json()

      if (bggChangeResponse.success) {
        setErrorMessage("")
        setSuccessMessage("Successfully updated BGG username")
        refetch()
        return
      }
      setSuccessMessage("")
      setErrorMessage(bggChangeResponse.error)
    } catch (err) {
      setErrorMessage((err as Error).message)
      console.error(err)
    }
  }

  return (
    <div className="pt-10">
      <h2 className="text-xl font-semibold">BoardGameGeek details</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          id="bggUsername"
          withBorder
          value={isLoading ? "Loading..." : inputBggUsername}
          label="BGG user to import shelf from"
          type="text"
          onChange={(e) => {
            setInputBggUsername(e.target.value)
          }}
        />
        {errorMessage && <p className="text-red-500 pb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-lime-500 pb-4">{successMessage}</p>
        )}
        <div className="flex gap-4">
          <Button text="Submit" type="submit" variant="darker" />
          <Button
            text="Reset"
            type="button"
            variant="light"
            onClick={() => {
              setInputBggUsername(bggUsername || "")
            }}
          />
        </div>
      </Form>
    </div>
  )
}
