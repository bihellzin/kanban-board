import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/core/rest/rest.service';
import { environment } from 'src/environments/environment';
import { ICard } from '../../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private rest: RestService) {}

  getCards(): Observable<ICard[]> {
    return this.rest.get(`${environment.apiBaseUrl}/cards`);
  }

  createCard(cardData: Partial<ICard>): Observable<ICard> {
    return this.rest.post(`${environment.apiBaseUrl}/cards`, cardData);
  }

  updateCard(cardData: ICard): Observable<ICard> {
    return this.rest.put(`${environment.apiBaseUrl}/cards/${cardData.id}`, cardData);
  }

  deleteCard(cardId: string): Observable<ICard[]> {
    return this.rest.delete(`${environment.apiBaseUrl}/cards/${cardId}`);
  }
}
