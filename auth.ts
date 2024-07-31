import NextAuth, { DefaultSession } from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./src/lib/zod";
import prisma from "./prisma/db";
import { compare } from "bcryptjs";
import {} from "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  trustHost: true,
  session: {
    maxAge: 172800,
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      credentials: {
        phoneNumber: {
          label: "phoneNumber",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          const { phoneNumber, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await prisma.user.findFirst({
            where: {
              phoneNumber: phoneNumber,
            },
          });

          if (!user || user.authorities !== "0") {
            return null;
          }

          const passIsCorrect = await compare(password, user.password);

          if (!passIsCorrect) {
            return null;
          }

          // return json object with the user data
          return {
            id: user.nanoId,
            name: user.firstName,
            lastName: user.lastName,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async authorized({ auth }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth?.user;
    },
    async jwt({ user, token }) {
      if (user) {
        token.lastName = user.lastName;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.lastName = token.lastName;
      return session;
    },
  },
});

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's lastName address. */
      lastName: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }

  interface User {
    lastName: string;
  }
}

declare module "next-auth/jwt" {
  interface DefaultJWT {
    lastName: string;
  }
}
