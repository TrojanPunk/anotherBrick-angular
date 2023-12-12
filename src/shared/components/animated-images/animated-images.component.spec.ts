import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedImagesComponent } from './animated-images.component';

describe('AnimatedImagesComponent', () => {
  let component: AnimatedImagesComponent;
  let fixture: ComponentFixture<AnimatedImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimatedImagesComponent]
    });
    fixture = TestBed.createComponent(AnimatedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
