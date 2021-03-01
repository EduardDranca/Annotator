import { Component, OnInit, NgZone, ElementRef, Input, SimpleChanges, } from '@angular/core';
import { ImageModel } from '../models/image-model';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-graphical-container',
  templateUrl: './graphical-container.component.html',
  styleUrls: ['./graphical-container.component.css']
})
export class GraphicalContainerComponent implements OnInit {
  private app?: PIXI.Application;
  private container?: PIXI.Container;
  private currentSprite?: PIXI.Sprite;
  private currentImages: ImageModel[] = [];

  private _width: number = 0;
  private _height: number = 0;

  @Input() set images(images: ImageModel[]) {
    this.currentImages = images;
    this.reloadImages();
  }
  @Input() imageIndex: number = 0;

  @Input() set width(width: number) {
    this._width = width;
  }
  @Input() set height(height: number) {
    this._height = height;
  }

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef) { }
  
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
        this.app = new PIXI.Application();
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);
        this.app.renderer.resize(this._width, this._height);
    });
    if (this.app !== undefined) {
      this.elementRef.nativeElement.appendChild(this.app.view);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imageIndex !== undefined) {
      this.imageIndex = changes.imageIndex.currentValue;
      this.loadImage(this.imageIndex);
    }
    if (changes.width !== undefined || changes.height !== undefined) {
      if (this.app !== undefined) {
        this.app.renderer.resize(this._width, this._height);
        if (this.container !== undefined) {
          this.container.x = this.container.x * changes.width.currentValue / changes.width.previousValue;
          this.container.y = this.container.y * changes.height.currentValue / changes.height.previousValue;
        }
      }
    }
  }

  loadImage(index: number) {
    if (this.currentImages.length !== 0) {
      this.currentSprite = new PIXI.Sprite(this.currentImages[index].texture);
      this.currentSprite.anchor.set(0.5);
      if (this.container !== undefined && this.app !== undefined) {
        this.container.removeChildren();

        this.container.addChild(this.currentSprite);

        this.container.x = this.app.screen.width / 2;
        this.container.y = this.app.screen.height / 2;
      }
    }
  }

  reloadImages() {
    this.imageIndex = 0;
    for (var i = 0; i < this.currentImages.length; i++) {
      this.currentImages[i].texture = PIXI.Texture.from(this.currentImages[i].path);
    }

    this.loadImage(this.imageIndex);
  }
}
