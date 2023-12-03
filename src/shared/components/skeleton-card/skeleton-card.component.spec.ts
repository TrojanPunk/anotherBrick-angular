import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCardComponent } from './skeleton-card.component';

describe('SkeletonCardComponent', () => {
  let component: SkeletonCardComponent;
  let fixture: ComponentFixture<SkeletonCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonCardComponent]
    });
    fixture = TestBed.createComponent(SkeletonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
