import { config } from "dotenv";
import { z } from "zod";
import { REDIRECT_URL_ENDPOINT } from "./redirect-url.js";

export const awsCredentials = () => {
  // TODO: Memoize
  config();

  return z
    .object({
      AWS_KEY_1: z.string(),
      AWS_SECRET_1: z.string(),
      AWS_KEY_2: z.string().optional(),
      AWS_SECRET_2: z.string().optional(),
      AWS_KEY_3: z.string().optional(),
      AWS_SECRET_3: z.string().optional(),
      AWS_KEY_4: z.string().optional(),
      AWS_SECRET_4: z.string().optional(),
    })
    .parse(process.env);
};

export const backendCredentials = () => {
  // TODO: Memoize
  config();

  return z
    .object({
      VITE_CLIENT_ID: z.string(),
      VITE_HOST: z.string(),
      CLIENT_SECRET: z.string(),
      NODE_ENV: z.enum(["development", "production"]),
      DB_NAME: z.string(),
      DB_USER: z.string(),
      DB_PASSWORD: z.string(),
      DB_HOST: z.string(),
      DISCORD_CHANNEL: z.string(),
      DISCORD_TOKEN: z.string(),
      GITHUB_TOKEN_1: z.string(),
      GITHUB_TOKEN_2: z.string(),
      GITHUB_TOKEN_3: z.string(),
      GITHUB_TOKEN_4: z.string(),
      SENTRY_DSN: z.string(),
    })
    .parse(process.env);
};

export const makeRedirectUriBackend = () => {
  return `${backendCredentials().VITE_HOST}${REDIRECT_URL_ENDPOINT}`;
};
