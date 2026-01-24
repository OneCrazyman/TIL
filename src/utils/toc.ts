export interface TocItem {
	id: string;
	text: string;
	level: number;
}

export function extractTocFromMarkdown(content: string): TocItem[] {
	const headingRegex = /^(#{1,3})\s+(.+)$/gm;
	const toc: TocItem[] = [];
	let match;

	while ((match = headingRegex.exec(content)) !== null) {
		const level = match[1].length;
		const text = match[2].trim();
		
		// ID 생성: 텍스트를 URL-friendly한 형태로 변환
		const id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();

		toc.push({
			id,
			text,
			level,
		});
	}

	return toc;
}

export function addIdsToHeadings(html: string, toc: TocItem[]): string {
	if (toc.length === 0) return html;
	
	let result = html;
	let tocIndex = 0;
	
	// 모든 h1, h2, h3 태그를 순서대로 찾아서 id 추가
	const headingRegex = /<(h[1-3])(?:\s+[^>]*)?>(.*?)<\/\1>/gi;
	
	result = result.replace(headingRegex, (match, tag, content) => {
		// 이미 id가 있으면 스킵
		if (match.includes('id=')) {
			return match;
		}
		
		// toc 배열에서 해당 레벨의 다음 항목 찾기
		if (tocIndex < toc.length) {
			const level = parseInt(tag.charAt(1));
			const item = toc[tocIndex];
			
			// 레벨이 일치하면 id 추가
			if (item.level === level) {
				const id = item.id;
				tocIndex++;
				
				// id 속성 추가
				if (match.startsWith(`<${tag}>`)) {
					return `<${tag} id="${id}">${content}</${tag}>`;
				} else {
					// 이미 다른 속성이 있는 경우
					return match.replace(`<${tag}`, `<${tag} id="${id}"`);
				}
			}
		}
		
		return match;
	});

	return result;
}
