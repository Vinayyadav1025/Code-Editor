import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import OtpInput from 'react-otp-input';

function SignUpForm() {
  const [isOtpSent, setIsOtpSent] = useState(false); // Tracks OTP sent status
  const [otp, setOtp] = useState('');
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Stores email for OTP verification
  const [otpEmail, setOtpEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { name, email, password } = state;

    const data = {
      email,
      username: email.split("@")[0],
      fullName: name,
      collegeName: "",
      course: "",
      password,
      profileImage: "",
    };

    // Signup API call
    fetch("http://localhost:5001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log("SignUp Success:", data);
          setIsOtpSent(true); // Show OTP form
          setOtpEmail(email); // Save email for OTP verification
        } else {
          setErrorMessage(data.message || "SignUp failed. Please try again."); // Show error
        }
      })
      .catch((error) => {
        console.error("SignUp Error:", error);
        setErrorMessage("An error occurred during SignUp. Please try again.");
      });

    setState({ name: "", email: "", password: "" }); // Reset form
  };

  const handleOtpSubmit = (evt) => {
    evt.preventDefault();
    console.log("OTP:", otp);  // Using the `otp` state value
    
    // OTP verification API call
    fetch("http://localhost:5001/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: otpEmail, otp }), // Passing the `otp` state directly
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        if (!data.error) {
          console.log("OTP verified successfully:", data);
          alert("Account created successfully!");
          setIsOtpSent(false); // Reset to SignUp form
          setOtpEmail(""); // Clear email
          setOtp(""); // Clear OTP
          
        } else {
          setErrorMessage(data.message || "OTP verification failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("OTP Verification Error:", error);
        setErrorMessage("An error occurred during OTP verification. Please try again.");
      });
  };
  

  return (
    <div className="form-container sign-up-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {!isOtpSent ? (
        // Render Signup Form
        <form onSubmit={handleOnSubmit} className="sign-up-form">
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g" />
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            placeholder="Name"
            className="name-input sign-up-input"
            required
          />
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            className="email-input sign-up-input"
            required
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            className="password-input sign-up-input"
            required
          />
          <button type="submit" className="sign-up-button">
            Sign Up
          </button>
        </form>
      ) : (
        // Render OTP Verification Form
        <form  onSubmit={handleOtpSubmit} className="otp-form">
          <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
          <button type="submit" className="verify-otp-button">
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
}

export default SignUpForm;
