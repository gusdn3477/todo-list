import { CardModel } from '@/models/CardModel';
import { makeAutoObservable } from 'mobx';

class CardStore {
  private _selectedCardId: number;
  private _cardList: CardModel[];

  constructor() {
    this._selectedCardId = -1;
    this._cardList = [];
    makeAutoObservable(this);
  }

  get bookMarkedList() {
    return this._cardList.filter(card => card.isBookMarked === true);
  }

  get completedList() {
    return this._cardList.filter(card => card.checked === true);
  }

  get normalList() {
    const res = this._cardList.filter(card => card.isBookMarked !== true);
    return res.filter(card => card.checked !== true);
  }

  get cardList() {
    return this._cardList;
  }

  get selectedCardId() {
    return this._selectedCardId;
  }

  setSelectedCardId(id: number) {
    this._selectedCardId = id;
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
    // 사용자 편의성을 위해 일부러 300ms의 지연 시간 적용
    setTimeout(() => {
      this._cardList = this._cardList.map(card =>
        card.id === id
          ? {
              ...card,
              checked,
              isBookMarked: false,
            }
          : card,
      );
    }, 300);
  }

  toggleBookMark(id: number) {
    // 사용자 편의성을 위해 일부러 300ms의 지연 시간 적용
    setTimeout(() => {
      this._cardList = this._cardList.map(card =>
        card.id === id
          ? {
              ...card,
              isBookMarked: !card.isBookMarked,
            }
          : card,
      );
    }, 300);
  }
}

export default new CardStore();
