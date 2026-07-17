import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext';

export function useLoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ username: "", password: "" })

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value
    const newErrors = { ...errors }

    if (newUsername == "") {
      newErrors.username = "Username is empty"
    } else {
      newErrors.username = ""
    }

    setErrors(newErrors)
    setUsername(newUsername)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    const newErrors = { ...errors }

    if (newPassword == "") {
      newErrors.password = "Password is empty"
    } else {
      newErrors.password = ""
    }

    setErrors(newErrors)
    setPassword(e.target.value)
  }


  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = { ...errors }
    if (username == "") {
      newErrors.username = "Username is empty"
    } else {
      newErrors.username = ""
    }


    if (password == "") {
      newErrors.password = "Password is empty"
    } else {
      newErrors.password = ""
    }

    console.log(newErrors)
    if (newErrors.username != "" || newErrors.password != "") {
      setErrors(newErrors)
      return
    }


    try {
      await login(username, password)

      navigate('/admin')
    } catch (err) {
      console.log("login error: ", err)
    }


  }

  return {
    username, handleUsernameChange,
    password, handlePasswordChange,
    errors,
    onSubmit
  }
}

