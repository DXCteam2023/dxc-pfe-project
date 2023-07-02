import { Request, Response } from "express";
import { User, validation } from "../../models/user/user";
import bcrypt from "bcryptjs";

export default async function updatePassword(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid old password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send({
      message: "Internal server error - Error while updating password",
    });
  }
}
