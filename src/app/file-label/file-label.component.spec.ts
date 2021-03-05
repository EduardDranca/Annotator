import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileLabelComponent } from './file-label.component';

describe('FileLabelComponent', () => {
  let component: FileLabelComponent;
  let fixture: ComponentFixture<FileLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
