import { CardModel } from '@/models/CardModel';
import { makeAutoObservable } from 'mobx';

class CardStore {
  private _cardList: CardModel[];

  constructor() {
    this._cardList = [];
    makeAutoObservable(this);
  }

  get bookMarkedList() {
    return this._cardList.filter(card => card.isBookMakred === true);
  }

  get completedList() {
    return this._cardList.filter(card => card.checked === true);
  }

  get normalList() {
    const res = this._cardList.filter(card => card.isBookMakred !== true);
    return res.filter(card => card.checked !== true);
  }

  get cardList() {
    return this._cardList;
  }

  fetchCardList() {
    this._cardList = [];
  }

  addCard(card: CardModel) {
    this._cardList = [...this._cardList, card];
  }

  deleteCard(id: number) {
    this._cardList = this._cardList.filter(card => card.id !== id);
  }

  toggleChecked(id: number, checked: boolean) {
    this._cardList = this._cardList.map(card =>
      card.id === id
        ? {
            ...card,
            checked,
          }
        : card,
    );
  }

  toggleBookMark(id: number) {
    this._cardList = this._cardList.map(card =>
      card.id === id
        ? {
            ...card,
            isBookMakred: !card.isBookMakred,
          }
        : card,
    );
  }
}

export default new CardStore();
