import { PropsWithChildren } from "react"

export default function PageTitle({ children }: PropsWithChildren) {
  return <h1 className="pt-10 pb-6 font-bold text-5xl">{children}</h1>
}
