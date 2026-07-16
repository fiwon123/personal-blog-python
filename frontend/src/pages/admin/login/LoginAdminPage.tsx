import { useUsername, usePassword } from './useLoginForm';
import { useNavigate } from 'react-router-dom'
import "./LoginAdmin.css"
import { useAuth } from '../../../contexts/AuthContext';

function LoginAdmin() {
  const { username, handleUsernameChange } = useUsername()
  const { password, handlePasswordChange } = usePassword()
  const navigate = useNavigate()
  const { login, loading } = useAuth()

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await login(username, password)

      navigate('/admin')
    } catch (err) {
      console.log("login error: ", err)
    }


  }

  return (
    <div className="container">
      <h1>Admin</h1>
      <form onSubmit={onSubmit} >
        <label>
          Username:
          <input name="username" value={username} onChange={handleUsernameChange} />
        </label>

        <label>
          Password:
          <input name="password" value={password} onChange={handlePasswordChange} />
        </label>

        <input type='submit' disabled={loading} value="Submit" />
      </form>
    </div>
  )
}

export default LoginAdmin;
