function LoginForm() {
  return (
    <div className="login-form">
        <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
