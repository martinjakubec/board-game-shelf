import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Input from "@/components/Input/Input"
import { useState } from "react"

export default function DeleteProfile() {
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // if (deleteConfirmation !== "DELETE") {
    //   return
    // }
    console.log("delete profile")
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
      </Form>
      <Button text="Delete profile" variant="danger" />
    </div>
  )
}
