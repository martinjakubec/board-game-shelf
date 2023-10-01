import { useRouter } from "next/navigation"
import { FormEventHandler, useRef } from "react"
import PageTitle from "../PageTitle/PageTitle"

interface ShelfBarProps {
  isAnotherUsersCollection: boolean
  username?: string
}

export default function ShelfBar({
  isAnotherUsersCollection,
  username,
}: ShelfBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const inputValue = inputRef.current?.value.trim()
    if (inputValue) {
      router.push(`/shelf/${inputValue}`)
    }
  }

  return (
    <>
      {isAnotherUsersCollection ? (
        <PageTitle>{username}&apos;s shelf</PageTitle>
      ) : (
        <PageTitle>Your shelf</PageTitle>
      )}
      <div className="flex justify-start flex-col md:flex-row mb-10 lg:mb-0">
        <div className="flex gap-4 md:h-10 lg:mb-6">
          <form
            onSubmit={handleSubmit}
            className="lg:h-full flex gap-4 flex-col md:flex-row"
          >
            <input
              ref={inputRef}
              type="text"
              className="w-80 px-4 rounded-md h-10 leading-10 md:leading-normal"
              placeholder="Username to find shelf for..."
            />
            <div className="h-full flex gap-4">
              <button
                type="submit"
                className="bg-lime-300 px-4 rounded-md w-1/2 h-10 md:h-auto"
              >
                Go!
              </button>
              <button
                type="button"
                onClick={() => router.push("/shelf")}
                className="bg-lime-200 px-4 rounded-md w-1/2 h-10 md:h-auto"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
