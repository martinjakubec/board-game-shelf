import AppbarButton from "./AppbarButton";
import AppbarLink from "./AppbarLink"
import { useSession as useAuthSession } from "next-auth/react";

type MenuLink = {
  href: string
  text: string
  protected: boolean
}

export default function Appbar() {
  const { data } = useAuthSession()
  const menuLinks: MenuLink[] = [
    { href: "/shelf", text: "Shelf", protected: true },
    {
      href: "/profile",
      text: data?.user?.username || "Profile",
      protected: true,
    },
  ]

  return (
    <div className="h-20 sticky top-0 bg-lime-500 z-50">
      <div className="container justify-end flex mx-auto p-4 h-full items-center">
        <AppbarLink href="/" text="BGS" className="mr-auto" />
        {menuLinks.map((link, i) => {
          if (link.protected) {
            if (data) {
              return <AppbarLink key={i} href={link.href} text={link.text} />
            } else {
              return
            }
          } else {
            return <AppbarLink key={i} href={link.href} text={link.text} />
          }
        })}
        <LoginButton />
      </div>
    </div>
  )
}

import { useSession, signIn, signOut } from "next-auth/react"
export function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <AppbarButton text="Logout" onClick={() => signOut()} />
      </>
    )
  }
  return (
    <>
      <AppbarLink text="Register" href="/register" />
      <AppbarLink text="Sign in" href="/login" />
    </>
  )
}
