import { useState } from "react"
import Input from "../Input/Input"

export function AddGameByLink() {
  const [bggLink, setBggLink] = useState<string>("")
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Add game via Board Game Geek link</h3>
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
    </div>
  )
}
