import { TestBed } from '@angular/core/testing';

import { CommunicationService } from './communication.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CommunicationService', () => {
  let service: CommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(CommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
