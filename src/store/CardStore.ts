import { CardModel } from '@/models/CardModel';
import { makeAutoObservable } from 'mobx';

class CardStore {
  private _selectedCard: CardModel;
  private _cardList: CardModel[];
  private _lastCardIndex: number;

  constructor() {
    this._selectedCard = {
      id: -1,
      checked: false,
      title: '',
      date: '',
      isBookMarked: false,
      tagColor: '',
    };
    this._cardList = [];
    this._lastCardIndex = 0;

    makeAutoObservable(this);
  }

  init() {
    this._selectedCard = {
      id: -1,
      checked: false,
      title: '',
      date: '',
      isBookMarked: false,
      tagColor: '',
    };
    this._cardList = [];
    this._lastCardIndex = 0;
  }

  get bookMarkedList() {
    return this._cardList.filter(card => card.isBookMarked === true);
  }

  get checkedList() {
    return this._cardList.filter(card => card.checked === true);
  }

  get normalList() {
    const res = this._cardList.filter(card => card.isBookMarked !== true);
    return res.filter(card => card.checked !== true);
  }

  get cardList() {
    return this._cardList;
  }

  get selectedCard() {
    return this._selectedCard;
  }

  get lastCardIndex() {
    return this._lastCardIndex;
  }

  setSelectedCard(card: CardModel) {
    this._selectedCard = card;
  }

  fetchCardList() {
    this._cardList = [];
  }

  updateCard(updateCard: CardModel) {
    this._cardList = this._cardList.map(card =>
      card.id === updateCard.id
        ? {
            ...updateCard,
          }
        : card,
    );
  }

  addCard(card: CardModel) {
    this._cardList = [...this._cardList, card];
    this._lastCardIndex++;
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
