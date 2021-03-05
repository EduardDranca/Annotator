import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IpcService } from '../services/ipc.service';
import { ImageService } from '../services/image.service';
import { ImageModel } from '../models/image-model';
import { ExplorerService } from '../services/explorer.service';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css']
})
export class ContentViewComponent implements OnInit {
  public directory: string = '';
  public images: ImageModel[] = [];
  public imageIndex: number = 0;
  public graphicalContainerWidth: number = 0;
  public graphicalContainerHeight: number = 0;

  @ViewChild('contentView', {read: ElementRef}) contentViewRef?: ElementRef;

  @Input() width:number = 0;
  @Input() height:number = 0;

  constructor(
    private ipc: IpcService,
    private imageService: ImageService,
    private cdr: ChangeDetectorRef,
    private explorerService: ExplorerService) {}

  ngOnInit(): void {
    this.ipc.on('directory-opened', (_event, args) => {
      if (args.length !== 0) {
        this.imageService.test(args[0]).subscribe(openedDirectory => {
          this.images = openedDirectory.images.map(path => {
            return new ImageModel(path);
          });
          this.directory = openedDirectory.directory;
          this.changeImage(this.imageIndex);

          this.explorerService.loadedDirectory.next(this.directory);
          this.explorerService.loadedImages.next(this.getFileNames(openedDirectory.images));
          this.cdr.detectChanges();
        });
      }
    });

    this.explorerService.imageChanged.subscribe((index: number) => {
        this.imageIndex = Math.max(Math.min(index, this.images.length - 1), 0);
    });
  }

  getFileNames(filePaths: string[]) {
    return filePaths.map(path => path.split('\\').pop());
  }

  changeImage(index: number) {
    this.explorerService.imageChanged.next(index);
    this.imageIndex = Math.max(Math.min(index, this.images.length - 1), 0);
  }
}
