import { Component, Input, OnInit } from '@angular/core';
import { ExplorerService } from '../services/explorer.service';


@Component({
  selector: 'app-directory-explorer',
  templateUrl: './directory-explorer.component.html',
  styleUrls: ['./directory-explorer.component.css']
})
export class DirectoryExplorerComponent implements OnInit {

  public selectedImage: number = 0;
  public directory: string = '';
  public images: (string | undefined)[] = [];


  constructor(private explorerService: ExplorerService) {
    this.explorerService.loadedImages.subscribe((images: (string | undefined)[]) => {
      this.images = images;
    });

    this.explorerService.imageChanged.subscribe((index: number) => {
        this.selectedImage = index;
    });

    this.explorerService.loadedDirectory.subscribe((directory: string) => {
      this.directory = directory.toUpperCase();
    });
  }

  ngOnInit(): void {
  }

  handleLabelClick(_event: MouseEvent, index: number) {
    this.selectedImage = index;
    this.explorerService.imageChanged.next(index);
  }
}
