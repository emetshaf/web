import { useState } from "react";
import { Link } from "react-router-dom";
import { signinFields } from "../constants";
import { FormAction, Input } from "../components";

// if (localStorage.getItem("token")) {
//   window.location.href = "/";
// }

const fields = signinFields;
let fieldState = {};
fields.forEach((field) => (fieldState[field.id] = ""));

const SigninPage = () => {
  const [signinState, setSigninState] = useState(fieldState);

  const handleChange = (e) => {
    setSigninState({ ...signinState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = () => {
    let signinFields = {
      username: signinState["username"],
      password: signinState["password"],
    };

    const endpoint = "http://localhost:8080/auth/signin";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinFields),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.auth_token) {
          localStorage.setItem(
            "token",
            data.auth_token,
            { path: "/" },
            { secure: true },
            { sameSite: "strict" },
            { maxAge: 60 * 60 * 24 },
            { domain: "localhost" },
            { expires: new Date(Date.now() + 60 * 60 * 24) }
          );
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid username or password");
      });
  };

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signinState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <FormAction handleSubmit={handleSubmit} text="Signin" />
      </form>
      <div className="mt-5">
        <p className="text-center text-sm text-gray-600">
          <span className="font-medium">Don't have an account?</span>
          <Link
            to="/signup"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default SigninPage;
