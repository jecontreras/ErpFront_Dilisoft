import { TestBed } from '@angular/core/testing';

import { ArticuloLogService } from './articulo-log.service';

describe('ArticuloLogService', () => {
  let service: ArticuloLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticuloLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
