import { TestBed } from '@angular/core/testing';

import { NoteurService } from './noteur.service';

describe('NoteurService', () => {
  let service: NoteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
