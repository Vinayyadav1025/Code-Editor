import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are logged in with email: ${email} and password: ${password}`);

    setState({ email: "", password: "" });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} className="sign-in-form">
        <h1 className="welcome-heading">Sign in</h1>
        <div className="social-container">
          <a href="#" className="fab fa-facebook-f social facebook" />
          <a href="#" className="fab fa-google-plus-g social google" />
          <a href="#" className="fab fa-linkedin-in social linkedin" />
        </div>
        <span className="welcome-text">or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          className="email-input sign-in-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="password-input sign-in-input"
        />
        <a href="#" className="forgot-password">
          Forgot your password?
        </a>
        <button className="sign-in-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
