import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcheteurComponent } from './add-acheteur.component';

describe('AddAcheteurComponent', () => {
  let component: AddAcheteurComponent;
  let fixture: ComponentFixture<AddAcheteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAcheteurComponent]
    });
    fixture = TestBed.createComponent(AddAcheteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
