import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDisplayComponent } from './property-display.component';

describe('PropertyDisplayComponent', () => {
  let component: PropertyDisplayComponent;
  let fixture: ComponentFixture<PropertyDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyDisplayComponent]
    });
    fixture = TestBed.createComponent(PropertyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
