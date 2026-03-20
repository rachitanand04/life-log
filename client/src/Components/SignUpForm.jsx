function SignupForm() {
  return (
    <div>
      <div className="signup-form">
        <h1>Signup</h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
