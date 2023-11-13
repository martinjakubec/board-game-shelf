import { Dispatch, SetStateAction, useState } from "react"
import Input from "../Input/Input"
import { FilterState } from "@/app/shelf/page"

interface FilterBarProps {
  filter: FilterState
  setFilter: Dispatch<SetStateAction<FilterState>>
}

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
  // filter by name - text input
  // filter by number of players - min and max input boxes
  // filter by play time - min and max input boxes
  // filter by complexity - select boxes reflecting the complexity range according to bgg

  return (
    <div>
      <p className="text-lg">Filters</p>
      <div>
        <Input
          id="game-name"
          label="Name"
          type="text"
          value={filter.name || ""}
          onChange={(e) => {
            setFilter({ ...filter, name: e.target.value })
          }}
        />
      </div>
      <div>
        <Input
          type="number"
          id="min-players"
          label="Min players"
          value={filter.players || 0}
          min={1}
          onChange={(e) => {
            setFilter({
              ...filter,
              players: parseInt(e.target.value),
            })
          }}
        />
      </div>
      {/* <div>
        <Input
          type="number"
          id="min-playtime"
          label="Min playtime (minutes)"
          value={filter.playTime.min || ""}
          min={1}
        />
        <Input
          type="number"
          id="max-playtime"
          label="Max playtime (minutes)"
          value={filter.playTime.max || ""}
        />
      </div> */}
    </div>
  )
}
