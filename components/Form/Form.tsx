interface FormProps {
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  className?: string
}

export default function Form({ children, onSubmit, className = '' }: FormProps) {
  return <form className={className} onSubmit={onSubmit}>{children}</form>
}
