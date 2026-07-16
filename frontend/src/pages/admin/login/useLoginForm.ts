import { useState } from "react";

export function useUsername() {
  const [username, setUsername] = useState("")

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return { username, handleUsernameChange }
}

export function usePassword() {
  const [password, setPassword] = useState("")

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return { password, handlePasswordChange }
}
