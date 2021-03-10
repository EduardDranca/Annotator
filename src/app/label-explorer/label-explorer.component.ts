import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-explorer',
  templateUrl: './label-explorer.component.html',
  styleUrls: ['./label-explorer.component.css']
})
export class LabelExplorerComponent implements OnInit {
  public labels: string[] = ['label1', 'label2', 'label3'];

  constructor() { }

  ngOnInit(): void {
  }

  createNewLabel(event: MouseEvent) {
    
  }
}
