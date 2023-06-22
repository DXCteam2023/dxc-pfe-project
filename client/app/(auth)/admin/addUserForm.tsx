import axios from "axios";
import { SyntheticEvent, useState } from "react";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

export default function AddUserForm() {
  const [user, setUser] = useState({
    username: "",
    role: "",
    profile: "",
    password: "",
    userID: "",
  });

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const addUser = async () => {
    try {
      const { data: res } = await axios.post(`${AXIOS_URL}/api/user`, user);
      setSuccess(res.message);
    } catch (error: any) {
      if (
        error.response ||
        error.response.status >= 400 ||
        error.response.status <= 500
      ) {
        setErr(error.response.data.message);
      }
    }
  };

  const handleChange = (value: string, valueType: string) => {
    setUser({ ...user, [valueType]: value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div>
      {err ? (
        <div className="border-red-200 bg-red-400 text-red-500 text-md my-4 py-2 text-center bg-opacity-5">
          {err}
        </div>
      ) : (
        ""
      )}
      {success ? (
        <div className="border-green-200 bg-green-400 text-green-500 text-md my-4 py-2 text-center bg-opacity-5">
          {success}
        </div>
      ) : (
        ""
      )}
      <form
        className=" mx-12 grid lg:grid-cols-2 w-4/6 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="input-type">
          <input
            id="username"
            type="text"
            name="username"
            onChange={(e) => handleChange(e.currentTarget.value, "username")}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Username"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="role"
            id="role"
            onChange={(e) => handleChange(e.currentTarget.value, "role")}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Role"
          />
        </div>
        <div className="input-type">
          <select
            id="profile"
            name="profile"
            onChange={(e) => handleChange(e.currentTarget.value, "profile")}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          >
            <option value="">Sélectionnez une option</option>
            <option value="Commercial Agent">Agent</option>
            <option value="Product Offering Manager">Manager</option>
          </select>
        </div>
        <div className="input-type">
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => handleChange(e.currentTarget.value, "password")}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Password"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="userID"
            id="userID"
            onChange={(e) => handleChange(e.currentTarget.value, "userID")}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="UserID"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center text-md w-1/6 bg-green-800 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add
        </button>
      </form>
    </div>
  );
}
