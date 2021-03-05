import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('fullContainer', {read: ElementRef}) fullContainerRef?: ElementRef;

  private sidebarSeparatorWidth: number = 10;
  private sidebarSizeMouseOffsetX: number = 0;
  public contentWidth: number = 0;
  public contentHeight: number = 0;
  public sidebarWidth: number = 150;
  public sidebarSeparatorClicked: boolean = false;

  title = 'Annotator';

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit() {}

  public ngAfterViewInit() {
    this.resizeContent();
    window.onresize = () => {
      this.resizeContent();
    }
  }

  public handleMouseup() {
    this.sidebarSeparatorClicked = false;
    this.cdr.detectChanges();
  }

  public handleSidebarSeparatorClick(event: MouseEvent) {
    this.sidebarSeparatorClicked = true;
    this.sidebarSizeMouseOffsetX = event.clientX;
  }

  public handleMousemove(event: MouseEvent) {
    if (this.sidebarSeparatorClicked) {
      this.handleSidebarWidthChange(event);
    }
  }


  public handleSidebarWidthChange(event: MouseEvent) {
    this.sidebarWidth += event.clientX - this.sidebarSizeMouseOffsetX;
    this.sidebarSizeMouseOffsetX = event.clientX;
    this.resizeContent();
  }

  public resizeContent() {
    this.contentHeight = this.fullContainerRef?.nativeElement.clientHeight;
    this.contentWidth = this.fullContainerRef?.nativeElement.clientWidth - this.sidebarWidth - this.sidebarSeparatorWidth;
    this.cdr.detectChanges();
  }
}
