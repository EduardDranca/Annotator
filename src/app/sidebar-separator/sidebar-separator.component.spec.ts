import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSeparatorComponent } from './sidebar-separator.component';

describe('SidebarSeparatorComponent', () => {
  let component: SidebarSeparatorComponent;
  let fixture: ComponentFixture<SidebarSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSeparatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
