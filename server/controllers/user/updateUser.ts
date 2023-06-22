import { Request, Response } from "express";
import { User, validation } from "../../models/user";
import bcrypt from "bcryptjs";

export default async function updateUser(req: Request, res: Response) {
  try {

    const userId = req.params.id;
    const formData = req.body;
    const user = await User.findByIdAndUpdate(userId, formData);

    console.log({ userId });

    if (user && formData) {
      console.log("user " + user);
      return res.status(200).send({ message: "User updated successfully" });
    }

    res.status(404).send({ message: "User not found" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server Error - Error while updating Data" });
    console.log("error : " + error);
  }
}
