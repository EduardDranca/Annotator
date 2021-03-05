import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-separator',
  templateUrl: './sidebar-separator.component.html',
  styleUrls: ['./sidebar-separator.component.css']
})
export class SidebarSeparatorComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {}
}
