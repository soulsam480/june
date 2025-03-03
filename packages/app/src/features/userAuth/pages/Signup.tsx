import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { SignupUser } from "../userTypes";
import { useAppDispatch } from "../../../app/hooks";
import { signout, userSignup } from "../userSlice";

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<SignupUser>({
    name: "",
    email: "",
    username: "",
    password: "",
    bio: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setUserData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const [shouldRedirect, setRedirect] = useState<Boolean>(false);
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const resData = await dispatch(userSignup(userData));
    try {
      console.log(resData);
      setRedirect(true);
    } catch (error) {
      console.log(error);
      dispatch(signout());
    }
  };
  return (
    <div className="flex flex-col items-center	 pt-16 pb-16">
      {shouldRedirect && <Redirect to="/signin" />}
      <h1 className="text-center text-4xl mb-5 text-purple-800 font-bold">
        Sign Up
      </h1>
      <form
        onSubmit={submitForm}
        className="bg-purple-300 p-8 rounded-lg w-72 xsm:w-96"
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          value={userData.name}
          onChange={handleChange}
          className="p-1 mb-3 rounded-md w-full"
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={userData.email}
          onChange={handleChange}
          className="p-1 mb-3 rounded-md w-full"
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          value={userData.username}
          onChange={handleChange}
          className="p-1 mb-3 rounded-md w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={userData.password}
          onChange={handleChange}
          className="p-1 mb-3 rounded-md w-full"
        />
        <textarea
          name="bio"
          placeholder="bio"
          value={userData.bio}
          onChange={handleChange}
          className="p-1 mb-3 rounded-md w-full"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full text-white p-1 rounded-md bg-purple-500 hover:bg-purple-400 "
          >
            Sign In
          </button>
        </div>
      </form>
      <p>
        New here?
        <Link to="/signin" className="text-purple-700 font-bold	">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
