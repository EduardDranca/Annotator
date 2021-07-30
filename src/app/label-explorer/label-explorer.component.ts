import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-label-explorer',
  templateUrl: './label-explorer.component.html',
  styleUrls: ['./label-explorer.component.css']
})
export class LabelExplorerComponent implements OnInit {
  public newLabelName = new FormControl('');
  public creatingNewLabel = false;
  public labels = ['label1', 'label2', 'label3'];
  public selectedLabel = 0;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  toggleLabelCreation() {
    this.creatingNewLabel = true;
  }

  deleteSelectedLabel() {
    this.labels.splice(this.selectedLabel, 1);
  }

  setSelectedLabel(index: number) {
    this.selectedLabel = index;
  }

  toggleAnnotation() {
    this.communicationService.send('newAnnotation', [this.labels[this.selectedLabel]]);
  }

  createNewLabel(event: Event) {
    if (this.newLabelName.value) {
      this.labels.push(this.newLabelName.value);
      this.newLabelName.reset();
      this.creatingNewLabel = false;
    }
  }
}
