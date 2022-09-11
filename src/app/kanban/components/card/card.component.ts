import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeListEvent, ICard, List } from '../../models';
import { CardsService } from '../../services';

export enum Mode {
  edit = 'edit',
  view = 'view'
}

@Component({
  selector: 'kanban-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title!: string;
  @Input() content!: string;
  @Input() id!: string;
  @Input() list!: List;
  @Output() changeListEvent = new EventEmitter<ChangeListEvent>();
  @Output() deleteCardEvent = new EventEmitter<ICard>();

  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });
  currentMode = Mode.view;
  editionButtonLabel = 'Edit';

  constructor(private cardsService: CardsService) { }

  get showLeftArrow(): boolean {
    return this.list === List.doing || this.list === List.done;
  }

  get showRightArrow(): boolean {
    return this.list === List.doing || this.list === List.todo;
  }

  get isInEditMode(): boolean {
    return this.currentMode === Mode.edit
  }

  ngOnInit(): void {
    this.resetForm()
  }

  changeMode(): void {
    this.currentMode === Mode.edit && this.resetForm();
    this.currentMode === Mode.view
      ? this.currentMode = Mode.edit
      : this.currentMode = Mode.view;
    this.editionButtonLabel === 'Edit'
      ? this.editionButtonLabel = 'Cancel'
      : this.editionButtonLabel = 'Edit';
  }

  changeList(destination: List): void {
    this.changeListEvent.emit({
      destination,
      origin: this.list,
      card: {
        id: this.id,
        titulo: this.title,
        conteudo: this.content,
        lista: this.list
      }
    });
  }

  leftArrowClick() {
    if (!!this.showLeftArrow) {
      const destination = this.list === List.done
      ? List.doing
      : List.todo;
      this.changeList(destination);
    }
  }

  rightArrowClick() {
    if (!!this.showRightArrow) {
      const destination = this.list === List.todo
      ? List.doing
      : List.done;
      this.changeList(destination);
    }
  }

  onSubmit() {
    this.cardsService.updateCard({
      id: this.id,
      titulo: <string>this.editForm.value.title,
      conteudo: <string>this.editForm.value.content,
      lista: this.list
    }).subscribe((card: ICard) => {
      this.currentMode = Mode.view;
      this.title = card.titulo;
      this.content = card.conteudo;
      this.resetForm();
    })
  }

  deleteCard(): void {
    this.cardsService
      .deleteCard(this.id)
      .subscribe(() => this.deleteCardEvent.emit(
        {
          id: this.id,
          titulo: this.title,
          conteudo: this.content,
          lista: this.list
        }
      ))
  }

  private resetForm() {
    this.editForm.get('title')?.setValue(this.title);
    this.editForm.get('content')?.setValue(this.content);
  }

}
