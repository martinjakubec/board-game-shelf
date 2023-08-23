"use client"

import GameGrid from "@/components/GameGrid/GameGrid"
import PageTitle from "@/components/PageTitle/PageTitle"
import { userCollectionFetcher } from "@/utils/collection/fetcher"
import { FormEventHandler, useRef, useState } from "react"
import useSWR from "swr"
import { useRouter } from "next/navigation"

export default function Page({ params }: { params: { username: string } }) {
  const {
    data: boardgamesData,
    error: boardgamesError,
    isLoading,
  } = useSWR(params.username, userCollectionFetcher)

  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

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
        <PageTitle>{params.username}&apos;s shelf</PageTitle>
        <div className="flex gap-4 h-10">
          <form onSubmit={handleSubmit} className="h-full flex gap-4">
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
          <button
            onClick={() => router.push("/shelf")}
            className="bg-lime-200 px-4 rounded-md"
          >
            Reset
          </button>
        </div>
      </div>
      {isLoading && <p className="text-slate-600 text-lg">Loading...</p>}
      {boardgamesError && (
        <p className="text-slate-600 text-lg">{boardgamesError.message}</p>
      )}
      {boardgamesData && (
        <div className="flex justify-between flex-wrap">
          <GameGrid boardgames={boardgamesData.items.item} />
        </div>
      )}
    </>
  )
}
