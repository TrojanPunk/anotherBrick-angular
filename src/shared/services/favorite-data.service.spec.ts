import { TestBed } from '@angular/core/testing';

import { FavoriteDataService } from './favorite-data.service';

describe('FavoriteDataService', () => {
  let service: FavoriteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
