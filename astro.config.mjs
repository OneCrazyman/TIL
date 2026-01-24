// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// GitHub Pages 설정
// 저장소 이름이 username.github.io인 경우 base를 '/'로 설정
// 그 외의 경우 base를 '/repository-name/'으로 설정
const getBase = () => {
	if (process.env.GITHUB_REPOSITORY) {
		const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
		// username.github.io 형식이면 루트에 배포
		if (repo === `${owner}.github.io`) {
			return '/';
		}
		// 그 외의 경우 서브디렉토리에 배포
		return `/${repo}/`;
	}
	// 로컬 개발 시
	return '/';
};

const getSite = () => {
	if (process.env.GITHUB_REPOSITORY) {
		const [owner] = process.env.GITHUB_REPOSITORY.split('/');
		return `https://${owner}.github.io`;
	}
	return 'https://example.com';
};

// https://astro.build/config
export default defineConfig({
	site: getSite(),
	base: getBase(),
	integrations: [
	  mdx({
		remarkPlugins: ["remark-gfm"],
	  }),
	  tailwind({
		applyBaseStyles: true,
	  }),
	],
});