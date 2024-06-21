import { TodoModel } from '@/models/TodoModel';
import { makeAutoObservable } from 'mobx';

class TodoStore {
  private _selectedCard: TodoModel;
  private _cardList: TodoModel[];
  private _lastCardIndex: number;

  constructor() {
    this._selectedCard = {
      id: -1,
      checked: false,
      title: '',
      date: '',
      isBookMarked: false,
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
    };
    this._cardList = [];
    this._lastCardIndex = 0;
  }

  // 북마크가 되어 있더라도 체크가 된 것은 제외되어야 함
  get bookMarkedList() {
    return this._cardList.filter(
      card => card.checked === false && card.isBookMarked === true,
    );
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

  setSelectedCard(card: TodoModel) {
    this._selectedCard = card;
  }

  fetchLastData() {
    const jsonString = localStorage.getItem('todoList');
    if (jsonString) {
      this._cardList = JSON.parse(jsonString);
    } else this._cardList = [];

    const lastIndex = localStorage.getItem('lastIndex');
    if (lastIndex) {
      this._lastCardIndex = Number(lastIndex);
    }
  }

  updateCard(updateCard: TodoModel) {
    setTimeout(() => {
      this._cardList = this._cardList.map(card =>
        card.id === updateCard.id
          ? {
              ...updateCard,
            }
          : card,
      );

      const jsonString = JSON.stringify(this._cardList);
      localStorage.setItem('todoList', jsonString);
      localStorage.setItem('lastIndex', String(this._lastCardIndex));
    }, 300);
  }

  addCard(card: TodoModel) {
    this._cardList = [...this._cardList, card];
    this._lastCardIndex++;

    const jsonString = JSON.stringify(this._cardList);
    localStorage.setItem('todoList', jsonString);
    localStorage.setItem('lastIndex', String(this._lastCardIndex));
  }

  deleteCard(id: number) {
    this._cardList = this._cardList.filter(card => card.id !== id);

    const jsonString = JSON.stringify(this._cardList);
    localStorage.setItem('todoList', jsonString);
  }
}

export default new TodoStore();
