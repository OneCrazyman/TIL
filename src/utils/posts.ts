import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

export type Category = 'articles' | 'til';

export interface Post {
	title: string;
	slug: string;
	category: Category;
	subcategory: string;
	date: string;
	description?: string;
	content: string;
	path: string;
	tags?: string[];
}

// Astro에서 process.cwd() 대신 import.meta.url 사용
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsDirectory = path.join(__dirname, '../../content');

export function getPostSlugs(category: Category, subcategory: string): string[] {
	const categoryPath = path.join(postsDirectory, category, subcategory);
	if (!fs.existsSync(categoryPath)) {
		return [];
	}
	return fs
		.readdirSync(categoryPath)
		.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
		.map((file) => file.replace(/\.(md|mdx)$/, ''));
}

export function getPostBySlug(
	category: Category,
	subcategory: string,
	slug: string
): Post | null {
	const categoryPath = path.join(postsDirectory, category, subcategory);
	const fullPath = path.join(categoryPath, `${slug}.md`);
	
	if (!fs.existsSync(fullPath)) {
		const mdxPath = path.join(categoryPath, `${slug}.mdx`);
		if (!fs.existsSync(mdxPath)) {
			return null;
		}
		const fileContents = fs.readFileSync(mdxPath, 'utf8');
		const { data, content } = matter(fileContents);
		
		return {
			title: data.title || slug,
			slug,
			category,
			subcategory,
			date: data.date || new Date().toISOString(),
			description: data.description,
			content,
			path: `${category}/${subcategory}/${slug}`,
			tags: data.tags || [],
		};
	}
	
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);
	
	return {
		title: data.title || slug,
		slug,
		category,
		subcategory,
		date: data.date || new Date().toISOString(),
		description: data.description,
		content,
		path: `${category}/${subcategory}/${slug}`,
		tags: data.tags || [],
	};
}

export function getAllPosts(category?: Category): Post[] {
	const posts: Post[] = [];
	const categories: Category[] = category ? [category] : ['articles', 'til'];
	
	for (const cat of categories) {
		const categoryPath = path.join(postsDirectory, cat);
		if (!fs.existsSync(categoryPath)) continue;
		
		const subcategories = fs
			.readdirSync(categoryPath, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);
		
		for (const subcategory of subcategories) {
			const slugs = getPostSlugs(cat, subcategory);
			for (const slug of slugs) {
				const post = getPostBySlug(cat, subcategory, slug);
				if (post) {
					posts.push(post);
				}
			}
		}
	}
	
	return posts.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

export function getSubcategories(category: Category): string[] {
	const categoryPath = path.join(postsDirectory, category);
	if (!fs.existsSync(categoryPath)) {
		return [];
	}
	return fs
		.readdirSync(categoryPath, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
}

export function getAllTags(): string[] {
	const posts = getAllPosts();
	const tagSet = new Set<string>();
	posts.forEach((post) => {
		if (post.tags) {
			post.tags.forEach((tag) => tagSet.add(tag));
		}
	});
	return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): Post[] {
	return getAllPosts().filter((post) => post.tags && post.tags.includes(tag));
}

export function getCategoryCount(category: Category): number {
	return getAllPosts(category).length;
}

export function getTotalCount(): number {
	return getAllPosts().length;
}
