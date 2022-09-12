import { ComponentFixture, TestBed } from '@angular/core/testing';
import { List } from '../../models';
import { CardsService } from '../../services';
import { cardsServiceMock } from '../../services/cards/cards-service.mock';

import { CardComponent, Mode } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      providers: [{ provide: CardsService, useValue: cardsServiceMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.id = '1';
    component.title = 'title';
    component.content = 'content';
    component.currentMode = Mode.view;
    component.list = List.todo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.editForm.get('title')?.value).toEqual('title');
    expect(component.editForm.get('content')?.value).toEqual('content');
    expect(component.currentMode).toEqual(Mode.view);
  });

  it('should change mode', () => {
    component.changeMode();
    expect(component.currentMode).toEqual(Mode.edit);
  });

  it('should return false to isInEditMode', () => {
    expect(component.isInEditMode).toBeFalse();
  });

  it('should return true to isInEditMode', () => {
    component.changeMode();
    expect(component.isInEditMode).toBeTrue();
  });

  it('should show both arrows', () => {
    component.list = List.doing;
    expect(component.showLeftArrow).toBeTrue();
    expect(component.showRightArrow).toBeTrue();
  });

  it('should show only left arrow', () => {
    component.list = List.done;
    expect(component.showLeftArrow).toBeTrue();
    expect(component.showRightArrow).toBeFalse();
  });

  it('should show only right arrow', () => {
    component.list = List.todo;
    expect(component.showLeftArrow).toBeFalse();
    expect(component.showRightArrow).toBeTrue();
  });

  it('should emit card to change list', () => {
    spyOn(component.changeListEvent, 'emit');
    component.changeList(List.doing);

    expect(component.changeListEvent.emit).toHaveBeenCalledWith({
      origin: component.list,
      destination: List.doing,
      card: {
        id: component.id,
        titulo: component.title,
        conteudo: component.content,
        lista: component.list
      }
    });
  });
});
