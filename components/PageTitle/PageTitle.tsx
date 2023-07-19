import { PropsWithChildren } from "react"

export default function PageTitle({ children }: PropsWithChildren) {
  return <h1 className="mt-10 font-bold text-5xl mb-6">{children}</h1>
}
