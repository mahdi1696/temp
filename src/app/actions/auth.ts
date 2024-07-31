"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

/**
 * The `signInAction` function handles user sign-in using credentials. It attempts to sign in
 * the user with the provided phone number and password, and handles potential errors.
 *
 * @param callBack - The URL to redirect to upon successful sign-in.
 * @param preState - An optional object containing a message to be used in the pre-sign-in state.
 * @param formData - An object containing the user's phone number and password.
 *
 * @returns An object containing an error message if the sign-in process fails, or redirect to the callBack if successful.
 */
export const action_signIn = async (
  callBack: string,
  preState: { message: string } | undefined,
  formData: {
    phoneNumber: string;
    password: string;
  }
) => {
  try {
    await signIn("credentials", {
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      redirect: true,
      redirectTo: callBack,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      const { type, cause } = error;
      switch (type) {
        case "CredentialsSignin":
          return { message: "نام کاربری یا رمز عبور اشتباه هست" };
        case "CallbackRouteError":
          return { message: cause?.err?.toString() };
        default:
          return { message: "مشکلی پیش آمده است" };
      }
    }

    throw error;
    // The following return statement is unreachable, but necessary to satisfy TypeScript's type-checking.
    return {
      message: error?.message ?? "there is an error",
    };
  }

  return undefined;
};
