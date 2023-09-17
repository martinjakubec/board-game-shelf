import { isNewPasswordValid } from "@/app/api/apiUtils/passwordValidator"
import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Input from "@/components/Input/Input"
import { useState } from "react"
import { useMutation } from "react-query"

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("")
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)

  const { data, error, mutate } = useMutation(async () => {
    const request = await fetch("/api/user/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    })

    const response = await request.json()

    if (response.success) {
      setOldPassword("")
      setNewPassword("")
      setNewPasswordConfirm("")
      setPasswordError(null)
      setPasswordSuccess("Password changed successfully.")
    } else {
      setPasswordError(response.error)
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError(null)
    if (newPassword !== newPasswordConfirm) {
      setPasswordError("Passwords do not match.")
      return
    }
    if (!isNewPasswordValid(newPassword)) {
      setPasswordError("Password does not meet requirements.")
      return
    }
    mutate()
  }

  return (
    <div className="pt-10">
      <h2 className="text-xl font-semibold">Change Password</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          id="oldPassword"
          withBorder
          value={oldPassword}
          label="Old password"
          type="password"
          required
          onChange={(e) => {
            setOldPassword(e.target.value)
          }}
        />
        <Input
          id="newPassword"
          withBorder
          value={newPassword}
          label="New password"
          type="password"
          required
          onChange={(e) => {
            setNewPassword(e.target.value)
          }}
        />
        <p className="text-xs italic">
          (min. 10 characters, must contain a number, a lowercase and an
          uppercase letter and a special character)
        </p>
        <Input
          id="newPasswordConfirm"
          withBorder
          value={newPasswordConfirm}
          label="Confirm new password"
          type="password"
          required
          onChange={(e) => {
            setNewPasswordConfirm(e.target.value)
          }}
        />
        {passwordError && <p className="text-red-500 pb-4">{passwordError}</p>}
        {passwordSuccess && (
          <p className="text-lime-500 pb-4">{passwordSuccess}</p>
        )}
        <Button text="Change password" type="submit" />
      </Form>
    </div>
  )
}
