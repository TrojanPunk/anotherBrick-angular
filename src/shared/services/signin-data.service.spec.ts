import { TestBed } from '@angular/core/testing';

import { SigninDataService } from './signin-data.service';

describe('SigninDataService', () => {
  let service: SigninDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
