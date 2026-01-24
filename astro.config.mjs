// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://onecrazyman.github.io/",
	base: "/",
	integrations: [
		sitemap(),
		mdx({
			remarkPlugins: ["remark-gfm"],
		}),
		tailwind({
			applyBaseStyles: true,
		}),
	],
});