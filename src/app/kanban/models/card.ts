import { List } from "./list.enum";

export interface ICard {
  id: string;
  titulo: string;
  conteudo: string;
  lista: List
}

export interface ChangeListEvent {
  destination: List;
  origin: List;
  card: ICard;
}
