import { makeAutoObservable } from 'mobx';

class UiStore {
  private _open: boolean;
  private _calendarOpen: boolean;
  // 달력 위치에 대한 좌표
  private _calendarPosition: {
    top: number;
    left: number;
  };

  constructor() {
    this._open = false;
    this._calendarOpen = false;
    this._calendarPosition = {
      top: 0,
      left: 0,
    };
    makeAutoObservable(this);
  }

  handleDialogVisible(status: boolean) {
    this._open = status;
  }

  handleCalendarVisible(status: boolean) {
    this._calendarOpen = status;
  }

  handleCalendarPosition(top: number, left: number) {
    this._calendarPosition = { top, left };
  }

  get open() {
    return this._open;
  }

  get calendarOpen() {
    return this._calendarOpen;
  }

  get calendarPosition() {
    return this._calendarPosition;
  }
}

export default new UiStore();
