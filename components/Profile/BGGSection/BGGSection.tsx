import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import { useState } from "react"

interface BGGSectionProps {
  bggUsername: string
}

export default function BGGSection({ bggUsername }: BGGSectionProps) {
  const [inputBggUsername, setInputBggUsername] = useState("")

  function handleUsernameSubmit() {
    console.log(inputBggUsername)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">BoardGameGeek details</h2>
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
      <Button text="Submit" onClick={handleUsernameSubmit} />
    </div>
  )
}
