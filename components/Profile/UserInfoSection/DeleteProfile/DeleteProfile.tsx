import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Input from "@/components/Input/Input"
import { signOut } from "next-auth/react"
import { useState } from "react"

export default function DeleteProfile() {
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [deleteError, setDeleteError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (deleteConfirmation !== "DELETE") {
      return
    }
    const deleteRequest = await fetch("/api/user", {
      method: "DELETE",
    })
    const deleteResponse = await deleteRequest.json()
    if (deleteResponse.success) {
      await signOut()
    } else {
      setDeleteError(deleteResponse.error)
    }
  }

  return (
    <div className="pt-10">
      <h2 className="text-xl font-semibold">Delete profile</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          id="deleteConfirmation"
          label="Write 'DELETE' to confirm."
          required
          withBorder
          type="text"
          value={deleteConfirmation}
          onChange={(e) => {
            setDeleteConfirmation(e.target.value)
          }}
        />
        {deleteError && <p className="text-red-500 pb-4">{deleteError}</p>}
        <Button text="Delete profile" type="submit" variant="danger" />
      </Form>
    </div>
  )
}
