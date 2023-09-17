import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Input from "@/components/Input/Input"
import { useState } from "react"
import { useMutation } from "react-query"
import ChangePassword from "./ChangePassword/ChangePassword"
import DeleteProfile from "./DeleteProfile/DeleteProfile"

export default function UserInfoSection() {
  return (
    <>
      <ChangePassword />
      <DeleteProfile />
    </>
  )
}
