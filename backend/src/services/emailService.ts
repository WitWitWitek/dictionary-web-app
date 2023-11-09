import { HTTP_CODES } from "@/types";
import { CustomError } from "@/utils/customError";
import { mailOptions, transporter } from "@/utils/nodemailer";
import { signToken } from "@/utils/tokenHandlers";
import { findUser } from "./userService";
export async function sendVerificationEmail(email: string, username: string) {
  const emailToken = signToken(username, "email");

  try {
    await transporter.sendMail({
      ...mailOptions(email, `http://localhost:5173/confirm?token=${emailToken}`),
    });
  } catch (err) {
    const incorrectUser = await findUser(username);
    await incorrectUser.remove();
    throw new CustomError("Something went wrong", HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
}
