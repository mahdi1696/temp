import { object, string } from "zod";
import messages from "@/src/constants/content.json";

export const signInSchema = object({
  phoneNumber: string({ required_error: messages.fa.phoneNumberIsRequired })
    .min(11, messages.fa.phoneNumberIsNotCorrect)
    .max(11, messages.fa.phoneNumberIsNotCorrect),
  password: string({ required_error: messages.fa.passwordIsRequired })
    .min(1, messages.fa.passwordIsRequired)
    .min(8, messages.fa.passwordTooShort)
    .max(32, messages.fa.passwordTooLong),
});
