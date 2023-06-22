import { Request, Response } from "express";
import { User, validation } from "../../models/user";
import bcrypt from "bcryptjs";

export default async function updatePassword(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Vérification de l'ancien mot de passe
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid old password" });
    }

    // Hachage du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Mise à jour du mot de passe dans la base de données
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error - Error while updating password",
    });
    console.log("error:", error);
  }
}
