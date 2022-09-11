import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

describe('RestService', () => {
  let service: RestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RestService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a get request', () => {
    const url = 'http://www.test.com/';
    service.get(url).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET')

    req.flush({});
  });

  it('should make a post request', () => {
    const url = 'http://www.test.com/';
    service.post(url, {}).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST')

    req.flush({});
  });

  it('should make a put request', () => {
    const url = 'http://www.test.com/';
    service.put(url, {}).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('PUT')

    req.flush({});
  });

  it('should make a delete request', () => {
    const url = 'http://www.test.com/';
    service.delete(url).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE')

    req.flush({});
  });
});
