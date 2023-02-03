import { TestBed } from '@angular/core/testing';

import { XlsService } from './xls.service';

describe('XlsService', () => {
  let service: XlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
