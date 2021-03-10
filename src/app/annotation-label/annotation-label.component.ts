import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-annotation-label',
  templateUrl: './annotation-label.component.html',
  styleUrls: ['./annotation-label.component.css']
})
export class AnnotationLabelComponent implements OnInit {
  @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
