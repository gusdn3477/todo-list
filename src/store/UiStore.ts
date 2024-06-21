import { makeAutoObservable } from 'mobx';

class UiStore {
  private _deleteConfirmDialogOpen: boolean;
  private _resetConfirmDialogOpen: boolean;
  private _calendarOpen: boolean;
  // 달력 컴포넌트가 위치할 좌표
  private _calendarPosition: {
    top: number;
    left: number;
  };

  constructor() {
    this._deleteConfirmDialogOpen = false;
    this._resetConfirmDialogOpen = false;
    this._calendarOpen = false;
    this._calendarPosition = {
      top: 0,
      left: 0,
    };
    makeAutoObservable(this);
  }

  init() {
    this._deleteConfirmDialogOpen = false;
    this._resetConfirmDialogOpen = false;
    this._calendarOpen = false;
    this._calendarPosition = {
      top: 0,
      left: 0,
    };
  }

  handleDialogVisible(type: 'delete' | 'reset', status: boolean) {
    if (type === 'delete') this._deleteConfirmDialogOpen = status;
    else this._resetConfirmDialogOpen = status;
  }

  handleCalendarVisible(status: boolean) {
    this._calendarOpen = status;
  }

  handleCalendarPosition(top: number, left: number) {
    this._calendarPosition = { top, left };
  }

  get deleteConfirmDialogOpen() {
    return this._deleteConfirmDialogOpen;
  }

  get resetConfirmDialogOpen() {
    return this._resetConfirmDialogOpen;
  }

  get calendarOpen() {
    return this._calendarOpen;
  }

  get calendarPosition() {
    return this._calendarPosition;
  }
}

export default new UiStore();
