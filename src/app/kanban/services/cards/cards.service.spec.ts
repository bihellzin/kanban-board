import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardsService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CardsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cards', () => {
    const url = `${environment.apiBaseUrl}/cards`;
    service.getCards().subscribe(data => {
      expect(data).toBeTruthy();
    });
    const req = httpTestingController.expectOne(url);
    req.flush([]);
  });

  it('should create card', () => {
    const url = `${environment.apiBaseUrl}/cards`;
    service.createCard({}).subscribe(data => {
      expect(data).toBeTruthy();
    });
    const req = httpTestingController.expectOne(url);
    req.flush({});
  });

  it('should delete card', () => {
    const cards = [
      {
        id: '1',
        titulo: '1',
        conteudo: '1',
        lista: 'ToDo'
      },
      {
        id: '2',
        titulo: '2',
        conteudo: '2',
        lista: 'ToDo'
      }
    ];
    const url = `${environment.apiBaseUrl}/cards/1`;
    service.deleteCard('1').subscribe(data => {
      expect(data.length).toEqual(cards.length - 1);
    });
    const req = httpTestingController.expectOne(url);
    req.flush([{
      id: '2',
      titulo: '2',
      conteudo: '2',
      lista: 'ToDo'
    }]);
  });
});
