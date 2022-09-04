import React from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hook/input";
import { useAppDispatch } from "../hook/redux";
import { login, register } from "../store/actions/authActions";

export function AuthPage() {
  const username = useInput("");
  const password = useInput("");
  const isFormValid = () => username.value && password.value;

  const loginHandler = () => {
    if (isFormValid()) {
      dispatch(
        login({ username: username.value, password: password.value })
      ).then(() => {
        navigate("/");
      });
    } else {
      alert("Invalid form!Please change");
    }
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const submitHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (isFormValid()) {
      await  dispatch(
          register({ username: username.value, password: password.value })
        )
        navigate('/')
      } else {
        alert("Invalid form!Please change");
      }
    } catch (error) {
      
    }
   
  };
  return (
    <form
      className=" container mx-auto max-w-[500px] pt-8"
      onSubmit={submitHandler}
    >
      <div className="mb-2">
        <label className="block" htmlFor="username">
          Username
        </label>
        <input
          className="border py-1 px-2 w-full"
          type={"text"}
          {...username}
          id={"username"}
        ></input>
      </div>
      <div className="mb-2">
        <label className="block" htmlFor="password">
          Password
        </label>
        <input
          className="border py-1 px-2 w-full"
          type={"password"}
          {...password}
          id={"password"}
        ></input>
      </div>

      <button className="px-2 py-4 bg-blue-400 " type="submit">
        Register
      </button>
      <button onClick={loginHandler} className="px-4 py-4 bg-green-400 " type="button">
        Login
      </button>
    </form>
  );
}
