import { useState } from "react"
import Input from "../Input/Input"
import Form from "../Form/Form"
import Button from "../Button/Button"
import {
  doesBGGGameExist,
  getIdFromLink,
  isBGGLink,
} from "@/utils/bggLinkParserUtils"

interface AddGameByLinkProps {
  refetch: () => any
}

export function AddGameByLink({ refetch }: AddGameByLinkProps) {
  const [bggLink, setBggLink] = useState<string>("")
  const [addLinkError, setAddLinkError] = useState<string>("")
  const [addLinkSuccess, setAddLinkSuccess] = useState<string>("")

  const handleAddGameByLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isBGGLink(bggLink)) {
      const gameId = getIdFromLink(bggLink)
      if (await doesBGGGameExist(gameId)) {
        const addGameRequest = await fetch("/api/user/game", {
          method: "POST",
          body: JSON.stringify({ gameId }),
        })
        const addGameResponse = await addGameRequest.json()
        if (addGameResponse.success) {
          setAddLinkError("")
          setAddLinkSuccess("Game added successfully")
          refetch()
        } else {
          setAddLinkSuccess("")
          setAddLinkError(addGameResponse.error)
        }
      } else {
        setAddLinkSuccess("")
        setAddLinkError("Game does not exist on BGG")
      }
    } else {
      setAddLinkSuccess("")
      setAddLinkError("Please enter a valid BGG link")
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Add game via Board Game Geek link</h3>
      <Form onSubmit={handleAddGameByLink}>
        <Input
          id="bggLink"
          label="Link to a BGG game"
          type="text"
          value={bggLink}
          onChange={(e) => {
            setBggLink(e.target.value)
          }}
          withBorder
        />
        {addLinkError && <p className="text-red-500 pb-3">{addLinkError}</p>}
        {addLinkSuccess && (
          <p className="text-lime-500 pb-3">{addLinkSuccess}</p>
        )}
        <Button text="Add game" type="submit" />
      </Form>
    </div>
  )
}
