import { CardModel } from '@/models/CardModel';
import { makeAutoObservable } from 'mobx';

class CardStore {
  private _card: CardModel;
  private _cardList: CardModel[];

  constructor() {
    this._card = {
      id: 0,
      checked: false,
      title: '',
      date: '',
      isBookMakred: false,
      tagColor: '',
    };
    this._cardList = [];
    makeAutoObservable(this);
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
}

export default new CardStore();
