export class Content {
    private readonly content: string;

    constructor(content: string) {
        if (this.validateContentLength(content)) {
            this.content = content;
            return;
        }
        throw new Error('Content length error.');
    }

    private validateContentLength(content: string): boolean {
        return content.length >= 5 && content.length <= 240;
    }

    get value(): string {
        return this.content;
    }
}