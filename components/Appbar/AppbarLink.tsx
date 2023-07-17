import Link from 'next/link';

type SidebarLinkProps = {
  href: string;
  text: string;
  className?: string;
};

export default function AppbarLink({href, text, className}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={
        'block text-2xl bg-transparent px-3 text-lime-50 hover:text-lime-800 font-bold rounded-md first:pl-0 last:pr-0' +
        (className ? ' ' + className : '')
      }
    >
      {text}
    </Link>
  );
}
