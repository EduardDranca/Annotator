import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-annotation-label',
  templateUrl: './annotation-label.component.html',
  styleUrls: ['./annotation-label.component.css']
})
export class AnnotationLabelComponent implements OnInit {
  @Input() label: string = '';
  @Input() selected: boolean = false;
  @Output() selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: MouseEvent): void {
    this.selectedChange.emit(true);
  }
}
