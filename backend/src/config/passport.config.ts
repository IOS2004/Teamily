import passport from "passport";
import { Request } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./app.config";
import { NotFoundException } from "../utils/appError";
import { ProviderEnum } from "../enums/account.provider.enum";
import {
  loginOrCreateAccountService,
  verifyUserService,
} from "../services/auth.service";
import UserModel from "../models/user.model";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (req: Request, accessToken, refreshToken, profile, done) => {
      try {
        const { email, sub: googleId, picture } = profile._json;
        console.log("Google profile:", profile);
        console.log("Google ID:", googleId);
        if (!googleId) {
          throw new NotFoundException("Google ID not found in profile");
        }
        const { user } = await loginOrCreateAccountService({
          provider: ProviderEnum.GOOGLE,
          providerId: googleId,
          displayName: profile.displayName,
          picture: picture,
          email: email,
        });
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true,
    },
    async (email, password, done) => {
      try {
        const user = await verifyUserService({ email, password });
        return done(null, user);
      } catch (error: any) {
        return done(error, false, { message: error?.message });
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});
passport.deserializeUser((id: any, done) => {
  UserModel.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});
