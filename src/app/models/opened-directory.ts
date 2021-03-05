export class OpenedDirectory {
    images: string[];
    directory: string;

    constructor(directory: string, images: string[]) {
        this.images = images;
        this.directory = directory;
    }
}