import { defineConfig } from 'astro/config';
// import node from "@astrojs/node";
import auth from "auth-astro";
import db from "@astrojs/db";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [auth(), db(), react()]
});