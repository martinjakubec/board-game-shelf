import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Input from "@/components/Input/Input"
import { useState } from "react"
import { useMutation } from "react-query"

interface BGGSectionProps {
  bggUsername: string
}

export default function BGGSection({ bggUsername }: BGGSectionProps) {
  const [inputBggUsername, setInputBggUsername] = useState("")

  // const { mutate } = useMutation(async () => {
  //   const response = await fetch("/api/user", {
  //     method: "POST",
  //     body: JSON.stringify({ bggUsername: inputBggUsername }),
  //   })
  // })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(inputBggUsername)
  }

  return (
    <div className="pt-10">
      <h2 className="text-xl font-semibold">BoardGameGeek details</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          id="bggUsername"
          withBorder
          value={bggUsername}
          label="BGG user to import shelf from"
          type="text"
          onChange={(e) => {
            setInputBggUsername(e.target.value)
          }}
        />
        <Button text="Submit" type="submit" />
      </Form>
    </div>
  )
}
