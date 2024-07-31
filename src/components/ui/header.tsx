"no store";
import { ModeToggle } from "./theme/themeSwitch";
import { SignInButton } from "./auth/signin-button";
import { SignOutButton } from "./auth/signout-button";
import { auth } from "@/auth";
import SideMenu from "./sideMenu";

export default async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 w-full z-50 bg-inherit shadow-md h-16">
      <div className="flex justify-between py-4 px-2">
        {session ? <SideMenu /> : null}
        <ModeToggle />
        {session ? <SignOutButton /> : <SignInButton />}
      </div>
    </header>
  );
}
