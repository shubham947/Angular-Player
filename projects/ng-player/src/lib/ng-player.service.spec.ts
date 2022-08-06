import { TestBed } from '@angular/core/testing';

import { NgPlayerService } from './ng-player.service';

describe('NgPlayerService', () => {
  let service: NgPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
