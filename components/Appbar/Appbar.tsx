import AppbarLink from './AppbarLink';

export default function Appbar() {
  const menuLinks: {href: string; text: string}[] = [
    {href: '/shelf', text: 'Shelf'},
    {href: '#', text: 'Login/out'},
  ];

  return (
    <div className="h-20 sticky top-0 bg-lime-500 z-50">
      <div className="container justify-end flex mx-auto p-4 h-full items-center">
        <AppbarLink href="/" text="BGS" className="mr-auto" />
        {menuLinks.map((link, i) => (
          <AppbarLink key={i} href={link.href} text={link.text} />
        ))}
        <LoginButton />
      </div>
    </div>
  );
}

import { useSession, signIn, signOut } from "next-auth/react"
export function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}