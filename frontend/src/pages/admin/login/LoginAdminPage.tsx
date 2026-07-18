import { useLoginForm } from "./useLoginForm";
import { useAuth } from "../../../contexts/AuthContext";
import "./LoginAdmin.css";

function LoginAdmin() {
  const {
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    onSubmit,
    errors,
  } = useLoginForm();
  const { loading } = useAuth();

  return (
    <div className="admin-login-container page">
      <h1>Admin</h1>
      {errors.server ? <p className="error">{errors.server}</p> : null}
      <form onSubmit={onSubmit}>
        <div className="input-login">
          <p>Username:</p>
          <input
            className={errors.username ? "inputErrors" : ""}
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          {errors.username ? <p className="error">{errors.username}</p> : null}
        </div>

        <div className="input-login">
          <p>Password: </p>
          <input
            className={errors.password ? "inputErrors" : ""}
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password ? <p className="error">{errors.password}</p> : null}
        </div>

        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginAdmin;
