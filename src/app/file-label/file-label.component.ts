import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-label',
  templateUrl: './file-label.component.html',
  styleUrls: ['./file-label.component.css']
})
export class FileLabelComponent implements OnInit {

  @Input() fileName: string | undefined = '';
  @Input() selected = false;

  constructor() { }

  ngOnInit(): void {
  }

}
