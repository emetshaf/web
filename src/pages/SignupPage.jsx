import { useState } from "react";
import { Link } from "react-router-dom";
import { signupFields } from "../constants";
import { FormAction, Input } from "../components";

// if (localStorage.getItem("token")) {
//   window.location.href = "/";
// }

const fields = signupFields;
let fieldState = {};
fields.forEach((field) => (fieldState[field.id] = ""));

const SignupPage = () => {
  const [signupState, setSignupState] = useState(fieldState);

  const handleChange = (e) => {
    setSignupState({
      ...signupState,
      [e.target.id]: e.target.value,
    });
  };

  const createAccount = () => {
    const signupFields = {
      username: signupState["...username"],
      password: signupState["...password"],
    };

    const endpoint = "http://localhost:8080/auth/signup";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFields),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.auth_token) {
          localStorage.setItem("token", data.auth_token);
          window.location.href = "/";
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupState["...password"] !== signupState["...confirm_password"]) {
      alert("Passwords don't match");
      return;
    }
    createAccount();
  };

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign up for an account
      </h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              customClass={field.customClass}
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
        </div>
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </form>
      <div className="mt-5">
        <p className="text-center text-sm text-gray-600">
          <span className="font-medium">Already have an account?</span>
          <Link to="/signin" className="text-purple-600 hover:text-purple-500">
            Signin
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignupPage;
