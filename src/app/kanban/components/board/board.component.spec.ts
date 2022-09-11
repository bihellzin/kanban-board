import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsService } from '../../services';
import { cardsServiceMock } from '../../services/cards/cards-service.mock';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      providers: [{ provide: CardsService, useValue: cardsServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
