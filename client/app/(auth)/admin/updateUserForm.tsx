import { useState } from "react";
import axios from "axios";

import type { TUser } from "./table";

export default function UpdateUserForm({
  user,
  onClose,
  onCancel,
}: {
  user?: TUser | undefined;
  onClose?: () => void;
  onCancel?: any;
}) {
  const [username, setUsername] = useState(user?.username);
  const [profile, setProfile] = useState(user?.profile);
  const [role, setRole] = useState(user?.role);
  const [password, setPassword] = useState(user?.password);
  const [userID, setUserID] = useState(user?.userID);
  const [isVisible, setIsVisible] = useState(true);
  const updateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsVisible(false);
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/user/${user?._id}`,
        {
          username,
          profile,
          role,
          password,
          userID,
        },
      );
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.log(
          "Une erreur s'est produite lors de la mise à jour de l'utilisateur",
        );
      }
    } catch (error) {
      console.log("Une erreur s'est produite lors de la requête HTTP", error);
    }
  };
  if (!isVisible) {
    return null;
  }
  console.log(user?._id);
  return (
    <form
      className=" mx-12  grid lg:grid-cols-2 w-4/6 gap-4"
      onSubmit={(e) => updateUser(e)}
    >
      <div className="input-type">
        <input
          type="text"
          name="username"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className="input-type">
        <input
          type="text"
          name="role"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
      </div>

      <div className="input-type">
        <input
          readOnly
          type="text"
          name="userID"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="userID"
          value={userID}
          onChange={(event) => setUserID(event.target.value)}
        />
      </div>

      <div className="input-type">
        {profile === "Commercial Agent" ? (
          <select
            name="profile"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            value={profile}
            onChange={(event) => setProfile(event.target.value)}
          >
            <option value="Commercial Agent">Agent</option>
            <option value="Product Offering Manager">Manager</option>
          </select>
        ) : (
          <select
            name="profile"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            value={profile}
            onChange={(event) => setProfile(event.target.value)}
          >
            <option value="Product Offering Manager">Manager</option>
            <option value="Commercial Agent">Agent</option>
          </select>
        )}
      </div>

      <button
        type="submit"
        className="flex justify-center text-md w-1/6 bg-pink-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-orange-500 hover:text-pink-500"
      >
        Update
      </button>
      <button
        className="flex justify-center text-md w-1/6 bg-red-600 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-orange-500 hover:text-red-600"
        onClick={onClose}
      >
        Annuler
      </button>
    </form>
  );
}
