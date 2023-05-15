import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import type { User } from "@prisma/client";
import { sessionStorage } from "~/lib/session.server";
import { prisma } from "~/db.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    console.log("retrieved Google profile: \n", profile);

    const email = profile.emails[0].value;

    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        name: profile.displayName,
        ...(profile.photos.length && {
          avatarUrl: profile.photos[profile.photos.length - 1].value,
        }),
      },
      create: {
        email,
        name: profile.displayName,
        ...(profile.photos.length && {
          avatarUrl: profile.photos[profile.photos.length - 1].value,
        }),
      },
    });

    return user;
  }
);

authenticator.use(googleStrategy);
