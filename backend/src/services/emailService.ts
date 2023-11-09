import { HTTP_CODES } from "@/types";
import { CustomError } from "@/utils/customError";
import { mailOptions, transporter } from "@/utils/nodemailer";
import { signToken } from "@/utils/tokenHandlers";
import { findUser } from "./userService";
import * as ejs from "ejs";
import * as path from "path";

export async function sendVerificationEmail(email: string, username: string) {
  const emailToken = signToken(username, "email");
  const link = `http://localhost:5173/confirm?token=${emailToken}`;
  const filePath = path.resolve(process.cwd() + "/src/templates/userConfirmationEmail.ejs");
  ejs.renderFile(
    filePath,
    {
      username,
      link,
    },
    async (renderError, view) => {
      if (renderError) {
        throw new CustomError("Something went wrong", HTTP_CODES.INTERNAL_SERVER_ERROR);
      } else {
        try {
          await transporter.sendMail({
            ...mailOptions(email, view),
          });
        } catch (err) {
          const incorrectUser = await findUser(username);
          await incorrectUser.remove();
          throw new CustomError("Something went wrong", HTTP_CODES.INTERNAL_SERVER_ERROR);
        }
      }
    },
  );
}
