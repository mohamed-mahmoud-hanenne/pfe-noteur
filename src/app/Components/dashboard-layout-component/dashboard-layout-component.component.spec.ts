import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayoutComponentComponent } from './dashboard-layout-component.component';

describe('DashboardLayoutComponentComponent', () => {
  let component: DashboardLayoutComponentComponent;
  let fixture: ComponentFixture<DashboardLayoutComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLayoutComponentComponent]
    });
    fixture = TestBed.createComponent(DashboardLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
