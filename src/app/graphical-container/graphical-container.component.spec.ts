import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalContainerComponent } from './graphical-container.component';

describe('GraphicalContainerComponent', () => {
  let component: GraphicalContainerComponent;
  let fixture: ComponentFixture<GraphicalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicalContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
