import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import vercel from '@astrojs/vercel/serverless';
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    AutoImport({
      imports: [
        "@shortcodes/Button",
        "@shortcodes/Accordion",
        "@shortcodes/Notice",
        "@shortcodes/Video",
        "@shortcodes/Youtube",
        "@shortcodes/Blockquote",
        "@shortcodes/Badge",
        "@shortcodes/ContentBlock",
        "@shortcodes/Changelog",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
