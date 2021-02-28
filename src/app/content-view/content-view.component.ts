import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, SecurityContext } from '@angular/core';
import { IpcService } from '../ipc.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TestServiceService } from '../test-service.service';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ContentViewComponent implements OnInit {
  private app: any;
  private container: any;

  public images: string[] = [];

  constructor(
    private ipc: IpcService,
    private testService: TestServiceService,
    private cdr: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private ngZone: NgZone) { };

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.app = new PIXI.Application();
      this.container = new PIXI.Container();
      this.app.stage.addChild(this.container);
    });
    this.elementRef.nativeElement.appendChild(this.app.view);

    this.ipc.on('directory-opened', (event, args) => {
      if (args.length !== 0) {
        this.testService.test(args[0]).subscribe(value => {
          this.images = value;
          const texture = PIXI.Texture.from(this.images[0]);
          const sprite = new PIXI.Sprite(texture);
          this.container.addChild(sprite);
          this.container.x = this.app.screen.width / 2;
          this.container.y = this.app.screen.height / 2;

          this.app.ticker.add((delta: number) => {
            this.container.rotation -= 0.01 * delta;
          });
        });
      }
    })
  };

  sanitizeUrl(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
