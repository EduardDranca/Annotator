import { Texture } from 'pixi.js';

export class ImageModel {
    path: string;
    texture?: Texture;

    constructor(path: string, texture?: Texture) {
        this.path = path;
        this.texture = texture;
    }
}