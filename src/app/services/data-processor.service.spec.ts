import { TestBed } from '@angular/core/testing';

import { DataProcessorService } from './data-processor.service';

describe('DataProcessorService', () => {
  let service: DataProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
