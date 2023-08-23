"use client"

import GameGrid from "@/components/GameGrid/GameGrid"
import PageTitle from "@/components/PageTitle/PageTitle"
import { FormEventHandler, useRef, useState } from "react"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { userCollectionFetcher } from "@/utils/collection/fetcher"

export default function Home() {
  const startId = "199792,199793,174430,3955,284742,154203,218804"
  const {
    data: boardgamesData,
    error,
    isLoading,
  } = useSWR("Aenelruun", userCollectionFetcher)

  const [otherUsername, setOtherUsername] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const inputValue = inputRef.current?.value.trim()
    if (inputValue) {
      console.log(inputValue)
      router.push(`/shelf/${inputValue}`)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Your shelf</PageTitle>
        <form onSubmit={handleSubmit} className="flex gap-4 h-10">
          <input
            ref={inputRef}
            type="text"
            className="w-80 px-4 rounded-md"
            placeholder="Username to find shelf for..."
          ></input>
          <button type="submit" className="bg-lime-300 px-4 rounded-md">
            Go!
          </button>
        </form>
      </div>
      {isLoading && <p className="text-slate-600 text-lg">Loading...</p>}
      {boardgamesData && (
        <div className="flex justify-between flex-wrap">
          {/* {JSON.stringify(boardgamesData.items.item[0])} */}
          <GameGrid boardgames={boardgamesData.items.item} />
        </div>
      )}
    </>
  )
}
