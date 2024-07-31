"use client";

import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/src/lib/zod";
import { action_signIn } from "@/src/app/actions/auth";

type Inputs = {
  phoneNumber: string;
  password: string;
};

function SignIn() {
  const searchParam = useSearchParams();
  const callBackUrl = searchParam.get("callbackUrl");

  useForm;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
  });

  const [signInError, signIn] = useFormState(
    action_signIn.bind(null, callBackUrl ?? "/"),
    { message: "" }
  );
  return (
    <form
      className="rounded shadow border flex flex-col max-w-sm mx-auto mt-[10%] gap-2 p-2 items-center"
      onSubmit={handleSubmit(signIn)}
    >
      <Label>phoneNumber</Label>
      <Input type="tell" {...register("phoneNumber")} />
      {errors.phoneNumber?.message && (
        <p className="text-sm text-red-400">{errors.phoneNumber.message}</p>
      )}
      <Label>Password</Label>
      <Input type="password" {...register("password")} />
      {errors.password?.message && (
        <p className="text-sm text-red-400">{errors.password.message}</p>
      )}
      <SubmitButton title={"ورود"} pendingTitle="در حال ورود..." />
      {signInError?.message}
    </form>
  );
}

export function SubmitButton({
  title,
  pendingTitle,
}: {
  title: string;
  pendingTitle: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button className="w-14" type="submit" disabled={pending}>
      {pending ? pendingTitle : title}
    </Button>
  );
}

export default SignIn;
