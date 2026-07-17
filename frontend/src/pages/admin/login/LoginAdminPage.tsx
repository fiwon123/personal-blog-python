import { useLoginForm } from './useLoginForm';
import { useAuth } from '../../../contexts/AuthContext';
import "./LoginAdmin.css"

function LoginAdmin() {
  const { username, handleUsernameChange,
    password, handlePasswordChange,
    onSubmit, errors,
  } = useLoginForm()
  const { loading } = useAuth()


  return (
    <div className="admin-login-container page">
      <h1>Admin</h1>
      <form onSubmit={onSubmit} >
        <label>
          Username:
          <input className={errors.username ? "inputErrors" : ""} name="username" value={username} onChange={handleUsernameChange} />
        </label>
        <p className="error">{errors.username}</p>

        <label>
          Password:
          <input className={errors.password ? "inputErrors" : ""} name="password" value={password} onChange={handlePasswordChange} />
        </label>
        <p className="error">{errors.password}</p>

        <button type='submit' disabled={loading}  >Login</button>
      </form>
    </div >
  )
}

export default LoginAdmin;
