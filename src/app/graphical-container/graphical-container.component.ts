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
  private containerScale: number = 1;
  private clickPressed: boolean = false;
  private prevMouseOffsetX: number = 0;
  private prevMouseOffsetY: number = 0;

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
    private elementRef: ElementRef) {}
  
  ngOnInit(): void {
    this.initializePIXIApp();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imageIndex) {
      this.imageIndex = changes.imageIndex.currentValue;
      this.loadImage(this.imageIndex);
    }
    if (changes.width || changes.height) {
      if (this.app) {
        this.app.renderer.resize(this._width, this._height);
        if (this.container) {
          this.container.x = this.container.x * changes.width.currentValue / changes.width.previousValue;
          this.container.y = this.container.y * changes.height.currentValue / changes.height.previousValue;
        }
      }
    }
  }

  public zoom(event: WheelEvent) {
    if (this.container) {
      if (event.deltaY < 0) {
        this.containerScale *= 1.1;
        this.container.scale.set(this.containerScale);
      } else {
        this.containerScale *= 0.9;
        if (this.containerScale <= 0.2) {
          this.containerScale = 0.2;
        }
        this.container.scale.set(this.containerScale);
      }
    }
  }

  initializePIXIApp() {
    this.ngZone.runOutsideAngular(() => {
      this.app = new PIXI.Application();
      this.container = new PIXI.Container();

      this.app.stage.addChild(this.container);
      this.app.renderer.resize(this._width, this._height);
    });

    if (this.app) {
      this.elementRef.nativeElement.appendChild(this.app.view);
    }
    //TODO: event handling could be moved to a div that has 100% width and height with angular style event handling
    this.elementRef.nativeElement.onwheel = (event: WheelEvent) => {
      this.zoom(event);
    };

    this.elementRef.nativeElement.onmousedown = (event: MouseEvent) => {
      this.clickPressed = true;
      this.prevMouseOffsetX = event.offsetX;
      this.prevMouseOffsetY = event.offsetY;
    }
    this.elementRef.nativeElement.onmouseup = (event: MouseEvent) => {
      this.clickPressed = false;
    }
    this.elementRef.nativeElement.onmousemove = (event: MouseEvent) => {
      if (this.clickPressed) {
        if (this.container) {
          console.log(event);
          this.container.x += event.offsetX - this.prevMouseOffsetX;
          this.container.y += event.offsetY - this.prevMouseOffsetY;
          this.prevMouseOffsetX = event.offsetX;
          this.prevMouseOffsetY = event.offsetY;
        }
      }
    }
  }

  loadImage(index: number) {
    this.containerScale = 1;
    this.container?.scale.set(this.containerScale);

    if (this.currentImages.length !== 0) {
      this.currentSprite = new PIXI.Sprite(this.currentImages[index].texture);
      this.currentSprite.anchor.set(0.5);
      if (this.container && this.app) {
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
