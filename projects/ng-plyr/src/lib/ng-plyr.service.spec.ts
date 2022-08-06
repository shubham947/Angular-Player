import { TestBed } from '@angular/core/testing';

import { NgPlyrService } from './ng-plyr.service';

describe('NgPlyrService', () => {
  let service: NgPlyrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPlyrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
