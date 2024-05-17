import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendeurComponent } from './add-vendeur.component';

describe('AddVendeurComponent', () => {
  let component: AddVendeurComponent;
  let fixture: ComponentFixture<AddVendeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVendeurComponent]
    });
    fixture = TestBed.createComponent(AddVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
