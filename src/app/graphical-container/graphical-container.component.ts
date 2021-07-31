import { Component, OnInit, NgZone, ElementRef, Input, SimpleChanges, } from '@angular/core';
import { ImageModel } from '../models/image-model';
import * as PIXI from 'pixi.js';
import { CommunicationService } from '../services/communication.service';
import { CommunicationSubscriber } from '../helpers/communication-subscriber';

@Component({
  selector: 'app-graphical-container',
  templateUrl: './graphical-container.component.html',
  styleUrls: ['./graphical-container.component.css']
})
export class GraphicalContainerComponent implements OnInit {
  @Input() createNewAnnotation = false;
  private app?: PIXI.Application;
  private container?: PIXI.Container;
  private currentSprite?: PIXI.Sprite;
  private annotationGraphics?: PIXI.Graphics;
  private annotationStartingPoint = new PIXI.Point(0, 0);

  private currentImages: ImageModel[] = [];
  private containerScale = 1;
  private clickPressed = false;
  private prevMouseOffsetX = 0;
  private prevMouseOffsetY = 0;
  private communicationSubscriber = new CommunicationSubscriber();
  private currentAnnotation = '';
  private creatingAnnotation = false;

  private _width = 0;
  private _height = 0;

  @Input() set images(images: ImageModel[]) {
    this.currentImages = images;
    this.reloadImages();
  }
  @Input() imageIndex = 0;

  @Input() set width(width: number) {
    this._width = width;
  }
  @Input() set height(height: number) {
    this._height = height;
  }

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private communicationService: CommunicationService) {
      this.communicationService.subscribe(this.communicationSubscriber, 'newAnnotation');
      this.communicationSubscriber.setCallbackOnEvent('newAnnotation', (eventArgs) => {
        this.currentAnnotation = eventArgs[0];
        this.creatingAnnotation = true;
        this.annotationGraphics = new PIXI.Graphics();
        console.log(this.creatingAnnotation);
        console.log(this.annotationGraphics);

      });
    }
  
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
          if (changes.width) {
            this.container.x = this.container.x * changes.width.currentValue / changes.width.previousValue;
          }
          if (changes.height) {
            this.container.y = this.container.y * changes.height.currentValue / changes.height.previousValue;
          }
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
      
      this.container.scale.set(this.containerScale);

      this.container.x = this.app.screen.width / 2;
      this.container.y = this.app.screen.height / 2;

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
      console.log(event);
      this.clickPressed = true;
      this.prevMouseOffsetX = event.offsetX;
      this.prevMouseOffsetY = event.offsetY;
      if (this.creatingAnnotation && this.annotationGraphics && this.container && this.app) {
        this.annotationGraphics.lineStyle(5, 0xff00ff);
        this.annotationStartingPoint = this.pointToContainerCoords(new PIXI.Point(event.offsetX, event.offsetY));

        this.annotationGraphics.drawRect(this.annotationStartingPoint.x, this.annotationStartingPoint.y, 1, 1);
        this.container.addChild(this.annotationGraphics);
      }
    }
    this.elementRef.nativeElement.onmouseup = (event: MouseEvent) => {
      this.clickPressed = false;
      this.creatingAnnotation = false;
    }
    this.elementRef.nativeElement.onmousemove = (event: MouseEvent) => {
      if (this.clickPressed) {
        if (this.container) {
          if (this.creatingAnnotation && this.annotationGraphics) {
            const mousePositionInContainer = this.pointToContainerCoords(new PIXI.Point(event.offsetX, event.offsetY));
            const upperBound = this.annotationStartingPoint;
            
            this.annotationGraphics.clear();
            this.annotationGraphics.lineStyle(5, 0xff00ff);
            this.annotationGraphics.drawRect(upperBound.x, upperBound.y, mousePositionInContainer.x - upperBound.x, mousePositionInContainer.y - upperBound.y);
            this.container.addChild(this.annotationGraphics);
          } else {
            this.container.x += event.offsetX - this.prevMouseOffsetX;
            this.container.y += event.offsetY - this.prevMouseOffsetY;
            this.prevMouseOffsetX = event.offsetX;
            this.prevMouseOffsetY = event.offsetY;
          }
        }
      }
    }
  }

  pointToContainerCoords(point: PIXI.Point) {
    if (this.container && this.app) {
      // transforms the point in canvas coordinates to container coordinates
      let containerTransform = this.container.localTransform;
      let appTransform = this.app.stage.localTransform;
      let fullMat = containerTransform.append(appTransform);

      return fullMat.applyInverse(point);
    }
    return new PIXI.Point(NaN, NaN);
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
