import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user";

const userRoute = Router();

userRoute.get("/", getUsers);

userRoute.get("/:id", getUserById);

userRoute.post("/", addUser);

userRoute.patch("/:id", updateUser);

userRoute.delete("/:id", deleteUser);

export default userRoute;
