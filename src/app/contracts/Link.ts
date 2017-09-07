export class Link {
    public name: string;
    public url: string;

    constructor(url?: string, name?: string) {
        this.name = name;
        this.url = url;
    }
}