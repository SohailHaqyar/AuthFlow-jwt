import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
let URL = "http://localhost:3001/api";

// Validation Schemas
const RegisterSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

const LoginSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().min(6).required(),
});

function Authentication({ history, setUser }) {
  const [rightPanelActive, toggle] = React.useState(false);
  const [isLoginErr, setLoginErr] = React.useState(false);
  const [isRegisterErr, setRegisterErr] = React.useState(false);
  return (
    <div className="App">
      <div
        className={`container ${rightPanelActive ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <div className="Auth_form">
            <h1 className="Auth_header">Create Account</h1>
            <div className="social-container">
              <button className="social">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="social">
                <i className="fab fa-google-plus-g"></i>
              </button>
              <button className="social">
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
            <span style={{ fontSize: "14px" }}>
              or use your email for registration
            </span>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={RegisterSchema}
              onSubmit={(values, actions) => {
                axios
                  .post(`${URL}/register`, values)
                  .then((res) => {
                    setUser(res.data.user);
                    history.push("/profile");
                    setRegisterErr(false);
                  })
                  .catch((e) => setRegisterErr(true));
                // actions.resetForm();
              }}
            >
              {(props) => (
                <form
                  className="Auth__forms__Form row"
                  onSubmit={props.handleSubmit}
                >
                  <div className="input-field col s12">
                    <input
                      className="Auth_input"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      name="name"
                      value={props.values.name}
                      id="register_name"
                    />
                    <label htmlFor="register_name">Name</label>
                    {props.touched.name && props.errors.name && (
                      <span className="helper-info">*{props.errors.name}</span>
                    )}
                  </div>
                  <div className="input-field col s12">
                    <input
                      className="Auth_input"
                      type="text"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      name="email"
                      value={props.values.email}
                      id="register_email"
                    />
                    <label htmlFor="register_email">Email</label>
                    {props.touched.email && props.errors.email && (
                      <span className="helper-info">*{props.errors.email}</span>
                    )}
                  </div>
                  <div className="input-field col s12">
                    <input
                      className="Auth_input"
                      type="password"
                      id="register_password"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      name="password"
                      value={props.values.password}
                    />
                    <label htmlFor="register_password">password</label>
                    {props.touched.password && props.errors.password && (
                      <span className="helper-info">
                        *{props.errors.password}
                      </span>
                    )}
                  </div>
                  <button className="Auth_button" type="submit">
                    Register
                  </button>
                </form>
              )}
            </Formik>
            {isRegisterErr ? (
              <h5 className="red-text text-accent-2">
                *Registration Miserably Failed
              </h5>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-container sign-in-container">
          <div action="#" className="Auth_form">
            <h1 className="Auth_header">Login</h1>
            <div className="social-container">
              <button className="social">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="social">
                <i className="fab fa-google-plus-g"></i>
              </button>
              <button className="social">
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
            <span style={{ fontSize: "14px" }}>or use your account</span>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values, actions) => {
                axios
                  .post(`${URL}/login`, values)
                  .then((res) => {
                    setUser(res.data.user);
                    history.push("/profile");
                    setLoginErr(false);
                  })
                  .catch((e) => setLoginErr(true));
              }}
            >
              {(props) => (
                <form
                  className="Auth__forms__Form row"
                  onSubmit={props.handleSubmit}
                >
                  <div className="input-field col s12">
                    <input
                      className="Auth_input"
                      type="text"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      name="email"
                      value={props.values.email}
                      id="login_email"
                    />
                    <label htmlFor="login_email">Email</label>
                    {props.touched.email && props.errors.email && (
                      <span className="helper-info">*{props.errors.email}</span>
                    )}
                  </div>
                  <div className="input-field col s12">
                    <input
                      className="Auth_input"
                      type="password"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      name="password"
                      value={props.values.password}
                    />
                    <label htmlFor="login_password">Password</label>
                    {props.touched.password && props.errors.password && (
                      <span className="helper-info">
                        *{props.errors.password}
                      </span>
                    )}
                  </div>
                  <button
                    style={{
                      color: "#aaa",
                      fontSize: "14px",
                      margin: "10px auto",
                      display: "block",
                      outline: "none",
                      border: "none",
                      background: "white",
                    }}
                  >
                    Forgot your password?
                  </button>
                  <button className="Auth_button" type="submit">
                    Login
                  </button>
                </form>
              )}
            </Formik>
            {isLoginErr ? (
              <h5 className="red-text text-darken-2">
                *Authentication Failed Miserably Try the Fuck again
              </h5>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="Auth_header">Welcome Back!</h1>
              <p className="Auth_paragraph">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="Auth_button ghost"
                id="signIn"
                onClick={() => toggle(!rightPanelActive)}
              >
                Register
              </button>
            </div>
            <div className="overlay-panel overlay-left">
              <h1 className="Auth_header">Hello, Friend!</h1>
              <p className="Auth_paragraph">
                Enter your personal details and start journey with us
              </p>
              <button
                className="Auth_button ghost"
                id="signUp"
                onClick={() => toggle(!rightPanelActive)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
