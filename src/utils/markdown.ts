import { marked } from 'marked';

let configured = false;

function configureMarked() {
	if (configured) return;
	configured = true;

	marked.use({
		tokenizer: {
			// Only allow ~~strikethrough~~; leave single ~ as plain text.
			del(this, src) {
				const match = /^~~(?=\S)([\s\S]*?\S)~~/.exec(src);
				if (!match) return;
				return {
					type: 'del',
					raw: match[0],
					text: match[1],
					tokens: this.lexer.inlineTokens(match[1]),
				};
			},
		},
	});
}

export function parseMarkdown(content: string): string {
	configureMarked();
	return marked.parse(content);
}
