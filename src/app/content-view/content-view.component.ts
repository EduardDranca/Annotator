import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IpcService } from '../ipc.service';
import { TestServiceService } from '../test-service.service';
import { ImageModel } from '../models/image-model';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css']
})
export class ContentViewComponent implements OnInit {
  public images: ImageModel[] = [];
  public imageIndex: number = 0;
  public graphicalContainerWidth: number = 0;
  public graphicalContainerHeight: number = 0;
  @ViewChild('contentView', {read: ElementRef}) contentViewRef?: ElementRef;

  constructor(
    private ipc: IpcService,
    private testService: TestServiceService,
    private cdr: ChangeDetectorRef) { };

  ngOnInit(): void {
    this.ipc.on('directory-opened', (_event, args) => {
      if (args.length !== 0) {
        this.testService.test(args[0]).subscribe(imagePaths => {
          this.images = imagePaths.map(path => {
            return new ImageModel(path);
          });
          this.changeImage(0);
          this.cdr.detectChanges();
        });
      }
    })
  };

  ngAfterViewInit() {
    this.reloadGraphicalContainerSize();
    if (this.contentViewRef !== undefined) {
      window.onresize = () => {
        this.reloadGraphicalContainerSize();
      };
    }
  }

  reloadGraphicalContainerSize() {
    if (this.contentViewRef !== undefined) {
      this.graphicalContainerWidth = this.contentViewRef.nativeElement.clientWidth;
      this.graphicalContainerHeight = this.contentViewRef.nativeElement.clientHeight;
    }
    this.cdr.detectChanges();
  }

  changeImage(index: number) {
    this.imageIndex = Math.max(Math.min(index, this.images.length - 1), 0);
  }
}
