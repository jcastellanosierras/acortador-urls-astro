import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import auth from "auth-astro";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [auth(), db()]
});