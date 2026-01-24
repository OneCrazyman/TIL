import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'content');
const publicContentDir = path.join(rootDir, 'public', 'content');

function copyDirectory(src, dest) {
	if (!fs.existsSync(src)) {
		return;
	}
	
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}
	
	const entries = fs.readdirSync(src, { withFileTypes: true });
	
	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);
		
		if (entry.isDirectory()) {
			copyDirectory(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

// content 디렉토리를 public/content로 복사
if (fs.existsSync(contentDir)) {
	copyDirectory(contentDir, publicContentDir);
	console.log('Content directory copied to public/content');
}
