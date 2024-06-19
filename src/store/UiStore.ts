import { makeAutoObservable } from 'mobx';

class UiStore {
  private _open: boolean;

  constructor() {
    this._open = false;
    makeAutoObservable(this);
  }

  handleDialogVisible(status: boolean) {
    this._open = status;
  }

  get open() {
    return this._open;
  }
}

export default new UiStore();
