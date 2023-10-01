import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Input from "@/components/Input/Input"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useMutation } from "react-query"

interface BGGSectionProps {
  bggUsername: string
  onUsernameChange: () => any
  isLoading: boolean
}

export default function BGGSection({
  bggUsername,
  onUsernameChange,
  isLoading,
}: BGGSectionProps) {
  const [inputBggUsername, setInputBggUsername] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")

  useEffect(() => {
    setInputBggUsername(bggUsername)
  }, [bggUsername])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const bggChangeRequest = await fetch("/api/user/bggUsername", {
        method: "POST",
        body: JSON.stringify({ bggUsername: inputBggUsername }),
      })
      const bggChangeResponse = await bggChangeRequest.json()

      if (bggChangeResponse.success) {
        setErrorMessage("")
        setSuccessMessage("Successfully updated BGG username")
        onUsernameChange()
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
              setInputBggUsername(bggUsername)
            }}
          />
        </div>
      </Form>
    </div>
  )
}
