import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeListEvent, ICard, List } from '../../models';
import { CardsService } from '../../services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @HostBinding ('class.board') hostClass = true;

  toDoCards: ICard[] = [];
  doingCards: ICard[] = [];
  doneCards: ICard[] = [];
  createCardForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
    this.cardsService.getCards().subscribe(data => {
      data.forEach(card => {
        card.lista === List.done && this.doneCards.push(card);
        card.lista === List.doing && this.doingCards.push(card);
        card.lista === List.todo && this.toDoCards.push(card);
      });
    });
  }

  changeCardList(data: ChangeListEvent) {
    this.cardsService
      .updateCard({ ...data.card, lista: data.destination})
      .subscribe(card => {
        if (data.origin === List.doing) {
          this.doingCards = this.doingCards.filter(card => {
            return card.id !== data.card.id
          })
        } else if (data.origin === List.done) {
          this.doneCards = this.doneCards.filter(card => {
            return card.id !== data.card.id
          })
        } else if (data.origin === List.todo) {
          this.toDoCards = this.toDoCards.filter(card => {
            return card.id !== data.card.id
          })
        }

        if (data.destination === List.doing) {
          this.doingCards.push(card);
        } else if (data.destination === List.done) {
          this.doneCards.push(card);
        } else if (data.destination === List.todo) {
          this.toDoCards.push(card);
        }
      }
    )
  }

  onSubmitCreateCardForm() {
    this.cardsService.createCard({
      titulo: <string>this.createCardForm.value.title,
      conteudo: <string>this.createCardForm.value.content,
      lista: List.todo
    })
    .subscribe(card => {
      this.toDoCards.push(card);
      this.createCardForm.get('title')?.setValue('');
      this.createCardForm.get('content')?.setValue('');
    });
  }

  deleteCard(card: ICard) {
    switch (card.lista) {
      case List.doing:
        this.doingCards = this.doingCards.filter(itemCard => itemCard.id !== card.id)
        break;
      case List.done:
        this.doneCards = this.doneCards.filter(itemCard => itemCard.id !== card.id)
        break;
      case List.todo:
        this.toDoCards = this.toDoCards.filter(itemCard => itemCard.id !== card.id)
        break;
    }
  }

}
